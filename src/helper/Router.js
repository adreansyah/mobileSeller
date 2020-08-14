import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from './Auth';
import Error404 from '../page/error/Error404';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        (isLoggedIn())
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        (!isLoggedIn())
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)

export class DynamicRoute extends Component {
    render() {
        let pathname = this.props.location.pathname.toLowerCase();
        pathname = (pathname.charAt(pathname.length - 1) !== '/') ? pathname + '/' : pathname;
        let location = pathname.split('/');
        let param = {};
        let paramShort = [];
        if (location.length > 4) {
            for (var i = 3; i <= location.length; i++) {
                if (location[i]) {
                    paramShort.push(location[i]);
                    location[i + 1] && paramShort.push(location[i + 1]);
                    param[location[i]] = location[i + 1] ? location[i + 1] : '';
                    i++;
                }
            }
            location = [location[0], location[1], location[2], ''];
        }
        if (location[location.length - 2] !== 'index') location[location.length - 2] = this.camelize(location[location.length - 2]);
        var locationStr = location.join('/');
        try {
            const Layout = require('./../page' + locationStr.replace(/./g, (c, i) => i === locationStr.length - 1 ? '.js' : c)).default;
            return (<Layout param={param} {...this.props} paramShort={paramShort} {...this.props} />);
        } catch (e) {
            try {
                const Layout = require('./../page' + pathname + 'index.js').default;
                return (<Layout {...this.props} />);
            } catch (e) {
                return (<Error404 {...this.props} />);
            }
        }
    }

    camelize(text, separator) {

        // Assume separator is _ if no one has been provided.
        if (typeof (separator) === 'undefined') {
            separator = '-';
        }

        // Cut the string into words
        let words = text.split(separator);

        // Concatenate all capitalized words to get camelized string
        let result = '';
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            let capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
            result += capitalizedWord;
        }
        return result;
    }
}