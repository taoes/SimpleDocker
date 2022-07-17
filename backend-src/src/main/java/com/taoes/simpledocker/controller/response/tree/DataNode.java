package com.taoes.simpledocker.controller.response.tree;

import java.util.List;
import lombok.Data;

@Data
public class DataNode {

  private String key;
  private String title;
  private List<DataNode> children;
  private boolean disabled;
  private boolean selectable;
}