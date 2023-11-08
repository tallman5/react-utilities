import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Size, defaultQueries, isBrowser } from '..';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
export type MonacoEditor = typeof monacoEditor;

export function useAtlas() {
    const azCss = useCssLoader("https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.css");
    const azScript = useScriptLoader("https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js");
    const [a, setA] = useState<Atlas>();

    useEffect(() => {
        if (!azCss || !azScript) return;

        const waitForAtlas = () => {
            if (typeof window.atlas === 'undefined') {
                setTimeout(waitForAtlas, 100);
            }
            else {
                setA(window.atlas);
            }
        }

        waitForAtlas();
    }, [azCss, azScript])

    return a;
}

export function useColumnSizes(size: Size, colSpan: number) {
    const collapsedStyle: CSSProperties = {
        flexShrink: 0,
        flexBasis: 'auto'
    }

    const expandedStyle: CSSProperties = {
        ...collapsedStyle,
        flexGrow: (colSpan > 0) ? '0' : '1',
        width: (colSpan > 0) ? (colSpan / 12) * 100 + '%' : 'auto',
    }

    switch (size) {
        case Size.fluid:
            return useMedia(defaultQueries, [collapsedStyle, collapsedStyle, collapsedStyle, collapsedStyle, collapsedStyle], collapsedStyle)
        case Size.xxl:
            return useMedia(defaultQueries, [expandedStyle, collapsedStyle, collapsedStyle, collapsedStyle, collapsedStyle], collapsedStyle)
        case Size.xl:
            return useMedia(defaultQueries, [expandedStyle, expandedStyle, collapsedStyle, collapsedStyle, collapsedStyle], collapsedStyle)
        case Size.lg:
            return useMedia(defaultQueries, [expandedStyle, expandedStyle, expandedStyle, collapsedStyle, collapsedStyle], collapsedStyle)
        case Size.md:
            return useMedia(defaultQueries, [expandedStyle, expandedStyle, expandedStyle, expandedStyle, collapsedStyle], collapsedStyle)
        default:
            return useMedia(defaultQueries, [expandedStyle, expandedStyle, expandedStyle, expandedStyle, expandedStyle], collapsedStyle)
    }
}

export function useColumnWidths(width: number) {
    const queries: string[] = []
    const values: string[] = []

    for (let index = 10; index > 1; index--) {
        queries.push('(min-width: ' + index * width + 'px)')
        values.push(100 / index + '%')
    }

    return useMedia(queries, values, '100%')
}

export function useCssLoader(url: string) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isLoaded) return;

        let newElement = document.querySelector('link[href="' + url + '"]') as HTMLLinkElement;
        if (newElement) {
            setIsLoaded(true);
            return;
        }

        newElement = document.createElement('link');
        newElement.rel = 'stylesheet';
        newElement.href = url;

        const handleLoad = () => {
            setIsLoaded(true);
        };

        const handleError = (error: any) => {
            console.error(`Failed to load ${url}`, error);
        };

        newElement.addEventListener('load', handleLoad);
        newElement.addEventListener('error', handleError);

        document.head.appendChild(newElement);

        return () => {
            newElement.removeEventListener('load', handleLoad);
            newElement.removeEventListener('error', handleError);
        };

    }, [url]);

    return isLoaded;
}

export function useContainerSizes(size: Size) {
    switch (size) {
        case Size.fluid:
            return useMedia(defaultQueries, ['100%', '100%', '100%', '100%', '100%'], '100%')
        case Size.xxl:
            return useMedia(defaultQueries, ['1320px', '100%', '100%', '100%', '100%'], '100%')
        case Size.xl:
            return useMedia(defaultQueries, ['1320px', '1140px', '100%', '100%', '100%'], '100%')
        case Size.lg:
            return useMedia(defaultQueries, ['1320px', '1140px', '960px', '100%', '100%'], '100%')
        case Size.md:
            return useMedia(defaultQueries, ['1320px', '1140px', '960px', '720px', '100%'], '100%')
        default:
            return useMedia(defaultQueries, ['1320px', '1140px', '960px', '720px', '540px'], '100%')
    }
}

export function useGoogleCharts() {
    const [g, setGoogle] = useState<Google>();
    const googleScriptLoaded = useScriptLoader('https://www.gstatic.com/charts/loader.js');

    useEffect(() => {
        if (!googleScriptLoaded) return;

        const checkGoogle = () => {
            if (window.google) {
                setGoogle(window.google);
            } else {
                setTimeout(checkGoogle, 100);
            }
        };

        checkGoogle();
        return () => { };
    }, [googleScriptLoaded]);

    return g;
}

export function useMedia<T>(queries: string[], values: T[], defaultValue: T) {
    if (!isBrowser) return defaultValue

    const mediaQueryLists = queries.map((q) => window?.matchMedia(q));

    const getValue = () => {
        const index = mediaQueryLists.findIndex((mql) => mql.matches);
        return values?.[index] || defaultValue;
    };

    const [value, setValue] = useState<T>(getValue);

    useEffect(
        () => {
            const handler = () => setValue(getValue);
            mediaQueryLists.forEach((mql) => mql.addEventListener("change", handler));
            return () => mediaQueryLists.forEach((mql) => mql.removeEventListener("change", handler));
        }, []);

    return value;
}

export function useMonacoEditor(version: string = '0.44.0') {
    const monacoBaseUrl = `https://cdn.jsdelivr.net/npm/monaco-editor@${version}/min/vs`;
    const [m, setMonaco] = useState<MonacoEditor>();
    const scriptLoaded = useScriptLoader(`${monacoBaseUrl}/loader.js`);

    useEffect(() => {
        if (m) return;
        if (!scriptLoaded) return;

        const checkRequire = () => {
            const require = (window as any).require;
            if (require) {
                require.config({
                    paths: {
                        vs: monacoBaseUrl,
                    }
                });

                require(
                    ['vs/editor/editor.main'],
                    function (monaco: MonacoEditor) {
                        setMonaco(monaco);
                    }
                );
            }
            else {
                console.log(`Require not ready`);
                setTimeout(checkRequire, 50);
            }
        };

        checkRequire();

    }, [scriptLoaded]);

    return m;
}

export function usePrevious<T>(value: T) {
    const ref = useRef<T>()
    useEffect(() => void (ref.current = value), [value])
    return ref.current
}

export function useScriptLoader(url: string) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isLoaded) return;

        let newElement = document.querySelector('script[src="' + url + '"]') as HTMLScriptElement;
        if (newElement) {
            setIsLoaded(true);
            return;
        }

        newElement = document.createElement('script');
        newElement.src = url;
        newElement.async = true;

        const handleLoad = () => {
            setIsLoaded(true);
        };

        const handleError = (error: any) => {
            console.error(`Failed to load ${url}`, error);
        };

        newElement.addEventListener('load', handleLoad);
        newElement.addEventListener('error', handleError);

        document.body.appendChild(newElement);

        return () => {
            newElement.removeEventListener('load', handleLoad);
            newElement.removeEventListener('error', handleError);
        };

    }, [url]);

    return isLoaded;
}

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: isBrowser ? window.innerWidth : 1200,
        height: isBrowser ? window.innerHeight : 800,
    });

    function changeWindowSize() {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    useEffect(() => {
        window.addEventListener("resize", changeWindowSize);
        return () => { window.removeEventListener("resize", changeWindowSize); };
    }, []);

    return windowSize;
}
