package com.taoes.simpledocker.controller;

import lombok.extern.slf4j.Slf4j;

import java.util.Collections;
import java.util.List;

@Slf4j
public abstract class BaseController {

    public List<String> getAuthentication() {
        return Collections.emptyList();
    }


}
