package com.taoes.simpledocker.model.enums;

/**
 * 操作系统平台类型
 *
 * @author 枕上江南 zhoutao825638@vip.qq.com
 * @date 2021/12/15 1:35 下午
 */
public enum EPlatform {
    Any("any"),
    LINUX("Linux"),
    MAC_OS("Mac OS"),
    MAC_OS_X("Mac OS X"),
    WINDOWS("Windows"),
    OS2("OS/2"),
    SOLARIS("Solaris"),
    SUN_OS("SunOS"),
    MPEiX("MPE/iX"),
    HP_UX("HP-UX"),
    AIX("AIX"),
    OS390("OS/390"),
    FREE_BSD("FreeBSD"),
    IRIX("Irix"),
    DIGITAL_UNIX("Digital Unix"),
    NET_WARE_411("NetWare"),
    OSF1("OSF1"),
    OpenVMS("OpenVMS"),
    OTHERS("Others");

    private EPlatform(String desc) {
        this.description = desc;
    }

    @Override
    public String toString() {
        return description;
    }

    private String description;
}
