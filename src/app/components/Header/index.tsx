import * as React from "react";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";
import { Button, Menu, Dropdown } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";

import { INVENTORY, NEW_PACK, PROFILE, LOGIN, REGISTER } from "routes";

import { AppContext } from "AppContext";

import {
  LogoImg,
  HeaderWrapper,
  Navigation,
  MobileNav,
  NavItem,
} from "./styles";

import Logo from "assets/packstack_logo_horizontal_blue_sm.png";

const Header: React.FC<RouteComponentProps> = ({ history }) => {
  const app = React.useContext(AppContext);
  const loggedIn = !!app.userInfo;

  const renderAuthenticatedNav = () => (
    <>
      <NavItem onClick={() => history.push(INVENTORY)}>Inventory</NavItem>
      <NavItem onClick={() => history.push(NEW_PACK)}>Create Pack</NavItem>
      <NavItem onClick={() => history.push(PROFILE)}>My Packs</NavItem>
    </>
  );

  const renderUnauthenticatedNav = () => (
    <>
      <NavItem onClick={() => history.push(LOGIN)}>Sign In</NavItem>
      <NavItem onClick={() => history.push(REGISTER)}>Register</NavItem>
    </>
  );

  const mobileAuthMenu = () => (
    <Menu className="mobile-nav">
      <Menu.Item key={INVENTORY}>
        <Link to={INVENTORY}>Inventory</Link>
      </Menu.Item>
      <Menu.Item key={NEW_PACK}>
        <Link to={NEW_PACK}>Create Pack</Link>
      </Menu.Item>
      <Menu.Item key={PROFILE}>
        <Link to={PROFILE}>My Packs</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={() => app.logout()}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const mobileUnauthMenu = () => (
    <Menu className="mobile-nav">
      <Menu.Item key={LOGIN}>
        <Link to={LOGIN}>Login</Link>
      </Menu.Item>
      <Menu.Item key={REGISTER}>
        <Link to={REGISTER}>Register</Link>
      </Menu.Item>
    </Menu>
  );

  const navState = loggedIn
    ? renderAuthenticatedNav()
    : renderUnauthenticatedNav();
  const mobileNavState = loggedIn ? mobileAuthMenu() : mobileUnauthMenu();
  const navigation = app.isBooting ? null : navState;

  return (
    <HeaderWrapper>
      <Link to={INVENTORY}>
        <LogoImg src={Logo} alt="Packstack logo" />
      </Link>
      <Navigation>{navigation}</Navigation>
      <MobileNav>
        <Dropdown
          overlay={() => mobileNavState}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Button>
            Menu <ArrowDownOutlined />
          </Button>
        </Dropdown>
      </MobileNav>
    </HeaderWrapper>
  );
};

export default withRouter(Header);
