import Device from 'App/Models/Device';
import MinerOptions from './MinerOptions';

import uuidGenerator from 'uuid/v4';

/**
 * Stores non-runtime data of a miner.
 */
class Miner {
  public static async Default(): Promise<Miner> {
    const device: Device = await Device.Default();
    return new Miner('Miner', device, MinerOptions.Default(), '');
  }

  public static ObjectToMiner(miner: any): Miner {
    return new Miner(
      miner.name,
      new Device(
        miner.device.type,
        miner.device.brand,
        miner.device.platform,
        miner.device.model
      ),
      new MinerOptions(
        miner.options.algorithm,
        miner.options.intensity,
        miner.options.parameters
      ),
      miner.installPath,
      miner.uuid ? miner.uuid : undefined
    );
  }
  /**
   * Name of this miner.
   */
  public name: string;

  /**
   * Device that this miner supports.
   */
  public device: Device;

  /**
   * Miner Options that this miner should use when running.
   */
  public options: MinerOptions;

  /**
   * Location where this miner is installed.
   */
  public installPath: string;

  /**
   * UUID of the miner to identify rather than using the name
   */
  public uuid: string;

  /**
   * Create a new Miner object.
   * @param name Name of this miner
   * @param device Device that this miner should use
   * @param options Runtime Options that this miner should use
   * @param installPath Path where this miner is installed.
   */
  constructor(
    name: string,
    device: Device,
    options: MinerOptions,
    installPath: string,
    uuid?: string
  ) {
    this.name = name;
    this.device = device;
    this.options = options;
    this.installPath = installPath;
    // Set UUID or generate a new one
    this.uuid = uuid !== undefined ? uuid : uuidGenerator();
  }

  public getCommand(): string {
    return '';
  }
}

export default Miner;
