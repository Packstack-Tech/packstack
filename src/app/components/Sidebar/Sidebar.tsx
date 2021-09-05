import { FC } from "react"
import { SidebarWrapper, Header, Content } from "./styles"

interface Props {
  title: string
  content: JSX.Element
  shown?: boolean
}

const Sidebar: FC<Props> = ({ title, content, shown = true }) => {
  if (!shown) {
    return null
  }
  return (
    <SidebarWrapper>
      <Header>{title}</Header>
      <Content>{content}</Content>
    </SidebarWrapper>
  )
}

export default Sidebar
