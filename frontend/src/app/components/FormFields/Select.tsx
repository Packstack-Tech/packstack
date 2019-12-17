import * as React from 'react';
import ReactSelect from 'react-select';
import { OptionsType } from 'react-select/src/types';
import { Option, SharedInputProps } from "./types";

import { InputContainer } from "./utils";
import { selectStyles } from "./styles";

interface SelectProps extends SharedInputProps {
    options: OptionsType<Option>;
    onChange: (option: Option) => void;
    defaultValue?: Option;
    value?: Option;
}

const Select: React.FC<SelectProps> = ({ options, value, defaultValue, onChange, error, last, errorMsg, label, placeholder, tip, style }) => {
    const handleChange = (value: any) => onChange(value);
    return (
        <InputContainer {...{ error, errorMsg, label, tip, last, style }}>
            <ReactSelect
                value={value}
                options={options}
                defaultValue={defaultValue}
                placeholder={placeholder}
                onChange={handleChange}
                styles={selectStyles}
            />
        </InputContainer>
    );
};

export default Select;