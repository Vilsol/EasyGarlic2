import { css, StyleSheet } from 'aphrodite';
import { Field, Form, Formik } from 'formik';
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

interface IMinerPanelState {
  miner: Miner | undefined;
}

const initialState = {
  miner: undefined,
};

class MinerPanel extends React.Component<IMinerPanelProps, IMinerPanelState> {
  public static getDerivedStateFromProps(
    props: IMinerPanelProps,
    state: IMinerPanelState | null
  ): Partial<IMinerPanelState> | null {
    if (state === null || state.miner !== props.miner) {
      return { miner: props.miner };
    }
    return null;
  }

  public readonly state: IMinerPanelState = initialState;

  public render() {
    const { className } = this.props;
    const { miner } = this.state;

    const formRendering = () => (
      <Form>
        <label htmlFor="name">Name</label>
        <Field type="name" name="name" />
        <Button id="saveButton" type="button" label="Save" variant="primary" />
      </Form>
    );

    if (miner === undefined) {
      return (
        <div className={`MinerPanel ${className} ${css(styles.container)}`}>
          <p>No Miner Found!</p>
        </div>
      );
    }

    return (
      <div className={`MinerPanel ${className} ${css(styles.container)}`}>
        <h2 className={css(styles.title)}>{miner.name}</h2>
        <Formik
          enableReinitialize={true}
          initialValues={miner}
          onSubmit={this.handleSave}
          render={formRendering}
        />
      </div>
    );
  }

  /**
   * Called when the Save button is clicked.
   * Send the new saved miner data to the Miners component.
   * @param values The values of the IMinerSettings
   */
  private handleSave = (values: Miner) => {
    const { onSaveSettings } = this.props;
    onSaveSettings(values);
  };
}

export default MinerPanel;
