export default function bytesToSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  var k = 1024;
  let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  var num = bytes / Math.pow(k, i);
  return num.toPrecision(3) + ' ' + sizes[i];

// return (bytes / Math.pow(k, i)) + ' ' + sizes[i];
// toPrecision(3) 后面保留一位小数，如1.0GB //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

