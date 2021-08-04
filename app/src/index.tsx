import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { ThemeProvider } from "styled-components";
import DocumentTitle from 'react-document-title';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppProvider } from './AppContext';
import WithAnalytics from 'app/components/higher-order/with-analytics';
import { HistoryListener } from 'react-router-navigation-confirm';

import { theme } from 'styles/theme';
import 'styles/style.less';

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DNS });

ReactDOM.render(
    <AppProvider>
        <ThemeProvider theme={theme}>
            <DocumentTitle title={`Packstack | Backpacking packing lists`}>
                <Router>
                    <Route render={(props) => (
                        <WithAnalytics {...props}>
                            <HistoryListener>
                                <App/>
                            </HistoryListener>
                        </WithAnalytics>
                    )}/>
                </Router>
            </DocumentTitle>
        </ThemeProvider>
    </AppProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
