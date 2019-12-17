import * as React from 'react';
import { ChangeEvent } from "react";

import { TextareaInput } from './styles';
import { SharedInputProps } from './types';
import { InputContainer } from './utils';

interface TextareaProps extends SharedInputProps {
    value: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
}

const Textarea: React.FC<TextareaProps> = ({ onChange, label, error, errorMsg, last, tip, ...props }) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };
    return (
        <InputContainer {...{error, errorMsg, label, tip, last}}>
            <TextareaInput {...props} onChange={handleChange}/>
        </InputContainer>
    );
};

export default Textarea;