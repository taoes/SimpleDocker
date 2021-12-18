import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.util.Scanner;

import lombok.SneakyThrows;
import lombok.Synchronized;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/8 12:23 下午
 */
public class Main {

    public static void main(String[] args) throws IOException, InterruptedException {
        PipedOutputStream o = new PipedOutputStream();
        PipedInputStream i =new PipedInputStream();
        i.connect(o);

        new Thread(new Runnable() {
            @Override
            @SneakyThrows
            public void run() {
                Scanner scanner = new Scanner(System.in);
                while (true){
                    final String next = scanner.next();
                    if (next.length() > 0){
                        o.write(next.getBytes());
                        o.flush();
                        System.out.println("OK...");
                    }
                }
            }
        }).start();

        new Thread(new Runnable() {
            @Override
            @SneakyThrows
            public void run() {
                byte[] bytes = new byte[1024];
                while (true){
                    final int read = i.read(bytes);
                    if (read == -1){
                        Thread.sleep(100);
                        continue;
                    }
                    System.out.println(new String(bytes));
                }
            }
        }).start();
        o.wait();
    }
}
