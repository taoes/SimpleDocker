package com.taoes.simpledocker.service.imple;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import com.taoes.simpledocker.service.GoProgramRunner;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/15 1:43 下午
 */
@Slf4j
@Service
public class GoProgramRunnerImpl implements GoProgramRunner {

    private static final ExecutorService SINGLE_THREAD_EXECUTOR;

    static {
        SINGLE_THREAD_EXECUTOR = new ThreadPoolExecutor(
            2,
            Integer.MAX_VALUE,
            1L,
            TimeUnit.MINUTES,
            new LinkedBlockingQueue<>(),
            r -> {
                Thread thread = new Thread(r);
                thread.setName("TerminalServiceThread");
                return thread;
            });
    }

    @Override
    public Future<?> asyncRun(String path, String... param) {
        return SINGLE_THREAD_EXECUTOR.submit(() -> {
                try {
                    Runtime.getRuntime().exec(path, param);
                    log.info("启动中的终端支持服务完成,path={},param={}", path, param);
                } catch (IOException e) {
                    log.error("启动中的终端支持服务出现异常", e);
                }
            }
        );

    }
}
