package com.example.simpledocker.controller.image;

import lombok.Data;

/**
 * TODO: please input file info
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/5 12:58 上午
 */
@Data
public class PushImageRequest {

    private String imageId;

    private String imageTag;

    private String authConfigId;

}
