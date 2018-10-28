import { css, StyleSheet } from 'aphrodite';
import React from 'react';

import Button from 'App/Components/Button';

// Styles for the entire form and its content
const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '1em',
    marginRight: '1em',
  },
  title: {
    margin: 0,
    paddingBottom: '0.25em',
    paddingTop: '0.25em',
  },
});

interface IActionHeaderProps {
  className?: string;
  title: string;
  buttonId: string;
  buttonLabel: string;
  onClick: () => void;
}

class ActionHeader extends React.Component<IActionHeaderProps> {
  public render() {
    const { className, title, buttonId, buttonLabel, onClick } = this.props;
    return (
      <div className={`${css(styles.container)} ${className} `}>
        <h1 className={css(styles.title)}>{title}</h1>
        <Button
          className={css(styles.button)}
          id={buttonId}
          label={buttonLabel}
          type="button"
          variant="primary"
          onClick={onClick}
        />
      </div>
    );
  }
}
export default ActionHeader;
