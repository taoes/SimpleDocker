package com.taoes.simpledocker.ws;

import com.Ostermiller.util.CircularByteBuffer;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import javax.websocket.Session;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 双向输入输出流
 */
@Slf4j
public abstract class AbstractSocketStream {

    private static final Map<String, InputStream> ins = new ConcurrentHashMap<>();

    private static final Map<String, OutputStream> outs = new ConcurrentHashMap<>();


    public void initStream(Session session) {
        // 循环缓冲区
        final CircularByteBuffer cbb = new CircularByteBuffer();
        final InputStream in = cbb.getInputStream();
        final OutputStream out = cbb.getOutputStream();

        ins.put(session.getId(), in);
        outs.put(session.getId(), out);
    }

    @SneakyThrows
    public void write(Session session, byte[] data) {
        if (session == null || !session.isOpen()) {
            String sessionId = Optional.ofNullable(session).map(Session::getId).orElse("未知会话ID");
            log.error("回话:{}已关闭，停止写入数据", sessionId);
            return;
        }
        final String sessionId = session.getId();
        final OutputStream stream = outs.get(sessionId);
        if (stream == null) {
            return;
        }
        stream.write(data);
    }


    /**
     * 关闭与Session关联的输入输出流
     *
     * @param session 回话
     */
    protected void closeStream(Session session) {
        if (session == null) {
            return;
        }
        try (InputStream stream = ins.get(session.getId())) {
            if (stream != null && session.isOpen()) {
                stream.close();
            }

        } catch (Exception ignore) {
        } finally {
            ins.remove(session.getId());
        }

        try (OutputStream stream = outs.get(session.getId())) {
            if (stream != null && session.isOpen()) {
                stream.close();
            }
            outs.remove(session.getId());
        } catch (Exception ignore) {
        } finally {
            ins.remove(session.getId());
        }
    }


    protected InputStream getInput(Session session) {
        return ins.get(session.getId());
    }
}
