import { css, StyleSheet } from 'aphrodite';
import React, { CSSProperties } from 'react';
import Select from 'react-select';
import { Styles } from 'react-select/lib/styles';
import { ValueType } from 'react-select/lib/types';

import IEnumerableItem from 'App/Components/IEnumerableItem';
import Colors from 'Models/Colors';

// Styles for the entire form and its content
const styles = StyleSheet.create({
  input: {
    marginBottom: '0.5em',
    marginTop: '0.5em',
  },
  inputField: {
    display: 'block',
  },
  label: {
    display: 'block',
  },
});

// Styles for the Process Dropdown
const customStyles: Partial<Styles> = {
  control: (style: React.CSSProperties, { isFocused }): CSSProperties =>
    !isFocused
      ? style
      : ({
          ...style,
          borderColor: Colors.primary,
          boxShadow: `0 0 0 1px ${Colors.primary}`,

          ':hover': {
            borderColor: Colors.primary,
          },
        } as CSSProperties),
};

interface IDropdownFieldProps {
  className?: string;
  id: string;
  label: string;
  onChange: (value: ValueType<IEnumerableItem>) => void;
  onBlur: (event: React.FocusEvent<HTMLElement>) => void;
  value?: ValueType<IEnumerableItem>;
  options: IEnumerableItem[];
  isMulti?: boolean;
}

class DropdownField extends React.Component<IDropdownFieldProps> {
  public static defaultProps = {
    className: '',
    isMulti: false,
    value: '',
  };
  public render() {
    const { id, label, onChange, onBlur, options, isMulti, value } = this.props;
    return (
      <div className={css(styles.inputField)}>
        <label className={css(styles.label)} htmlFor={id}>
          {label}
        </label>
        <Select
          className={css(styles.input)}
          id={id}
          name={id}
          isMulti={isMulti}
          styles={customStyles}
          options={options}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
      </div>
    );
  }
}

export default DropdownField;
