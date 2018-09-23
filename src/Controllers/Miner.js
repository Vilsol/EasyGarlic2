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
   * @param {MinerOptions} options The MinerOptions to use for this miner.
   * @param {string} [installPath] (optional) The path at which this miner is installed.
   * @param {string} [name] The name used to identify this miner.
   */
  constructor(platform, device, brand, options, installPath, name) {
    if (!platform || !device || !brand || !options) {
      throw new Error('Missing parameters for Miner object');
    }

    this.platform = platform;
    // TODO: Replace device to "type" and set device to the UUID of the actual device
    this.device = device;
    this.brand = brand;
    this.options = options;
    // TODO: Make a default install path? Or something to check for this, maybe set it as required
    this.installPath = installPath || '';

    // Set the name to default until changed by user
    this.name = name || this.getDefaultName();
  }

  getDefaultName() {
    // Make platform's first letter uppercase (windows -> Windows)
    const platformName = this.platform.replace(/^\w/, c => c.toUpperCase());

    // Set names based on brand (nvidia -> Nvidia, amd -> AMD, etc.)
    let brandName = this.brand;
    if (this.brand === 'nvidia') {
      brandName = 'Nvidia';
    } else if (this.brand === 'amd') {
      brandName = 'AMD';
    } else if (this.brand === 'intel') {
      brandName = 'Intel';
    }

    // device type is always capitalized (cpu -> CPU, GPU -> GPU)
    const deviceName = this.device.toUpperCase();

    return `${platformName} ${brandName} ${deviceName}`;
  }

  getCommand() {
    return `${this.installPath} ${this.options.toCommandArgs()}`;
  }
}

export default Miner;
