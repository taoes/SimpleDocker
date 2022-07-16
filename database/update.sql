#### 用户权限相关改动
CREATE TABLE `role` (
                        `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                        `name` varchar(64) NOT NULL,
                        `comment` varchar(255) DEFAULT NULL COMMENT '描述',
                        `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除',
                        `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `uk_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `permission` (
                              `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                              `permission` varchar(255) NOT NULL,
                              `role_id` int(11) NOT NULL,
                              `deleted` tinyint(1) NOT NULL DEFAULT '0',
                              `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                              PRIMARY KEY (`id`),
                              KEY `idx_role` (`role_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `user`
    CHANGE COLUMN `username` `account` varchar(128) NOT NULL COMMENT '账号' AFTER `id`,
    ADD COLUMN `role_ids` varchar(255) NOT NULL DEFAULT '[]' COMMENT '角色数组' AFTER `salt_value`,
    ADD COLUMN `deleted` tinyint(1) NOT NULL DEFAULT '0',
    ADD COLUMN `name` varchar(64) NULL COMMENT '昵称' AFTER `id`;

INSERT INTO `sd`.`role` (`id`, `name`, `comment`, `deleted`) VALUES (1, 'admin', '超级管理员', 0);


