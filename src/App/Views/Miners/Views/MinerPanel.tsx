import { css, StyleSheet } from 'aphrodite';
import React from 'react';

import Button from 'App/Components/Button';
import Miner from 'App/Models/Miner';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    paddingLeft: '1em',
    paddingRight: '1em',
    paddingTop: 0,
  },
  title: {
    marginTop: 0,
  },
});

interface IMinerPanelProps {
  className?: string;
  miner: Miner;
  onSaveSettings: (miner: Miner) => void;
}

class MinerPanel extends React.Component<IMinerPanelProps> {
  public render() {
    const { className, miner } = this.props;
    return (
      <div className={`MinerPanel ${className} ${css(styles.container)}`}>
        <h2 className={css(styles.title)}>{miner.name}</h2>
        <form>
          <label>
            Name:
            <input
              id="nameInput"
              type="text"
              name="name"
              value={miner.name}
              onChange={this.handleChangeName}
            />
          </label>
          <Button
            id="saveButton"
            type="submit"
            label="Save"
            variant="primary"
            onClick={this.handleSave}
          />
        </form>
      </div>
    );
  }

  /**
   * Called when the Name Input's value changes.
   * Update the value in the state.
   * @param e The event object for the Input Change
   */
  private handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ nameValue: event.target.value });
  };

  /**
   * Called when the Save button is clicked.
   * Send the new saved miner data to the Miners component.
   * @param e The event object for the Button Click
   */
  private handleSave = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    // TODO: Call onSaveSettings & find a way to
  };
}

export default MinerPanel;
