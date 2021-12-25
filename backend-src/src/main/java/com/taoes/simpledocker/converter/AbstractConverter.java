package com.taoes.simpledocker.converter;

/**
 * 抽象的实体类型转换器
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/22 1:42 下午
 */
public abstract class AbstractConverter<DAO, ENTITY> {

    /**
     * 转换到 ENTITY 实体
     *
     * @param dao DAO层对象
     * @return
     */
    public abstract ENTITY from(DAO dao);

    /**
     * 转换到 DAO 实体
     *
     * @param entity 实体对象
     * @return
     */
    public abstract DAO to(ENTITY entity);
}
