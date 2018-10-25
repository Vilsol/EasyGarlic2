import { css, StyleSheet } from 'aphrodite';
import React from 'react';

import Colors from 'Models/Colors';

// Styles for the entire form and its content
const styles = StyleSheet.create({
  inputField: {
    display: 'block',
  },

  label: {
    display: 'block',
  },

  input: {
    display: 'block',
    marginBottom: '0.5em',
    marginTop: '0.5em',
    minHeight: '38px',
    padding: '2px 8px',
    width: '100%',

    backgroundColor: 'hsl(0,0%,98%)',
    color: Colors.textBlack,
    fontSize: '1em',

    borderColor: 'hsl(0,0%,80%)',
    borderRadius: '4px',
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    outline: '0',
    transition: 'all 100ms',

    ':focus': {
      borderColor: Colors.primary,
      boxShadow: `0 0 0 1px ${Colors.primary}`,
    },
    ':hover': {
      borderColor: 'hsl(0,0%,70%)',
    },
  },
});

interface IInputFieldProps {
  id: string;
  label: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

class InputField extends React.Component<IInputFieldProps> {
  public static defaultProps: Partial<IInputFieldProps> = {
    value: '',
  };

  public render() {
    const { id, label, type, value } = this.props;
    return (
      <div className={css(styles.inputField)}>
        <label className={css(styles.label)} htmlFor={id}>
          {label}
        </label>
        <input
          className={css(styles.input)}
          id={id}
          type={type}
          name={id}
          autoComplete="off"
          value={value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }

  /**
   * Called when the input field changes.
   * Call its prop function.
   * @param e The event object for the input change.
   */
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    if (onChange !== undefined) {
      onChange(e);
    }
  };

  /**
   * Called when the input field loses focus.
   * Call its prop function.
   * @param e The event object for the input focus change.
   */
  private handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { onBlur } = this.props;
    if (onBlur !== undefined) {
      onBlur(e);
    }
  };
}

export default InputField;
