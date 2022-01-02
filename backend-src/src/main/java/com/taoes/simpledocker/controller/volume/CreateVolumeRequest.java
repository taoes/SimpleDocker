package com.taoes.simpledocker.controller.volume;

import lombok.Data;

/**
 * 存储卷创建请求
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2022/1/1 4:13 PM
 */
@Data
public class CreateVolumeRequest {

    // 存储卷名称
    private String name;

    // 存储卷模式
    private String driver;
}
