package com.taoes.simpledocker.dao.bean;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.taoes.simpledocker.utils.JsonUtils;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

/**
 * 用户DAO对象
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/15 1:11 下午
 */
@Data
@TableName("user")
public class UserDao {

    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 用户名
     */
    private String account;

    private String name;

    /**
     * 密文密码
     */
    private String password;

    /**
     * 加密盐值
     */
    private String saltValue;

    /**
     * 权限数组
     */
    private String roleIds;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;


    private static final String EMPTY_ARRAY = "[]";

    public static List<Integer> convertRoleStr2List(String roleIds) {
        if (StringUtils.isBlank(roleIds)) {
            return Collections.emptyList();
        }
        return JsonUtils.jsonToList(roleIds, Integer.class);
    }

    public static String convertRoleList2Str(List<Integer> roleIds) {
        if (CollUtil.isEmpty(roleIds)) {
            return EMPTY_ARRAY;
        }
        return JsonUtils.toJsonString(roleIds);
    }
}
