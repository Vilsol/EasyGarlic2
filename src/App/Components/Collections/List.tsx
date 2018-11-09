import { css, StyleSheet } from 'aphrodite';
import React from 'react';

import IEnumerableItem from 'App/Components/Collections/IEnumerableItem';
import Colors from 'Services/Colors';

// Styles for the entire form and its content
const styles = StyleSheet.create({
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  listItemContent: {
    display: 'block',
    padding: '0.5em',
    paddingLeft: '0.75em',
    textAlign: 'inherit',
    width: 'calc(100% - 0.5em)',

    ':hover': {
      backgroundColor: Colors.hoverBlue,
    },
  },
  listItemLink: {
    background: 'none',
    border: 'none',
    color: 'inherit',
    font: 'inherit',
    width: '100%',

    ':active': {
      backgroundColor: Colors.selectBlue,
    },
  },

  listItemSelected: {
    backgroundColor: Colors.selectedBlue,
    color: 'white',

    ':active': {
      backgroundColor: Colors.selectedBlue,
      color: 'white',
    },
    ':hover': {
      backgroundColor: Colors.selectedBlue,
      color: 'white',
    },
  },
});

interface IListProps {
  className?: string;
  items: IEnumerableItem[];
  onClickItem?: (id: string) => void;
  selectedItem?: number;
}

class List extends React.Component<IListProps> {
  public static defaultProps = {
    className: '',
    onClickItem: undefined,
    selectedItem: 0,
  };

  public render() {
    const { className, items, onClickItem, selectedItem } = this.props;

    // Create the list's content from the items
    const listContent = items.map((item, index) => (
      <li key={item.label} value={item.value}>
        {// If there is a click event, make it a button, otherwise make it regular text
        // (for accessibility, don't allow TAB-select when not clickable)
        onClickItem ? (
          <button
            className={
              // If the item is selected, add listItemSelected to the list
              index === selectedItem
                ? css(
                    styles.listItemContent,
                    styles.listItemLink,
                    styles.listItemSelected
                  )
                : css(styles.listItemContent, styles.listItemLink)
            }
            type="button"
            value={item.value}
            onClick={this.clickItemHandler}
          >
            {item.label}
          </button>
        ) : (
          <span className={css(styles.listItemContent)}>{item.label}</span>
        )}
      </li>
    ));

    return (
      <ul className={`${css(styles.list)} ${className}`}>{listContent}</ul>
    );
  }

  private clickItemHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onClickItem } = this.props;
    // Make sure onClickItem exists
    if (onClickItem && e.target instanceof HTMLButtonElement) {
      const { value } = e.target;
      // Force lose focus
      e.target.blur();
      // Call onClickItem event
      // tslint:disable-next-line:await-promise
      await onClickItem(value);
    }
  };
}

export default List;
