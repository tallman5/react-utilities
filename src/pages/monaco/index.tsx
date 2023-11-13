import React, { useEffect, useState } from "react"
import { CodeEditor, useMonaco } from "../../react-utilities"
import Layout from "../../components/layout"
import { languages } from "monaco-editor";

const MonacoIndex = () => {
    const [codeValue, setCodeValue] = useState('# If using a mini12864, set all Neopixels to red.\n[delayed_gcode setdisplayneopixel]\ninitial_duration: 1\ngcode:\n   SET_LED LED = btt_mini12864 RED = 1 GREEN = 0 BLUE = 0 INDEX = 1 TRANSMIT = 0\n   SET_LED LED = btt_mini12864 RED = 1 GREEN = 0 BLUE = 0 INDEX = 2 TRANSMIT = 0\n   SET_LED LED = btt_mini12864 RED = 1 GREEN = 0 BLUE = 0 INDEX = 3');
    const monaco = useMonaco();
    const [allLanguages, setAllLanguages] = useState<languages.ILanguageExtensionPoint[]>([]);
    const [divHeight, setDivHeight] = useState('150');

    useEffect(() => {
        if (!monaco) return;
        if (allLanguages.length > 0) return;
        const allLangs = monaco.languages.getLanguages();
        setAllLanguages(allLangs);
    }, [monaco])

    return (
        <Layout>
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <h1>Monaco Languages</h1>
                        View all the languages currently available in Monaco.
                        Add code to the text area.
                        Set the height of the code viewers.
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-10">
                        <textarea id='codeTextbox' rows={4} onChange={(e) => { setCodeValue(e.target.value) }} className="form-control" defaultValue={codeValue}></textarea>
                    </div>
                    <div className="col-2">
                        <input id='heightTextbox' onChange={(e) => { setDivHeight(e.target.value) }} className="form-control" placeholder="Height" defaultValue={divHeight} type="number" />
                    </div>
                </div>
                {
                    allLanguages?.map(l => {
                        return (
                            <div key={l.id}>
                                <br />
                                <div>{l.id}</div>
                                <div>
                                    <CodeEditor style={{ height: `${divHeight}px` }}
                                        options={{
                                            theme: 'dark-converted',
                                            value: codeValue,
                                            language: l.id,
                                        }}
                                    />
                                </div>
                                <br />
                            </div>
                        )
                    })
                }
            </div>
        </Layout>
    )
}

export default MonacoIndex
