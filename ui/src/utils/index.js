module.exports = {
  formatDate: function (dateValue) {
    let date = new Date(dateValue * 1000);
    let YY = date.getFullYear() + '-';
    let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1)
        + '-';
    let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
        + ':';
    let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes()
        : date.getMinutes()) + ':';
    let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds()
        : date.getSeconds());
    return YY + MM + DD + " " + hh + mm + ss;
  }, formatUTCTime: function (utc) {
    let date = new Date(utc)
    let YY = date.getFullYear() + '-';
    let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1)
        + '-';
    let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
        + ':';
    let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes()
        : date.getMinutes()) + ':';
    let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds()
        : date.getSeconds());
    return YY + MM + DD + " " + hh + mm + ss;
  },

  nullToLine: function (variable) {
    if (variable) {
      return variable;
    } else {
      return "-"
    }
  }, parseId: function (id) {
    if (!id) {
      return "-";
    }
    return id.replace("sha256:", "").substring(0, 12);
  }, guid: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function (c) {
          let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
  }, download: function (data, fileName) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      let blob = new Blob([data], {
        type: 'application/vnd.ms-excel'
      })
      window.navigator.msSaveOrOpenBlob(blob, fileName)
    } else {
      let blob = new Blob([data])
      let downloadElement = document.createElement('a')
      let href = window.URL.createObjectURL(blob)
      downloadElement.href = href
      downloadElement.download = fileName
      document.body.appendChild(downloadElement)
      downloadElement.click()
      document.body.removeChild(downloadElement)
      window.URL.revokeObjectURL(href)
    }
  }
}
