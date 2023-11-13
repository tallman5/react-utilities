import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

const HomePage = () => {
    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col'><h1>Utilities Test Site</h1></div>
                </div>
                <br />
                <div className="row">
                    <div className="col-5">
                        <div className="list-group">
                            <Link to="/monaco/" className="list-group-item list-group-item-action">Monaco Languages</Link>
                            <Link to="/monaco/grammer" className="list-group-item list-group-item-action">Monaco Grammer Testing</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage
