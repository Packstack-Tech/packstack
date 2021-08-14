import * as React from 'react';
import { ChangeEvent } from "react";

import { TextareaInput, CharacterCounter } from './styles';
import { SharedInputProps } from './types';
import { InputContainer } from './utils';

interface TextareaProps extends SharedInputProps {
    value: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
    allowedLength?: number;
}

const Textarea: React.FC<TextareaProps> = ({ onChange, label, error, errorMsg, last, tip, ...props }) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };
    return (
        <InputContainer {...{error, errorMsg, label, tip, last}}>
            <TextareaInput {...props} onChange={handleChange}/>
            {props.allowedLength && props.allowedLength > 0 && 
                    <CharacterCounter 
                        className={`${props.value.toString().length > props.allowedLength ? "full": ""}`}>
                            {props.value.toString().length}/{props.allowedLength}
                    </CharacterCounter>}
        </InputContainer>
    );
};

export default Textarea;