import * as React from 'react';

import Api from 'lib/api';

import AppConsumer from 'AppContext';

export default function withApi<A>(mapApiToProps: (api: Api) => A) {
    return <T extends {}>(ToWrap: React.ComponentType<T & A>): React.ComponentType<T> => (props: T) => (
        <AppConsumer>
            {app => <ToWrap {...props} {...mapApiToProps(app.api)} />}
        </AppConsumer>
    );
}