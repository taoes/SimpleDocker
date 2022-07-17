package com.taoes.simpledocker.dao.bean;

import com.baomidou.mybatisplus.annotation.TableName;
import java.time.LocalDateTime;
import lombok.Data;

/**
 * @author manwang (569258yin)
 * @date 2022/7/13 21:36
 */
@Data
@TableName("role")
public class RoleDao extends BaseDao {

  private String comment;
  private String name;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
