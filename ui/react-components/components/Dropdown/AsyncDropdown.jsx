import React, {Component, useState} from "react";
import {components} from "react-select";
import AsyncSelect from "react-select/async";
import {searchIcon, resetSelectContainer} from './Dropdown.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";

const IndicatorSeparator = () => null;
const ValueContainer = ({ children, ...props }) => {
    return (
        components.ValueContainer && (
            <components.ValueContainer {...props}>
                {!!children && (
                    <i
                        className={classNames("fa", "fa-search", searchIcon)}
                        aria-hidden="true"
                    />
                )}
                {children}
            </components.ValueContainer>
        )
    );
};

const AsyncDropdown = (props) => {
    const [inputValue, setInputValue] = useState();
    const [value, setValue] = useState('');
    const {loadOptions, placeholder, onChange, intl} = props;
    let select;
    const noOptionsMessage = intl.formatMessage({id: 'DROPDOWN_NO_OPTIONS_MESSAGE', defaultMessage: 'Type to search'});
    const loadingMessage = intl.formatMessage({id: 'DROPDOWN_LOADING_MESSAGE', defaultMessage: 'Loading...'});

    const handleOnChange = (event) => {
        setInputValue('');
        setValue(event);
        if (event) {
        } else {
            setValue('');
        }
        onChange && onChange(event);
    };
    const handleOnInputChange = (event, {action}) => {
        if (action === 'input-change') {
            setInputValue(event);
            if (!event) {
                setValue(event);
            }
        }
    };
    const handleFocus = () => {
        value && setInputValue(value.label);
    };
    return (
        <div data-testid="asyncSelect">
            <AsyncSelect
                ref={ref => {
                    select = ref;
                }}
                cacheOptions
                defaultOptions
                className={classNames(resetSelectContainer, 'react-select-container')}
                classNamePrefix="react-select"
                components={{IndicatorSeparator, ValueContainer}}
                loadOptions={loadOptions}
                noOptionsMessage={() => noOptionsMessage}
                onChange={handleOnChange}
                placeholder={placeholder}
                onInputChange={handleOnInputChange}
                defaultInputValue={inputValue}
                inputValue={inputValue}
                onFocus={handleFocus}
                isClearable
                blurInputOnSelect={true}
                value={value}
                loadingMessage={() => loadingMessage}
            />
        </div>
    );
};

export default injectIntl(AsyncDropdown);

AsyncDropdown.propTypes = {
    loadOptions: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
};
