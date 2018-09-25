/**
 * The Device Object is used to store data about a device to run miners on.
 * e.g. Nvidia GPU
 */
class Device {
  /**
   * Create a Device Object from a given JS Object
   * @param {Object} data The Object to create the Device from
   */
  static fromObject(data) {
    if (!data) {
      throw new Error('Data is null!');
    }
    return new Device(data.platform, data.type, data.brand, data.uuid);
  }

  /**
   * Create a new Miner Object
   * @param {string} platform The platform that this miner runs on.
   * @param {string} type The type of device that this miner uses e.g. GPU, CPU
   * @param {string} brand The brand of the device that this miner uses e.g. Nvidia, AMD, Intel
   * @param {string} uuid The device UUID that this miner uses on this computer
   */
  constructor(platform, type, brand, uuid) {
    if (!platform || !type || !brand || !uuid) {
      throw new Error('Missing parameters for Miner object');
    }

    this.platform = platform;
    this.type = type;
    this.brand = brand;
    this.uuid = uuid;
  }

  /**
   * Get the device's id e.g. windows_gpu_nvidia
   */
  getId() {
    return `${this.platform}_${this.type}_${this.brand}`;
  }

  getName() {
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

  getLabelValuePair() {
    return { label: this.getName(), value: this.getId() };
  }
}

export default Device;
