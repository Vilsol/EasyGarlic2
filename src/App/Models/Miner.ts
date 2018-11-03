import Device from 'App/Models/Device';
import MinerOptions from './MinerOptions';

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
      new Device(miner.device.type, miner.device.brand, miner.device.platform, miner.device.model),
      new MinerOptions(
        miner.options.algorithm,
        miner.options.intensity,
        miner.options.parameters
      ),
      miner.installPath
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
    installPath: string
  ) {
    this.name = name;
    this.device = device;
    this.options = options;
    this.installPath = installPath;
  }

  /**
   * Get an id to represent the given miner.
   */
  public getId(): string {
    return this.name
      .trim()
      .toLowerCase()
      .replace(' ', '_');
  }

  public getCommand(): string {
    return '';
  }
}

export default Miner;
