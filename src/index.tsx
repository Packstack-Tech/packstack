import ReactDOM from "react-dom"
import * as Sentry from "@sentry/browser"
import { ThemeProvider } from "styled-components"
import DocumentTitle from "react-document-title"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"

import App from "./App"
import * as serviceWorker from "./serviceWorker"
import WithAnalytics from "app/components/higher-order/with-analytics"
import { HistoryListener } from "react-router-navigation-confirm"

import { theme } from "styles/theme"
import "antd/dist/antd.css"
import "styles/style.css"

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DNS })
const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <DocumentTitle title={`Packstack | Backpacking packing lists`}>
        <Router>
          <Route
            render={(props) => (
              <WithAnalytics {...props}>
                <HistoryListener>
                  <App />
                </HistoryListener>
              </WithAnalytics>
            )}
          />
        </Router>
      </DocumentTitle>
    </ThemeProvider>
  </QueryClientProvider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
