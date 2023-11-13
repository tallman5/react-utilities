import { useEffect, useState } from "react";
import { loadWASM } from 'onigasm'
// @ts-ignore
import onigasmWasm from 'onigasm/lib/onigasm.wasm'
import { isBrowser } from "..";

export const useOnigasm = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded) return;
        if (!isBrowser) return;

        const onigasmLoaded =
            typeof (window as any).onigasmLoaded !== "undefined" &&
            (window as any).onigasmLoaded === true;

        if (onigasmLoaded) {
            setLoaded(true);
        }
        else {
            loadWASM(onigasmWasm).then(() => {
                setLoaded(true);
                (window as any).onigasmLoaded = true;
            });
        }
    }, [loaded])

    return loaded;
}