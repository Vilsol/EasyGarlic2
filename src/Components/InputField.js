import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';

import { Colors } from 'Config';

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
    minHeight: '38px',
    width: '100%',
    marginTop: '0.5em',
    marginBottom: '0.5em',
    padding: '2px 8px',
    backgroundColor: 'hsl(0,0%,98%)',
    color: Colors.textBlack,
    fontSize: '1em',
    borderColor: 'hsl(0,0%,80%)',
    borderRadius: '4px',
    borderStyle: 'solid',
    borderWidth: '1px',
    outline: '0',
    transition: 'all 100ms',
    boxSizing: 'border-box',
    ':hover': {
      borderColor: 'hsl(0,0%,70%)',
    },
    ':focus': {
      borderColor: Colors.primary,
      boxShadow: `0 0 0 1px ${Colors.primary}`,
    },
  },
});

class InputField extends Component {
  render() {
    const {
      id, label, value, onChange,
    } = this.props;
    return (
      <div className={css(styles.inputField)}>
        <label className={css(styles.label)} htmlFor={id}>{label}</label>
        <input
          className={css(styles.input)}
          id={id}
          type="text"
          name={id}
          autoComplete="off"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    );
  }
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

InputField.defaultProps = {
  onChange: () => {},
  value: '',
};

export default InputField;
