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
   * @param {string} type The type of device that this miner uses e.g. GPU, CPU
   * @param {string} brand The brand of the device that this miner uses e.g. Nvidia, AMD, Intel
   * @param {string} device The device UUID that this miner uses on this computer
   * @param {MinerOptions} options The MinerOptions to use for this miner.
   * @param {string} [name] (optional) The name used to identify this miner.
   * @param {string} [installPath] (optional) The location where this miner is installed.
   */
  constructor(platform, type, brand, device, options, name, installPath) {
    if (!platform || !type || !brand || !device || !options) {
      throw new Error('Missing parameters for Miner object');
    }

    this.platform = platform;
    this.type = type;
    this.brand = brand;
    this.device = device;
    this.options = options;
    // TODO: Make better system for install path when user wants mutliple miners of same type
    this.installPath = installPath || this.getDefaultInstallPath();

    // Set the name to default until changed by user
    this.name = name || this.getDefaultName();
  }

  getDefaultInstallPath() {
    return `/${this.platform}/${this.type}/${this.brand}`;
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
    const typeName = this.type.toUpperCase();

    return `${platformName} ${brandName} ${typeName}`;
  }

  getCommand() {
    return `${this.installPath} ${this.options.toCommandArgs()}`;
  }
}

export default Miner;
