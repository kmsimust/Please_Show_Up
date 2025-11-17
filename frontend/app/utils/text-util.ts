export function showTextByKey(value: any, defaultText: string) {
    return value? value: defaultText;
}

export function showPicture(value: any, defaultCheck: string, defaultText: string) {
    if (!value || value == defaultCheck) {
        return defaultText;
    } else {
        return value;
    }
}