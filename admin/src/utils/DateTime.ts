export default function dateToStr(timestamp: number): String {
    let date: Date = new Date(timestamp);
    let y = date.getFullYear();
    let m = "0" + (date.getMonth() + 1);
    let d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
}

export function formatterTime(date: Date): string {
    return date.getMinutes() + ":" + date.getSeconds()
}