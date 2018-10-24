import { css, StyleSheet } from 'aphrodite';
import React from 'react';

import Colors from 'Models/Colors';

// Styles for the entire form and its content
const styles = StyleSheet.create({
  list: {
    borderTop: '1px solid hsl(0,0%,80%)',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  listItem: {
    borderBottom: '1px solid hsl(0,0%,80%)',
  },
  listItemContent: {
    display: 'block',
    padding: '0.5em',
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
    cursor: 'pointer',
    font: 'inherit',
    width: '100%',

    ':active': {
      backgroundColor: Colors.selectBlue,
    },
  },
  listItemSelected: {
    backgroundColor: Colors.hoverBlue,
  },
});

interface IListProps {
  className?: string;
  items: IListItem[];
  isOrdered?: boolean;
  onClickItem?: (id: string) => void;
  selectedItem?: number;
}

interface IListItem {
  label: string;
  value: string;
}

class List extends React.Component<IListProps> {
  public static defaultProps: Partial<IListProps> = {
    className: '',
    isOrdered: false,
    onClickItem: undefined,
    selectedItem: 0,
  };

  constructor(props: IListProps) {
    super(props);
  }

  public render() {
    const {
      className,
      items,
      onClickItem,
      isOrdered,
      selectedItem,
    } = this.props;

    // Create the list's content from the items
    const listContent = items.map((item, index) => (
      <li
        className={`${css(styles.listItem)} ${
          index === selectedItem ? css(styles.listItemSelected) : ''
        }`}
        key={item.label}
        value={item.value}
      >
        {// If there is a click event, make it a button, otherwise make it regular text
        // (for accessibility, don't allow TAB-select when not clickable)
        onClickItem ? (
          <button
            className={css(styles.listItemContent, styles.listItemLink)}
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

    return isOrdered ? (
      <ul className={`${css(styles.list)} ${className}`}>{listContent}</ul>
    ) : (
      <ol className={`${css(styles.list)} ${className}`}>{listContent}</ol>
    );
  }

  private clickItemHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onClickItem } = this.props;
    // Make sure onClickItem exists
    if (onClickItem && e.target instanceof HTMLButtonElement) {
      const { value } = e.target;
      // Force lose focus
      e.target.blur();
      // Call onClickItem event
      onClickItem(value);
    }
  };
}

export default List;
export { IListItem };
