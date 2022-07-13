package com.taoes.simpledocker.dao.bean;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author manwang (569258yin)
 * @date 2022/7/13 21:36
 */
@Data
@TableName("permission")
public class PermissionDao extends BaseDao {

    private Integer roleId;
    private String permission;

    public PermissionDao() {
    }

    public PermissionDao(Integer roleId, String permission) {
        this.roleId = roleId;
        this.permission = permission;
    }


}
