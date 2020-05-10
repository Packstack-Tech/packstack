import * as React from 'react';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OptionsType } from 'react-select/src/types';
import { Option, SharedInputProps } from "./types";

import { InputContainer } from "./utils";
import { selectStyles } from "./styles";

interface SelectProps extends SharedInputProps {
    options: OptionsType<Option<any>>;
    onChange: (option: Option<any>) => void;
    defaultValue?: Option<any>;
    value?: Option<any> | null;
    inputValue?: string;
    clearable?: boolean;
}

const SelectCreatable: React.FC<SelectProps> = (
    {
        options,
        value,
        inputValue,
        defaultValue,
        onChange,
        placeholder,
        clearable,
        ...rest
    }) => {
    const handleChange = (value: any, action: ActionMeta) => onChange(value);
    return (
        <InputContainer {...rest}>
            <CreatableSelect
                value={value}
                inputValue={inputValue}
                options={options}
                defaultValue={defaultValue}
                placeholder={placeholder}
                onChange={handleChange}
                isClearable={clearable}
                styles={selectStyles}
            />
        </InputContainer>
    );
};

export default SelectCreatable;