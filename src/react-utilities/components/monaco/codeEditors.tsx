import React, { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react"
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import { useMonaco } from "../../hooks";

export const DefMonacoOptions: editor.IStandaloneEditorConstructionOptions = {
    theme: 'vs-dark',
}

export const DefMonacoOptionsReadOnly: editor.IStandaloneEditorConstructionOptions = {
    ...DefMonacoOptions,
    minimap: { enabled: false },
    scrollbar: { vertical: 'hidden', handleMouseWheel: false },
    readOnly: true,
}

export interface ICodeEditor extends ComponentPropsWithoutRef<'div'> {
    options?: editor.IStandaloneEditorConstructionOptions,
    overrides?: editor.IEditorOverrideServices,
}

export const CodeEditor = ({ children, options, overrides, ...rest }: ICodeEditor) => {
    const divRef = useRef<HTMLDivElement>(null);
    const monaco = useMonaco();
    const [showChildren, setShowChildren] = useState(true);
    const kids = children ||
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', color: 'gray', height: '100%', width: '100%', fontWeight: 'bolder' }}>Loading...</div>

    useEffect(() => {
        let editor: editor.IStandaloneCodeEditor;

        if (monaco) {
            editor = monaco.editor.create(divRef.current!, options, overrides);
            setShowChildren(false);
        }

        return () => {
            if (editor) {
                editor.dispose();
            }
        };
    }, [monaco, options, overrides]);

    return (
        <div ref={divRef} {...rest}>
            {
                (showChildren)
                    ? kids
                    : null
            }
        </div>
    )
}
