import * as React from 'react';
import * as ReactGA from 'react-ga';
import { RouteComponentProps } from 'react-router-dom';

ReactGA.initialize(process.env.REACT_APP_GA || '');
class WithAnalytics extends React.Component<RouteComponentProps<{}>> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
    }

    trackPage = (page: string) => {
        if (process.env.NODE_ENV === 'production') {
            ReactGA.set({ page });
            ReactGA.pageview(page);
        }
    };

    componentDidMount() {
        const page = this.props.location.pathname;
        this.trackPage(page);
    }

    componentWillReceiveProps(nextProps: RouteComponentProps<{}>) {
        const currentPage = this.props.location.pathname;
        const nextPage = nextProps.location.pathname;

        if (currentPage !== nextPage) {
            this.trackPage(nextPage);
        }
    }

    render() {
        return this.props.children;
    }
}

export default WithAnalytics;