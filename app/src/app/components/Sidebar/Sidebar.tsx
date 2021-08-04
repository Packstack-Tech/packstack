import * as React from 'react';
import { useSidebar } from "./Context";
import { SidebarWrapper, Header, Content } from "./styles";

const Sidebar: React.FC = () => {
    const { state } = useSidebar();
    if (!state.show) {
        return null;
    }
    return (
        <SidebarWrapper>
            <Header>
                {state.title}
            </Header>
            <Content>
                {state.content}
            </Content>
        </SidebarWrapper>
    );
};

export default Sidebar;