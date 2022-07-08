import {ContainerStateText} from "./index";

let getStatusInfo = function (State: string): ContainerStateText {
  if (State === 'running') {
    return {
      stateColor: 'green',
      stateDesc: "运行中",
      operateCommon: "STOP",
      operateDesc: "停止",
      operatorColor: 'red'
    }
  }
  if (State === 'exited') {
    return {
      stateColor: 'red',
      stateDesc: "已停止",
      operateCommon: "START",
      operateDesc: "启动",
      operatorColor: 'green'
    }
  }
  if (State === 'paused') {
    return {
      stateColor: 'purple',
      stateDesc: "已暂停",
      operateCommon: "UNPAUSE",
      operateDesc: "恢复",
      operatorColor: 'green'
    }
  }
  if (State === 'created') {
    return {
      stateColor: 'blue',
      stateDesc: "已创建",
      operateCommon: "START",
      operateDesc: "启动",
      operatorColor: 'green'
    }
  }
  return {
    stateColor: 'lightgray',
    stateDesc: "未知状态",
    operateCommon: "STOP",
    operateDesc: "停止",
    operatorColor: 'green'
  }
}

export default getStatusInfo;

