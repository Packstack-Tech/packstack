import * as React from 'react';
import { Switch } from 'antd';
import { SharedInputProps } from "./types";
import { InputContainer } from "./utils";

interface SwitchProps extends SharedInputProps {
    checked: boolean;
    checkedText?: string | undefined;
    uncheckedText?: string | undefined;
    onChange: (checked: boolean) => void;
}

const SwitchInput: React.FC<SwitchProps> = ({ checked, checkedText, uncheckedText, onChange, label, tip, style }) => {
    const handleChange = (value: any) => onChange(value);
    return (
        <InputContainer {...{ label, tip, style }} labelStyle = {{display:"inline", paddingRight: '8px'}}>
            <Switch
                checked = {checked}   
                checkedChildren={checkedText}
                unCheckedChildren={uncheckedText} 
                onChange={handleChange}
            />
        </InputContainer>
    );
};

export default SwitchInput;