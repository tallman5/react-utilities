import { GatsbyBrowser } from 'gatsby';
import './node_modules/bootstrap/dist/css/bootstrap.min.css'
import { isBrowser } from './src/react-utilities';

export const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
    if (!isBrowser) return;
    const body = document.body;
    if (body) {
        body.setAttribute('data-bs-theme', 'dark');
    }
};
