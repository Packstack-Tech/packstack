import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { HOME } from 'routes';

import AppConsumer from 'AppContext';
import Loading from 'app/components/Loading';
import Profile from './Profile';

import { PageWrapper } from "styles/common";

class ProfileContainer extends React.Component<RouteComponentProps> {
    render() {
        return (
            <AppConsumer>
                {app => {
                    if (app.isBooting) {
                        return <Loading size="large"/>
                    }

                    if (!app.userInfo) {
                        this.props.history.push(HOME);
                        return null;
                    }

                    return (
                        <PageWrapper>
                            <Profile getPacks={app.api.PackService.getUserPacks}
                                     updateUser={app.api.UserService.update}
                                     deletePack={app.api.PackService.delete}
                                     copyPack={app.api.PackService.copyPack}
                                     fetchUser={app.fetchUser}
                                     user={app.userInfo}/>
                        </PageWrapper>
                    )
                }}
            </AppConsumer>
        )
    }
}

export default ProfileContainer;