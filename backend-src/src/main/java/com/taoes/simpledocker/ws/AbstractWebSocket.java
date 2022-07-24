package com.taoes.simpledocker.ws;


import cn.dev33.satoken.session.SaSession;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.StrUtil;
import com.github.dockerjava.api.async.ResultCallbackTemplate;
import com.google.common.collect.Maps;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.Session;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
public abstract class AbstractWebSocket extends AbstractSocketStream {

    private static final Set<Session> sessionSet = new HashSet<>();

    private static final Map<String, Session> idAndSessionGroup = Maps.newHashMap();

    private static final Map<String, ResultCallbackTemplate<?, ?>> callbacks = new ConcurrentHashMap<>();


    public void init(Session session) {
        super.initStream(session);
        this.addSession(session);
    }


    @SneakyThrows
    public void addCallback(Session session, ResultCallbackTemplate<?, ?> callback) {
        if (session == null) {
            return;
        }
        callbacks.put(session.getId(), callback);
    }

    public Map<String, String> parseParams(Session session) {
        final String queryString = session.getQueryString();
        if (StrUtil.isBlank(queryString)) {
            return Collections.emptyMap();
        }

        final Map<String, String> map = MapUtil.newHashMap();

        String[] params = queryString.split("&");
        for (String param : params) {
            try {
                String[] keyValuePair = param.split("=", 2);
                String name = URLDecoder.decode(keyValuePair[0], "UTF-8");
                if (StrUtil.isBlank(name)) {
                    continue;
                }
                String value = keyValuePair.length > 1 ?
                        URLDecoder.decode(keyValuePair[1], "UTF-8") : "";
                map.put(name, value);
            } catch (UnsupportedEncodingException e) {
                // ignore this parameter if it can't be decoded
            }
        }
        return map;
    }


    /**
     * 收到客户端消息后写入输出流
     */
    @SneakyThrows
    @OnMessage
    public void onMessage(String message, Session session) {
        this.write(session, message.getBytes());
    }

    /**
     * Session连接关闭
     */
    @OnClose
    @SneakyThrows
    public void onClose(Session session) {
        this.closeCallback(session);
        this.closeStream(session);
        this.removeSession(session);

    }

    /**
     * 出现错误
     */
    @OnError
    @SneakyThrows
    public void onError(Session session, Throwable error) {
        log.error("发生错误：{}，Session ID： {}", error.getMessage(), session.getId());
        this.onClose(session);
    }

    private void addSession(Session session) {
        sessionSet.add(session);
        idAndSessionGroup.put(session.getId(), session);
        session.getId();
    }

    @SneakyThrows
    private void closeCallback(Session session) {
        if (session == null) {
            return;
        }

        final ResultCallbackTemplate<?, ?> template = callbacks.get(session.getId());
        if (template != null) {
            template.close();
        }
    }


    @SneakyThrows
    private void removeSession(Session session) {
        if (session == null) {
            return;
        }
        final String sessionId = session.getId();
        final Session sessionOfExist = idAndSessionGroup.get(sessionId);
        if (sessionOfExist == null) {
            return;
        }

        sessionOfExist.close();
        idAndSessionGroup.remove(sessionId);
        sessionSet.remove(sessionOfExist);
    }



}
