import React from "react"
import Layout from "../../components/layout"
import { CodeEditor } from "../../react-utilities"

const GrammerPage = () => {
    const value = '# If using a mini12864, set all Neopixels to red.\n[delayed_gcode setdisplayneopixel]\ninitial_duration: 1\ngcode:\n   SET_LED LED = btt_mini12864 RED = 1 GREEN = 0 BLUE = 0 INDEX = 1 TRANSMIT = 0\n   SET_LED LED = btt_mini12864 RED = 1 GREEN = 0 BLUE = 0 INDEX = 2 TRANSMIT = 0\n   SET_LED LED = btt_mini12864 RED = 1 GREEN = 0 BLUE = 0 INDEX = 3';

    return (
        <Layout>
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <h1>Monaco Grammer Testing</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <CodeEditor
                            style={{ height: '200px' }}
                            options={{
                                value,
                                language: 'klipper-config',
                                theme: 'vs-dark',
                            }}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default GrammerPage
