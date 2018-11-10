import { css, StyleSheet } from 'aphrodite';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { ValueType } from 'react-select/lib/types';

import Button from 'App/Components/Button';
import DropdownField from 'App/Components/Collections/DropdownField';
import IEnumerableItem from 'App/Components/Collections/IEnumerableItem';
import InputField from 'App/Components/InputField';
import Device from 'App/Models/Device';
import Miner from 'App/Models/Miner';
import DeviceManager from 'App/Services/DeviceManager';

// TODO: Rewrite CSS so that it uses an auto height, but it scrolls when it can't display everything
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: '1.5em',
  },
  scrollableContainer: {
    paddingLeft: '0.125em',
    paddingRight: '0.125em',
    width: '100%',

    'overflow-x': 'hidden',
    'overflow-y': 'auto',
  },

  subtitle: {
    margin: 0,
    paddingBottom: '0.25em',
    paddingTop: '0.5em',
  },
  title: {
    marginBottom: '0.25em',
    marginTop: 0,
  },

  button: {
    ':not(:first-child)': {
      marginLeft: '0.25em',
    },
    ':not(:last-child)': {
      marginRight: '0.25em',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
});

interface IMinerPanelProps {
  className?: string;
  miner: Miner;
  onSaveSettings: (miner: Miner) => void;
  onDeleteMiner: (id: string) => void;
}

interface IMinerPanelState {
  availableDevices: Device[];
  miner: Miner | undefined;
}

const initialState = {
  availableDevices: [],
  miner: undefined,
};

class MinerPanel extends React.Component<IMinerPanelProps, IMinerPanelState> {
  public static getDerivedStateFromProps(
    props: IMinerPanelProps,
    state: IMinerPanelState | null
  ): Partial<IMinerPanelState> | undefined {
    if (state === null || state.miner !== props.miner) {
      return { miner: props.miner };
    }
    return undefined;
  }

  public readonly state: IMinerPanelState = initialState;

  public async componentDidMount() {
    const devices = await DeviceManager.getAvailableDevices();
    if (devices !== undefined) {
      this.setState({ availableDevices: devices });
    }
  }

  public render() {
    const { className } = this.props;
    const { miner } = this.state;

    const formRendering = ({
      values,
      handleBlur,
      handleChange,
      setFieldValue,
      setFieldTouched,
    }: FormikProps<Miner>) => {
      // TODO: Refactor this, it's really ugly code oof
      // Adapt dropdown events to Formik because react-select uses its event system
      const handleDropdownChange = async (
        value: ValueType<IEnumerableItem>
      ) => {
        if (value !== null && !Array.isArray(value)) {
          // Set value to device corresponding to the given id
          setFieldValue(
            'device',
            value ? await DeviceManager.getDeviceWithId(value.value) : undefined
          );
        }
      };
      const handleDropdownBlur = (event: React.FocusEvent<HTMLElement>) => {
        setFieldTouched('device', document.activeElement === event.target);
      };
      // TODO: Might want to add this to the Device class
      // Convert a device to an enumerable
      function deviceToEnumerable(device: Device): IEnumerableItem {
        return {
          label: device.getName(),
          value: device.getId(),
        } as IEnumerableItem;
      }

      return (
        <Form>
          <InputField
            id="name"
            label="Name"
            type="text"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <DropdownField
            id="device"
            label="Device"
            onChange={handleDropdownChange}
            onBlur={handleDropdownBlur}
            options={this.state.availableDevices.map(deviceToEnumerable)}
            value={deviceToEnumerable(values.device)}
            isMulti={false}
          />
          <h3 className={css(styles.subtitle)}>Mining Options</h3>
          <InputField
            id="algorithm"
            label="Algorithm"
            type="text"
            value={values.options.algorithm}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <InputField
            id="intensity"
            label="Intensity"
            type="text"
            value={values.options.intensity}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <InputField
            id="parameters"
            label="Custom Parameters"
            type="text"
            value={values.options.parameters}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className={css(styles.buttonContainer)}>
            <Button
              className={css(styles.button)}
              id="saveButton"
              type="button"
              label="Save"
              variant="primary"
            />
            <Button
              className={css(styles.button)}
              id="dangerButton"
              type="button"
              label="Delete"
              variant="danger"
              onClick={this.handleDelete}
            />
          </div>
        </Form>
      );
    };

    if (miner === undefined) {
      return (
        <div className={`MinerPanel ${className} ${css(styles.container)}`}>
          <p>No Miner Found!</p>
        </div>
      );
    }

    return (
      <div className={`MinerPanel ${className} ${css(styles.container)}`}>
        <div className={css(styles.scrollableContainer)}>
          <h1 className={css(styles.title)}>{miner.name}</h1>
          <Formik
            enableReinitialize={true}
            initialValues={miner}
            onSubmit={this.handleSave}
            render={formRendering}
          />
        </div>
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

  /**
   * Called when the Delete button is clicked.
   * Send the uuid of the mienr to be deleted to the Mienrs component.
   */
  private handleDelete = () => {
    const { miner, onDeleteMiner } = this.props;
    onDeleteMiner(miner.uuid);
  };
}

export default MinerPanel;
