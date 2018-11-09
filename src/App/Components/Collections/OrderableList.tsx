import { css, StyleSheet } from 'aphrodite';
import React, { MouseEvent } from 'react';
import {
  arrayMove,
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';

import Colors from 'Services/Colors';

import IEnumerableItem from './IEnumerableItem';

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

// TODO: When adding Icons, add a "GRAB HERE" icon instead of this
const DragHandle = SortableHandle(() => <span>:::</span>);

interface ISortableItemProps {
  itemIndex: number;
  item: IEnumerableItem;
  onClickItem?: (event: MouseEvent<HTMLButtonElement>) => void;
  selectedItem?: number;
}

const SortableItem = SortableElement(
  ({ itemIndex, item, onClickItem, selectedItem }: ISortableItemProps) => {
    return (
      <li>
        {// If there is a click event, make it a button, otherwise make it regular text
        // (for accessibility, don't allow TAB-select when not clickable)
        onClickItem ? (
          <button
            className={
              // If the item is selected, add listItemSelected to the list
              itemIndex === selectedItem
                ? css(
                    styles.listItemContent,
                    styles.listItemLink,
                    styles.listItemSelected
                  )
                : css(styles.listItemContent, styles.listItemLink)
            }
            type="button"
            value={item.value}
            onClick={onClickItem}
          >
            <DragHandle />
            {` ${item.label}`}
          </button>
        ) : (
          <span className={css(styles.listItemContent)}>
            <DragHandle />
            {` ${item.label}`}
          </span>
        )}
      </li>
    );
  }
);

interface ISortableContainerProps {
  items: IEnumerableItem[];
  onClickItem?: (event: MouseEvent<HTMLButtonElement>) => void;
  selectedItem?: number;
}

const SortableList = SortableContainer(
  ({ items, onClickItem, selectedItem }: ISortableContainerProps) => (
    <ul className={css(styles.list)}>
      {items.map((item, index) => (
        <SortableItem
          key={item.label}
          index={index}
          item={item}
          onClickItem={onClickItem}
          selectedItem={selectedItem}
          itemIndex={index}
        />
      ))}
    </ul>
  )
);

interface IOrderableListProps {
  className?: string;
  items: IEnumerableItem[];
  onChangeItemsOrder: (items: IEnumerableItem[]) => void;
  onClickItem?: (id: string) => void;
  selectedItem?: number;
}

class OrderableList extends React.Component<IOrderableListProps> {
  public static defaultProps = {
    className: '',
    onClickItem: undefined,
    selectedItem: undefined,
  };

  public render() {
    const { className, items, selectedItem } = this.props;

    return (
      <div className={className}>
        <SortableList
          items={items}
          onSortEnd={this.handleSortEnd}
          useDragHandle={true}
          helperClass={css(styles.list)}
          onClickItem={this.handleClickItem}
          selectedItem={selectedItem}
        />
      </div>
    );
  }

  /**
   * Called when an item has been sorted/changed.
   * Sorts the array and calls the props event.
   */
  private handleSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const { items, onChangeItemsOrder } = this.props;
    onChangeItemsOrder(arrayMove(items, oldIndex, newIndex));
  };

  private handleClickItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

export default OrderableList;
