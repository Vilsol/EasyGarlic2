/**
 * The Miner Object is used to store data about a specific crypto miner.
 * e.g. Nvidia GPU for Windows.
 *
 * Note: This does not store any "currently-running" data, use Process for that.
 */
class Miner {
  /**
   * Create a new Miner Object
   * @param {string} platform The platform that this miner runs on.
   * @param {string} device The device that this miner uses e.g. GPU, CPU
   * @param {string} brand The brand of the miner e.g. Nvidia, AMD, Intel
   */
  constructor(platform, device, brand) {
    if (!platform || !device || !brand) {
      throw new Error('Missing parameters for Miner object');
    }

    this.platform = platform;
    this.device = device;
    this.brand = brand;
  }

  name() {
    return `${this.platform} ${this.brand} ${this.device}`;
  }
}

export default Miner;
