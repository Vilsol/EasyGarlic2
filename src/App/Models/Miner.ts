import Device from 'App/Models/Device';
import MinerOptions from './MinerOptions';

/**
 * Stores non-runtime data of a miner.
 */
class Miner {
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
   * @param installPath Path where this miner is installed.
   */
  constructor(name: string, device: Device, installPath: string) {
    this.name = name;
    this.device = device;
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
