import * as React from 'react';
import Caret from "../Caret";
import { SectionHeader } from "styles/common"

interface ExpandablePanelProps {
  Header: JSX.Element;
  children: JSX.Element[] | JSX.Element;
}

const ExpandablePanel: React.FC<ExpandablePanelProps> = ({ Header, children }) => {
  const [visible, setVisible] = React.useState<boolean>(true);

	return (
    <>
      <SectionHeader>
          {Header}
          <Caret visible={visible} onClick={() => setVisible(!visible)} />
      </SectionHeader>
      <div style={{ display: visible ? 'block' : 'none', padding: '0 8px' }}>
        {children}
      </div>
    </>
  )
};

export default ExpandablePanel;