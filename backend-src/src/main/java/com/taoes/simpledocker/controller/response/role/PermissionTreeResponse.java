package com.taoes.simpledocker.controller.response.role;

import com.taoes.simpledocker.controller.response.tree.DataNode;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import lombok.Data;

/**
 * 角色的权限树
 */
@Data
public class PermissionTreeResponse {

  public final static PermissionTreeResponse EMPTY;

  static {
    EMPTY = new PermissionTreeResponse(Collections.emptyList(),Collections.emptyList());
  }

  /**
   * 已选择的的权限
   */
  private Collection<String> selectPermissions;


  /**
   * 权限分组
   */
  private List<DataNode> permissionTree;

  public PermissionTreeResponse(Collection<String> selectPermissions, List<DataNode> permissionTree) {
    this.selectPermissions = selectPermissions;
    this.permissionTree = permissionTree;
  }
}
