import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import Select from 'react-select';

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
    borderColor: '#ffca42',
    boxShadow: '0 0 0 1px #ffca42',
    ':hover': {
      borderColor: '#ffca42',
    },
  }),
};


class DropdownField extends Component {
  render() {
    const {
      id, label, onChange, options,
    } = this.props;
    return (
      <div className={css(styles.inputField)}>
        <label className={css(styles.label)} htmlFor={id}>{label}</label>
        <Select
          className={css(styles.input)}
          id={id}
          name={id}
          isMulti
          styles={customStyles}
          options={options}
          onChange={onChange}
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
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

DropdownField.defaultProps = {
  onChange: () => {},
};

export default DropdownField;
