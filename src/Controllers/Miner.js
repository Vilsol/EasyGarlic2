/**
 * The Miner Object is used to store data about a specific crypto miner.
 * e.g. Nvidia GPU for Windows.
 *
 * Note: This does not store any "currently-running" data, use Process for that.
 */
class Miner {
  /**
   * Create a Miner Object from a given JS Object
   * @param {Object} data The Object to create the Miner from
   */
  static fromObject(data) {
    if (!data) {
      throw new Error('Data is null!');
    }
    return new Miner(data.device, data.options, data.name, data.installPath);
  }

  // TODO: Might want to make a system so that miners have a their own custom "id" in case I want multiple miner types for the same device type (e.g multiple Windows AMD GPU miners)
  /**
   * Create a new Miner Object
   * @param {Device} device The device that this miner uses on this computer
   * @param {MinerOptions} options The MinerOptions to use for this miner.
   * @param {string} [name] (optional) The name used to identify this miner.
   * @param {string} [installPath] (optional) The location where this miner is installed.
   */
  constructor(device, options, name, installPath) {
    if (!device || !options) {
      throw new Error('Missing parameters for Miner object');
    }

    this.device = device;
    this.options = options;
    // TODO: Make better system for install path when user wants mutliple miners of same type
    this.installPath = installPath || this.getDefaultInstallPath();

    // Set the name to default until changed by user
    this.name = name || this.getDefaultName();
  }

  getDefaultInstallPath() {
    const { platform, type, brand } = this.device;
    return `/${platform}/${type}/${brand}`;
  }

  getDefaultName() {
    return this.device.getName();
  }

  getCommand() {
    return `${this.installPath} ${this.options.toCommandArgs()}`;
  }
}

export default Miner;
