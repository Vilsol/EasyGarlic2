/**
 * The Process Object represents a currently running miner and its data.
 */
class Process {
  /**
   * Creates a Process Object.
   * @param {string} address The address that the miner should use.
   * @param {string} pool The pool that the miner should use.
   * @param {Miner} miner The miner that this process is using.
   */
  constructor(address, pool, miner) {
    this.miner = miner;
    this.address = address;
    this.pool = pool;
  }
}

export default Process;
