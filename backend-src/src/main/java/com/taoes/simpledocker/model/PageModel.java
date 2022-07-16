package com.taoes.simpledocker.model;

import cn.hutool.core.collection.CollUtil;
import com.github.pagehelper.PageInfo;
import lombok.Data;

import java.util.Collections;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author manwang (569258yin)
 * @date 2022/7/14 21:16
 */
@Data
public class PageModel<T> {

    private Integer pages;
    private Long total;
    private boolean hasNext;
    private boolean hasPrevious;
    private Integer currentPage;
    private List<T> results;


    public static <T, P> PageModel<T> valueOfByPageInfo(PageInfo<P> pageInfo, Function<P, T> function) {
        PageModel<T> pageModel = new PageModel();
        pageModel.setPages(pageInfo.getPages());
        pageModel.setTotal(pageInfo.getTotal());
        pageModel.setHasNext(pageInfo.isHasNextPage());
        pageModel.setHasPrevious(pageInfo.isHasPreviousPage());
        pageModel.setCurrentPage(pageInfo.getPageNum());
        if (CollUtil.isEmpty(pageInfo.getList())) {
            pageModel.setResults(Collections.emptyList());
        } else {
            pageModel.setResults(pageInfo.getList().stream().map(function).collect(Collectors.toList()));
        }
        return pageModel;
    }

    public static <T, P> PageModel<T> convertResultObj(PageModel<P> pageInfo, Function<P, T> function) {
        PageModel<T> pageModel = new PageModel();
        pageModel.setPages(pageInfo.getPages());
        pageModel.setTotal(pageInfo.getTotal());
        pageModel.setHasNext(pageInfo.isHasNext());
        pageModel.setHasPrevious(pageInfo.isHasPrevious());
        pageModel.setCurrentPage(pageInfo.getCurrentPage());
        if (CollUtil.isEmpty(pageInfo.getResults())) {
            pageModel.setResults(Collections.emptyList());
        } else {
            pageModel.setResults(pageInfo.getResults().stream().map(function).collect(Collectors.toList()));
        }
        return pageModel;
    }

}
