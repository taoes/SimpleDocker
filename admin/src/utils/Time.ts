export default function dateToStr(timestamp: number): String {
    if (!timestamp || timestamp === 0) {
        return ""
    }
    let date = new Date(timestamp);
    let y =  date.getFullYear();
    let m = "0" + (date.getMonth() + 1);
    let d = "0" + date.getDate();
    let h = "0" + date.getHours();
    let M = "0" + date.getMinutes();


    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length)
        + " " + h.substring(h.length - 2, h.length) + ":" + M.substring(M.length - 2, M.length)
}
