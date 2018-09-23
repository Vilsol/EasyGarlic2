import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';

import Button from 'Components/Button';

// Styles for the entire form and its content
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'center',
  },
});

class ActionHeader extends Component {
  render() {
    const {
      className, title, buttonId, buttonLabel, onClick,
    } = this.props;
    return (
      <div className={`${className} ${css(styles.container)}`}>
        <h1>{title}</h1>
        <Button className={css(styles.button)} id={buttonId} label={buttonLabel} type="button" variant="primary" onClick={onClick} />
      </div>
    );
  }
}

ActionHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  buttonId: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ActionHeader.defaultProps = {
  className: '',
  onClick: () => {},
};

export default ActionHeader;
