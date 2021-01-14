import * as React from 'react';
import { ChangeEvent } from "react";

import { Input, CharacterCounter } from './styles';
import { SharedInputProps } from './types';
import { InputContainer } from './utils';


interface InputProps extends SharedInputProps {
    value: string | number;
    onChange: (value: string | number) => void;
    autocomplete?: string;
    type?: 'text' | 'number' | 'url' | 'password';
    placeholder?: string;
    allowedLength?: number;
}

const FormInput: React.FC<InputProps> = ({ onChange, label, error, errorMsg, tip, last, style, ...props }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };
    return (
        <InputContainer {...{ error, errorMsg, label, tip, last, style }}>
            <Input {...props} onChange={handleChange}/>
                {props.allowedLength && props.allowedLength > 0 && 
                    <CharacterCounter 
                        className={`${props.value.toString().length > props.allowedLength ? "full": ""}`}>
                            {props.value.toString().length}/{props.allowedLength}
                    </CharacterCounter>}
        </InputContainer>
    );
};

export default FormInput;