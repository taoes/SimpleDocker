package com.taoes.simpledocker.controller.image;

import lombok.Data;

/**
 * TODO: please input file info
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/5 12:58 上午
 */
@Data
public class PushImageRequest {

    private String imageId;

    private String imageTag;

    private String authConfigId;

}
