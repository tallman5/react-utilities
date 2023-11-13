import { useEffect, useState } from "react";
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import { Registry, type IGrammarDefinition } from 'monaco-textmate'
import { wireTmGrammars } from 'monaco-editor-textmate'
import monacoLanguages from '../models/monacoLaguages.json';
import { useOnigasm, useScriptLoader } from ".";
import themeDark from '../components/monaco/theme/editor.dark.theme.json'
import themeLight from '../components/monaco/theme/editor.light.theme.json'

export type MonacoEditor = typeof monacoEditor;

export const useMonaco = () => {
    const version: string = '0.44.0'
    const monacoBaseUrl = `https://cdn.jsdelivr.net/npm/monaco-editor@${version}/min/vs`;
    const [m, setMonaco] = useState<MonacoEditor>();
    const scriptLoaded = useScriptLoader(`${monacoBaseUrl}/loader.js`);
    const onigasm = useOnigasm();

    useEffect(() => {
        if (m) return;
        if (!onigasm) return;
        if (!scriptLoaded) return;

        const loadMonaco = () => {
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
                        loadCustomStuff(monaco);
                    }
                );
            }
            else {
                // TODO: figure out why with multiple code editors on the same page,
                //       `require` is sometimes undefined ????
                setTimeout(loadMonaco, 1);
            }
        };

        const newM = (window as any).monaco;
        if (newM) {
            setMonaco(newM);
        }
        else {
            loadMonaco();
        }

    }, [m, onigasm, scriptLoaded]);

    return m;
}

const loadCustomStuff = async (m: MonacoEditor) => {
    const registry = new Registry({
        getGrammarDefinition: async (scopeName): Promise<IGrammarDefinition> => {
            const languageName = scopeName.split('.').pop() ?? '';
            const language = monacoLanguages.find(i => i.languageName === languageName)!.language;

            return {
                format: 'json',
                content: language
            }
        }
    });

    const grammars = new Map()
    monacoLanguages.forEach(ml => {
        grammars.set(ml.languageName, ml.scopeName);
        m.languages.register({ id: ml.languageName, extensions: ml.extensions })
        m.languages.setLanguageConfiguration(ml.languageName, {
            comments: {
                lineComment: ml.lineComment
            }
        });
    });

    m.editor.defineTheme('dark-converted', themeDark as monacoEditor.editor.IStandaloneThemeData)
    m.editor.defineTheme('light-converted', themeLight as monacoEditor.editor.IStandaloneThemeData)

    await wireTmGrammars(m, registry, grammars)
}