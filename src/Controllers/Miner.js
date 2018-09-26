/**
 * The Miner Object is used to store data about a specific crypto miner.
 * e.g. Nvidia GPU for Windows.
 *
 * Note: This does not store any "currently-running" data, use Process for that.
 */
class Miner {
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

  getId() {
    /**
     * TODO: Might want to add another variable because there might be multiple miner types
     * for the same device type (e.g multiple Windows AMD GPU miners)
     */
    return this.device.getId();
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
