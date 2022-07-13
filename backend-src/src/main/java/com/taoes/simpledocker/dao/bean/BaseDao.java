package com.taoes.simpledocker.dao.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.Data;

/**
 * @author manwang (569258yin)
 * @date 2022/7/16 11:51
 */
@Data
public class BaseDao {

    @TableId(type = IdType.AUTO)
    protected Integer id;
    @TableLogic
    protected Integer deleted;
}
