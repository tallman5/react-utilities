import React, { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react"
import { useMonacoEditor } from "../hooks";
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

export interface ICodeEditor extends ComponentPropsWithoutRef<'div'> {
    options?: monacoEditor.editor.IStandaloneEditorConstructionOptions,
    overrides?: monacoEditor.editor.IEditorOverrideServices,
}

export const CodeEditor = ({ children, options, overrides, ...rest }: ICodeEditor) => {
    const divRef = useRef<HTMLDivElement>(null);
    const monacoEditor = useMonacoEditor();
    const [showChildren, setShowChildren] = useState(true);
    const kids = children || <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', color: 'gray', height: '100%', width: '100%' }}>Loading...</div>

    useEffect(() => {
        let editor: monacoEditor.editor.IStandaloneCodeEditor;
        if (monacoEditor) {
            editor = monacoEditor.editor.create(divRef.current!, options, overrides);
            setShowChildren(false);
        }

        return () => {
            if (editor) {
                editor.dispose();
            }
        };
    }, [monacoEditor]);

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
