export type Indexed<T = unknown> = {
    [key in string]: T;
};

export function prettyDateFormat(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthToday = new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth();
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth();
    const dayMonthString = `${day}${month}` === `${new Date().getDate()}${monthToday}` ? "" : `${day}.${month}`;
    const year = date.getFullYear();
    const yearString = year !== new Date().getFullYear() ? `.${year.toString().substring(2, 4)}` : "";

    const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    const resultString = `${dayMonthString}${yearString}`.length !== 0 ? `${dayMonthString}${yearString}, ${hours}:${minutes}` : `${hours}:${minutes}`
    return resultString
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }
    if (typeof object !== 'object') {
        return object;
    } else {
        const objStr = path.split(".").reduceRight((acc, key) => ({ [key]: acc }), value);
        object = merge(object as Indexed, objStr as Indexed);
        return object;
    }
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }
        lhs[p] = rhs[p];
    }

    return lhs;
}

type PlainObject<T = any> = {
    [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}
  