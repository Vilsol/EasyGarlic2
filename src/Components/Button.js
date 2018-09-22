import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';

// Styles for the entire form and its content
const styles = StyleSheet.create({
  button: {
    display: 'block',
    minHeight: '38px',
    marginTop: '0.5em',
    marginBottom: '0.5em',
    padding: '2px 1em',
    backgroundColor: 'hsl(0,0%,98%)',
    color: 'hsl(0,0%,50%)',
    fontSize: '1em',
    fontWeight: 'bold',
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
      borderColor: '#ffca42',
      boxShadow: '0 0 0 1px #ffca42',
    },
  },
  primary: {
    backgroundColor: '#ffca42',
    color: '#24292e',
    borderColor: '#ffd771',
    ':hover': {
      borderColor: '#f0ad00',
    },
    ':focus': {
      borderColor: '#f0ad00',
    },
    ':active': {
      backgroundColor: '#f0ad00',
      borderColor: '#f0ad00',
    },
  },
  big: {
    padding: '0.5em 1.5em',
    fontSize: '1.25em',
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
    if (type === 'submit') {
      return (
        <input
          className={`${className} ${css(styles.button, variant.map(v => styles[v]))}`}
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
        className={`${className} ${css(styles.button, variant.map(v => styles[v]))}`}
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
  type: PropTypes.oneOf(['submit', 'button']).isRequired,
  variant: PropTypes.arrayOf(PropTypes.oneOf(['primary', 'secondary', 'big'])),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  onClick: () => {},
  variant: ['secondary'],
};

export default Button;
