package com.taoes.simpledocker.utils;

import org.junit.Test;

import static org.junit.jupiter.api.Assertions.*;

public class OSInfoTest {

    @Test
    public void printOsInfo() {
        System.out.println(OSInfo.getOSName());
    }

}