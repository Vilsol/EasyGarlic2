import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import Select from 'react-select';

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
    marginTop: '0.5em',
    marginBottom: '0.5em',
  },
});


// Styles for the Process Dropdown
const customStyles = {
  control: (style, { isFocused }) => (!isFocused ? style : {
    ...style,
    borderColor: Colors.primary,
    boxShadow: `0 0 0 1px ${Colors.primary}`,
    ':hover': {
      borderColor: Colors.primary,
    },
  }),
};


class DropdownField extends Component {
  render() {
    const {
      id, label, onChange, options, isMulti, defaultIndex,
    } = this.props;
    return (
      <div className={css(styles.inputField)}>
        <label className={css(styles.label)} htmlFor={id}>{label}</label>
        <Select
          className={css(styles.input)}
          id={id}
          name={id}
          isMulti={isMulti}
          styles={customStyles}
          options={options}
          onChange={onChange}
          defaultOption={defaultIndex === false ? 'false' : options[defaultIndex]}
        />
      </div>
    );
  }
}

DropdownField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  isMulti: PropTypes.bool,
  defaultIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

DropdownField.defaultProps = {
  onChange: () => {},
  isMulti: false,
  defaultIndex: false,
};

export default DropdownField;
