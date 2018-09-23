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
  static getDerivedStateFromProps(nextProps, previousState) {
    if (nextProps.value !== previousState.value) {
      return { value: nextProps.value };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      value,
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  /**
   * Called when the value of the input field is changed
   * @param {Event} e The event object from the change event
   */
  handleChangeValue(e) {
    const { onChange } = this.props;
    // Update the state value of the field
    this.setState({ value: e.target.value });
    // Call the onChange prop
    onChange(e.target.value);
  }

  render() {
    const { id, label } = this.props;
    const { value } = this.state;
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
          onChange={this.handleChangeValue}
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
