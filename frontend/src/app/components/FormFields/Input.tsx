import * as React from 'react';
import { ChangeEvent } from "react";

import { Input } from './styles';
import { SharedInputProps } from './types';
import { InputContainer } from './utils';

interface InputProps extends SharedInputProps {
    value: string | number;
    onChange: (value: string | number) => void;
    autocomplete?: string;
    type?: 'text' | 'number' | 'url' | 'password';
    placeholder?: string;
}

const FormInput: React.FC<InputProps> = ({ onChange, label, error, errorMsg, tip, last, style, ...props }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };
    return (
        <InputContainer {...{ error, errorMsg, label, tip, last, style }}>
            <Input {...props} onChange={handleChange}/>
        </InputContainer>
    );
};

export default FormInput;