import * as React from "react"
import { CodeEditor } from "../../utilities"
import { Link } from "gatsby"

const ScratchIndex = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'><Link to="/">Home</Link></div>
            </div>
            <br />
            <div className="row">
                <div className="col">
                    <CodeEditor
                        style={{ border: '1px solid gray', height: '100px' }}
                        options={{
                            value: '// some comment',
                            language: 'javascript',
                            readOnly: true
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ScratchIndex
