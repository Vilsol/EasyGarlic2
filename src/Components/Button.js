import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';

import { Colors } from 'Config';

// Styles for the entire form and its content
const styles = StyleSheet.create({
  button: {
    display: 'block',
    minHeight: '38px',
    marginTop: '0.5em',
    marginBottom: '0.5em',
    padding: '2px 1em',
    backgroundColor: 'white',
    color: Colors.textBlack,
    fontSize: '1em',
    fontWeight: 'bold',
    textDecoration: 'none',
    borderColor: 'hsl(0,0%,80%)',
    borderRadius: '4px',
    borderStyle: 'solid',
    borderWidth: '1px',
    outline: '0',
    transition: 'all 100ms',
    boxSizing: 'border-box',
    ':hover': {
      borderColor: 'hsl(0,0%,70%)',
      backgroundColor: 'hsl(0,0%,98%)',
    },
    ':focus': {
      borderColor: Colors.primary,
      boxShadow: `0 0 0 1px ${Colors.primary}`,
    },
  },
  primary: {
    backgroundColor: Colors.primary,
    color: Colors.black,
    borderColor: Colors.primaryLighter,
    ':hover': {
      borderColor: Colors.primaryDarker,
      backgroundColor: Colors.primary,
    },
    ':focus': {
      borderColor: Colors.primaryDarker,
    },
    ':active': {
      backgroundColor: Colors.primaryDarker,
      borderColor: Colors.primaryDarker,
    },
  },
  big: {
    padding: '0.5em 1.5em',
    fontSize: '1.25em',
  },
  inline: {
    display: 'inline',
  },
});

class Button extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    e.preventDefault();
    const { onClick } = this.props;
    onClick(e);
  }

  render() {
    const {
      className, id, label, type, variant,
    } = this.props;
    const variantArray = (typeof variant === 'string') ? [variant] : variant;
    if (type === 'submit') {
      return (
        <input
          className={`${css(styles.button, variantArray.map(v => styles[v]))} ${className} `}
          id={id}
          type="submit"
          name={id}
          onClick={this.clickHandler}
          value={label}
        />
      );
    }
    return (
      <button
        className={`${css(styles.button, variantArray.map(v => styles[v]))} ${className}`}
        id={id}
        type="submit"
        name={id}
        onClick={this.clickHandler}
      >
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['submit', 'button', 'link']).isRequired,
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'big']),
    PropTypes.arrayOf(
      PropTypes.oneOf(['primary', 'secondary', 'big', 'inline']),
    ),
  ]),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  onClick: () => {},
  variant: ['secondary'],
};

export default Button;
