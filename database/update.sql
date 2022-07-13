#### 用户相关新增

CREATE TABLE `tenant` (
                          `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                          `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `user`
    CHANGE COLUMN `username` `account` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账号' AFTER `id`,
    ADD COLUMN `tenant_id` int(11) NULL DEFAULT 0 COMMENT '租户标识' AFTER `id`,
    ADD COLUMN `name` varchar(64) NULL COMMENT '昵称' AFTER `tenant_id`;

