export * from './components';
export * from './hooks';
export * from './icons';
export * from './models';

export const copyToClipboard = (textToCopy: string) => {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise<void>((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}

export const defaultQueries = [
    '(min-width: 1400px)', '(min-width: 1200px)', '(min-width: 992px)', '(min-width: 768px)', '(min-width: 576px)'
]

export const emptyGuid = "00000000-0000-0000-0000-000000000000";

export const getQueryParam = (key: string, defaultValue?: string) => {
    if (!isBrowser) return defaultValue || ''
    const urlParams = new URLSearchParams(window.location.search)
    for (const [k, v] of urlParams) {
        if (k.toLowerCase() === key.toLowerCase()) {
            return v
        }
    }
    return defaultValue || ''
}

export const getStorageItem = (key: string) => {
    let returnValue = null;
    if (isBrowser) {
        const storageItem = window.localStorage.getItem(key);
        if (storageItem) {
            returnValue = JSON.parse(storageItem);
        }
    }
    return returnValue;
}

export const isBrowser = typeof window !== "undefined" && window;

export const setStorageItem = (key: string, obj: any) => {
    const serializedObj = JSON.stringify(obj);
    window.localStorage.setItem(key, serializedObj);
}

export enum Size {
    sm, md, lg, xl, xxl, fluid
}

export enum UiFunction {
    Primary = 'primary', Secondary = 'secondary', Success = 'success', Danger = 'danger',
    Warning = 'warning', Info = 'info', Light = 'light', Dark = 'dark', Link = 'link'
}
