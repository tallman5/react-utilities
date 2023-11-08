import * as React from "react"
import { CodeEditor } from "../utilities"
import { Link } from "gatsby"

const HomePage = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'><Link to="/scratch">Scratch</Link></div>
            </div>
            <br />
            <div className='row'>
                <div className='col'><h1>Utilities Test Site</h1></div>
            </div>
            <br />
            <div className="row">
                <div className="col">
                    <CodeEditor
                        style={{ border: '1px solid gray', height: '100px' }}
                        options={{
                            value: '// some comment',
                            language: 'javascript',
                            theme: 'vs-dark'
                        }}
                    ></CodeEditor>
                </div>
            </div>
        </div>
    )
}

export default HomePage
