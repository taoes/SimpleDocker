import {Menu} from "antd";
import {
  BookFilled,
} from "@ant-design/icons";
import React from "react";

export default function TerminalMenu() {
  return (
      <div>
        <Menu theme={"dark"} mode={"horizontal"}>
          <Menu.Item disabled>SimpleDocker终端界面</Menu.Item>
          <Menu.SubMenu icon={<BookFilled/>} key={"theme"} title={"主题"}>
            <Menu.Item>主题1</Menu.Item>
            <Menu.Item>主题2</Menu.Item>
            <Menu.Item>主题3</Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu icon={<BookFilled/>} key={"command"} title={"命令"}>
            <Menu.Item>返回HOME</Menu.Item>
            <Menu.Item>查看hosts</Menu.Item>
            <Menu.Item>清除/tmp</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
  )
}