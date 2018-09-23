import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';

import { Colors } from 'Config';

// Styles for the entire form and its content
const styles = StyleSheet.create({
  list: {
    listStyle: 'none',
    borderTop: '1px solid hsl(0,0%,80%)',
    padding: 0,
    margin: 0,
  },
  listItem: {
    borderBottom: '1px solid hsl(0,0%,80%)',
  },
  listItemContent: {
    display: 'block',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    paddingLeft: '0.5em',
    width: 'calc(100% - 0.5em)',
    textAlign: 'inherit',
    ':hover': {
      backgroundColor: Colors.hoverBlue,
    },
  },
  listItemLink: {
    background: 'none',
    color: 'inherit',
    border: 'none',
    font: 'inherit',
    cursor: 'pointer',
    ':active': {
      backgroundColor: Colors.selectBlue,
    },
  },
});

class List extends Component {
  constructor(props) {
    super(props);

    this.clickItemHandler = this.clickItemHandler.bind(this);
  }

  clickItemHandler(e) {
    const { onClickItem } = this.props;
    // Make sure onClickItem exists
    if (onClickItem) {
      const { value } = e.target;
      onClickItem(value);
    }
  }

  render() {
    const {
      className, items, onClickItem, isOrdered,
    } = this.props;

    // Create the list's content from the items
    const listContent = items.map(item => (
      <li className={css(styles.listItem)} key={item.label} value={item.value}>
        {
          /**
           * If there is a click event, make it a button, otherwise make it regular text
           * (for accessibility, don't allow TAB-select when not clickable)
           */
          onClickItem
            ? (
              <button className={css(styles.listItemContent, styles.listItemLink)} type="button" value={item.value} onClick={this.clickItemHandler}>
                {item.label}
              </button>
            )
            : (
              <span className={css(styles.listItemContent)} value={item.label}>
                {item.label}
              </span>
            )
      }
      </li>
    ));

    return (
      isOrdered
        ? (<ul className={`${css(styles.list)} ${className}`}>{listContent}</ul>)
        : (<ol className={`${css(styles.list)} ${className}`}>{listContent}</ol>)
    );
  }
}

List.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  })).isRequired,
  isOrdered: PropTypes.bool,
  onClickItem: PropTypes.func,
};

List.defaultProps = {
  className: '',
  isOrdered: false,
  onClickItem: null,
};

export default List;
