import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ICheckTree } from '@/interfaces'

dayjs.extend(relativeTime)

export function getTime() {
    let now = new Date()

    return now.getTime()
}

export function capitalize(value: string) {
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
}

export function getLabel(obj: any, defaultLabel = 'label') {
    let label = Object.prototype.hasOwnProperty.call(obj, 'label')
        ? obj.label
        : defaultLabel
    return capitalize(label)
}

export function date(value: number | string) {
    value = (typeof value === 'number') ? value * 1000 : value
    const date = new Date(value)
    
    return date.toLocaleString(['en-US'], {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    })
}

export function fromNow(value: string) {
    return dayjs(value).fromNow()
}

export const debounce = (fn: Function, delay = 0) => {
    let timeout: number;
    return (...args: any) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

export function checked(items: ICheckTree[]): any {
    // if (items.length) {
        return items.reduce((array: any[], item: any) => {
            if (! item.checked) return array

            let children = (item.children) ? checked(item.children) : []
            // array.push(item.value)
            // return array
            return [...array, item.value, ...children]
        }, [])
    // }
}