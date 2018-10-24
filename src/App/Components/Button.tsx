import { css, StyleSheet } from 'aphrodite';
import React from 'react';

import Colors from 'Models/Colors';

// Styles for the entire form and its content
const styles = StyleSheet.create({
  button: {
    display: 'block',
    marginBottom: '0.5em',
    marginTop: '0.5em',
    minHeight: '38px',
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
    boxSizing: 'border-box',
    outline: '0',
    transition: 'all 100ms',

    ':focus': {
      borderColor: Colors.primary,
      boxShadow: `0 0 0 1px ${Colors.primary}`,
    },
    ':hover': {
      backgroundColor: 'hsl(0,0%,98%)',
      borderColor: 'hsl(0,0%,70%)',
    },
  },
  primary: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLighter,
    color: Colors.textBlack,

    ':active': {
      backgroundColor: Colors.primaryDarker,
      borderColor: Colors.primaryDarker,
    },
    ':disabled': {
      backgroundColor: `${Colors.primaryLighter} !important`,
      borderColor: `${Colors.primaryLighter} !important`,
    },
    ':focus': {
      borderColor: Colors.primaryDarker,
    },
    ':hover': {
      backgroundColor: Colors.primary,
      borderColor: Colors.primaryDarker,
    },
  },

  big: {
    fontSize: '1.25em',
    padding: '0.5em 1.5em',
  },
  inline: {
    display: 'inline',
  },
});

interface IButtonProps {
  className?: string;
  disabled?: boolean;
  id: string;
  label?: string;
  type: 'submit' | 'button' | 'link';
  variant:
    | ('primary' | 'secondary' | 'big')
    | Array<'primary' | 'secondary' | 'big'>;
  onClick?: (
    e: React.MouseEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
}

class Button extends React.Component<IButtonProps> {
  public static defaultProps: Partial<IButtonProps> = {
    className: '',
    disabled: false,
    onClick: undefined,
    variant: 'secondary',
  };

  public render() {
    const { className, disabled, id, label, type, variant } = this.props;
    const variantArray = typeof variant === 'string' ? [variant] : variant;
    if (type === 'submit') {
      return (
        <input
          className={`${css(
            styles.button,
            variantArray.map(v => styles[v])
          )} ${className} `}
          id={id}
          type="submit"
          name={id}
          onClick={this.clickHandler}
          value={label}
          disabled={disabled}
        />
      );
    }
    return (
      <button
        className={`${css(
          styles.button,
          variantArray.map(v => styles[v])
        )} ${className}`}
        id={id}
        type="submit"
        name={id}
        onClick={this.clickHandler}
        disabled={disabled}
      >
        {label}
      </button>
    );
  }

  private clickHandler = (
    e: React.MouseEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    const { onClick } = this.props;
    if (onClick !== undefined) {
      e.preventDefault();
      onClick(e);
    }
  };
}

export default Button;
