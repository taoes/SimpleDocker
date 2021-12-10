package com.taoes.simpledocker.model.enums;

import lombok.AllArgsConstructor;

/**
 * TODO: please input file info
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/5 1:15 上午
 */

@AllArgsConstructor
public enum ContainerOperate {
    START("启动"),
    RESTART("重启"),
    STOP("停止"),
    PAUSE("暂停"),
    UNPAUSE("恢复"),
    REMOVE("移除"),
    EXPORT_LOCAL("导出到本地");

    /**
     * 操作描述
     */
    private String desc;

}
