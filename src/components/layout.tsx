import { Link } from 'gatsby'
import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { isBrowser } from '../react-utilities';

export interface ILayout extends ComponentPropsWithoutRef<'div'> {
}

const Layout = ({ children }: ILayout) => {
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        if (isBrowser) {
            setPathname(window.location.pathname.toLowerCase())
        }
    }, [])

    return (
        <div style={{ minHeight: '100.1vh', display: 'flex', flexDirection: 'column' }}>
            <header>
                <nav className="navbar navbar-expand-md">
                    <div className="container">
                        <Link className="navbar-brand" to='/'>
                            <img src='/favicon.ico' alt='m' width={32} />
                            <span style={{ marginLeft: '5px' }}>printerfig.com</span>
                        </Link>
                        <div style={{ justifyContent: 'space-between' }} className={'collapse navbar-collapse show'} id="navbarNavAltMarkup">
                            <div className={'navbar-nav'}>
                            </div>
                            <div className='d-flex'>
                            </div>
                        </div>
                    </div>
                </nav>
                <hr className='p-0 m-0' />
            </header>
            <br />
            <main style={{ flexGrow: 1 }}>
                {children}
            </main>
            <br />
        </div>
    )
}

export default Layout
