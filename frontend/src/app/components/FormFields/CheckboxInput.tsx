import * as React from 'react';
import { Checkbox } from 'antd';
import { SharedInputProps } from "./types";
import { InputContainer } from "./utils";

interface CheckboxProps extends SharedInputProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const CheckboxInput: React.FC<CheckboxProps> = ({ checked, onChange, label, tip, style }) => {
    const handleChange = (value: any) => onChange(value.target.checked);
    return (
        <InputContainer {...{ label, tip, style }}>
            <Checkbox 
                checked = {checked}    
                onChange={handleChange}
            />
        </InputContainer>
    );
};

export default CheckboxInput;