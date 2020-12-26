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
  }, nullToLine: function (variable) {
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
  }
}
