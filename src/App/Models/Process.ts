import Miner from './Miner';

/**
 * Represents a Mining Process
 */
class Process {
  /**
   * Miner object that this Process is using.
   */
  public miner: Miner;

  /**
   * Address which the miner should use.
   */
  public address: string;

  /**
   * Pool at which the miner should mine on.
   */
  public pool: string;

  /**
   * Create a new Process object
   */
  constructor(miner: Miner) {
    this.miner = miner;
  }
}

export default Process;
