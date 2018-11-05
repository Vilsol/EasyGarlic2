import { css, StyleSheet } from 'aphrodite';
import React from 'react';

import Colors from 'Services/Colors';

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

    ':hover': {
      backgroundColor: 'hsl(0,0%,98%)',
      borderColor: 'hsl(0,0%,70%)',
    },

    ':focus': {
      borderColor: Colors.primary,
      boxShadow: `0 0 0 1px ${Colors.primary}`,
    },
  },

  danger: {
    backgroundColor: Colors.danger,
    borderColor: Colors.dangerLighter,
    color: 'white',

    ':active': {
      backgroundColor: Colors.dangerDarker,
      borderColor: Colors.dangerDarker,
    },

    ':focus': {
      borderColor: Colors.dangerDarker,
    },
    ':hover': {
      backgroundColor: Colors.danger,
      borderColor: Colors.dangerDarker,
    },

    ':disabled': {
      backgroundColor: `${Colors.dangerLighter} !important`,
      borderColor: `${Colors.dangerLighter} !important`,
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

    ':focus': {
      borderColor: Colors.primaryDarker,
    },
    ':hover': {
      backgroundColor: Colors.primary,
      borderColor: Colors.primaryDarker,
    },

    ':disabled': {
      backgroundColor: `${Colors.primaryLighter} !important`,
      borderColor: `${Colors.primaryLighter} !important`,
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
  label: string;
  type: 'submit' | 'button' | 'link';
  variant:
    | ('primary' | 'secondary' | 'big' | 'danger' | 'inline')
    | Array<'primary' | 'secondary' | 'big' | 'danger' | 'inline'>;
  onClick?: (
    e: React.MouseEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
}

class Button extends React.Component<IButtonProps> {
  public static defaultProps = {
    className: '',
    disabled: false,
    onClick: undefined,
    variant: 'secondary',
  };

  public render() {
    const { className, disabled, id, label, type, variant } = this.props;
    const variantArray = typeof variant === 'string' ? [variant] : variant;
    console.log(variantArray);
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
