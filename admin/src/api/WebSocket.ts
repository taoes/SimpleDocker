let websocket: WebSocket, lockReconnect = false;
let createWebSocket = (url: string) => {
  websocket = new WebSocket(url);
  websocket.onopen = function () {

  }
  websocket.onerror = function () {
    reconnect(url);
  };
  websocket.onclose = function (e) {
    console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
  }
  websocket.onmessage = function (event) {
    lockReconnect = true;
    console.log(event)
  }
}
let reconnect = (url: string) => {
  if (lockReconnect) return;
  //没连接上会一直重连，设置延迟避免请求过多
  setTimeout(function () {
    createWebSocket(url);
    lockReconnect = false;
  }, 4000);
}

//关闭连接
let closeWebSocket = () => {
  websocket && websocket.close();
}
export {
  websocket,
  createWebSocket,
  closeWebSocket
};

