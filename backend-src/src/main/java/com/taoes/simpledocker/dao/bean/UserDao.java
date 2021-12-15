package com.taoes.simpledocker.dao.bean;

import java.time.LocalDateTime;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * 用户DAO对象
 *
 * @author eleme taozhou.tao@alibaba-inc.com
 * @date 2021/12/15 1:11 下午
 */
@Data
@TableName("sd_user")
public class UserDao {

    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密文密码
     */
    private String password;

    /**
     * 加密盐值
     */
    private String salt;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;
}
