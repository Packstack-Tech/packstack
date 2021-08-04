import * as React from 'react';
import { PageDescription, PageTitle } from 'styles/common';

interface FullPageErrorProps {
    text?: string;
    styles? : React.CSSProperties;
}

const FullPageError: React.FC<FullPageErrorProps> = ({ text, styles }) => {
    const defaultStyles: React.CSSProperties = {};

    return ( 
        <div style={defaultStyles}>
            <PageTitle><h1>Oops!</h1></PageTitle>  
            <PageDescription><p>{text}</p></PageDescription>
        </div>
    )
};

export default FullPageError;