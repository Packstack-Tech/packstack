import { FC } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router"
import { Button, Menu, Dropdown } from "antd"
import { ArrowDownOutlined, EllipsisOutlined } from "@ant-design/icons"

import { INVENTORY, NEW_PACK, PACKS, SETTINGS, LOGIN, REGISTER } from "routes"
import { useUserQuery } from "queries/user"

import {
  LogoImg,
  HeaderWrapper,
  Navigation,
  MobileNav,
  DonateBtn,
} from "./styles"

import Logo from "assets/packstack_logo_horizontal_blue_sm.png"

export const Header: FC = () => {
  const history = useHistory()
  const { isSuccess: loggedIn } = useUserQuery()

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN")
    window.location.reload()
  }

  const additionalOptions = (
    <Menu>
      <Menu.Item key="settings" onClick={() => history.push(SETTINGS)}>
        Settings
      </Menu.Item>
      <Menu.Item key="feedback">
        <a
          href="https://www.reddit.com/r/packstack/"
          target="_blank"
          rel="noreferrer"
        >
          Give Feedback
        </a>
      </Menu.Item>
      <Menu.Item key="donate">
        <DonateBtn
          href="https://www.patreon.com/packstack"
          target="_blank"
          rel="noreferrer"
        >
          ❤️ Donate
        </DonateBtn>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  )

  const renderAuthenticatedNav = () => (
    <>
      <Button onClick={() => history.push(INVENTORY)} type="text">
        Inventory
      </Button>
      <Button onClick={() => history.push(PACKS)} type="text">
        Packs
      </Button>
      <Button onClick={() => history.push(NEW_PACK)} type="text">
        Create Pack
      </Button>
      <Dropdown overlay={additionalOptions}>
        <Button
          icon={<EllipsisOutlined />}
          shape="circle"
          style={{ marginLeft: 8 }}
        />
      </Dropdown>
    </>
  )

  const renderUnauthenticatedNav = () => (
    <>
      <Button onClick={() => history.push(LOGIN)}>Sign In</Button>
      <Button type="primary" onClick={() => history.push(REGISTER)}>
        Register
      </Button>
    </>
  )

  const mobileAuthMenu = () => (
    <Menu className="mobile-nav">
      <Menu.Item key={INVENTORY}>
        <Link to={INVENTORY}>Inventory</Link>
      </Menu.Item>
      <Menu.Item key={PACKS}>
        <Link to={PACKS}>Packs</Link>
      </Menu.Item>
      <Menu.Item key={NEW_PACK}>
        <Link to={NEW_PACK}>Create Pack</Link>
      </Menu.Item>
      <Menu.Item key={SETTINGS}>
        <Link to={SETTINGS}>Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a
          href="https://www.reddit.com/r/packstack/"
          target="_blank"
          rel="noreferrer"
        >
          Give Feedback
        </a>
      </Menu.Item>
      <Menu.Item>
        <DonateBtn
          href="https://www.patreon.com/packstack"
          target="_blank"
          rel="noreferrer"
        >
          Donate
        </DonateBtn>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  )

  const mobileUnauthMenu = () => (
    <Menu className="mobile-nav">
      <Menu.Item key={LOGIN}>
        <Link to={LOGIN}>Login</Link>
      </Menu.Item>
      <Menu.Item key={REGISTER}>
        <Link to={REGISTER}>Register</Link>
      </Menu.Item>
    </Menu>
  )

  const navState = loggedIn
    ? renderAuthenticatedNav()
    : renderUnauthenticatedNav()
  const mobileNavState = loggedIn ? mobileAuthMenu() : mobileUnauthMenu()

  return (
    <HeaderWrapper>
      <Link to={INVENTORY}>
        <LogoImg src={Logo} alt="Packstack logo" />
      </Link>
      <Navigation>{navState}</Navigation>
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
  )
}
