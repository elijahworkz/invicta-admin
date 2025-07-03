import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
export { dayjs };

export function getTime() {
    let now = new Date();

    return now.getTime();
}

export function capitalize(value) {
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getLabel(obj, defaultLabel = "label") {
    let label = Object.prototype.hasOwnProperty.call(obj, "label")
        ? obj.label
        : defaultLabel;
    return capitalize(label);
}

export function date(value) {
    value = typeof value === "number" ? value * 1000 : value;
    const date = new Date(value);

    return date.toLocaleString(["en-US"], {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}

export function fromNow(value) {
    return dayjs(value).fromNow();
}

export const debounce = (fn, delay = 0) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

export function checked(items) {
    return items.reduce((array, item) => {
        if (!item.checked) return array;

        let children = item.children ? checked(item.children) : [];
        return [...array, item.value, ...children];
    }, []);
}

export function intersectionBy(arr, ...args) {
    let iteratee = args.pop();
    if (typeof iteratee === "string") {
        const prop = iteratee;
        iteratee = (item) => item[prop];
    }

    return arr.filter((item1) =>
        args.every((arr2) =>
            arr2.find((item2) => iteratee(item1) === iteratee(item2)),
        ),
    );
}

export function formatBytes(bytes, decimals) {
    if (bytes == 0) return "0 B";

    let k = 1024,
        dm = decimals || 2,
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function getCookie(name) {
    var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return v ? v[2] : null;
}
