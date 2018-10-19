/**
 * Type of Mining Devices
 */
enum DeviceType {
  cpu,
  gpu,
}

/**
 * Brands of Mining Brands
 */
enum DeviceBrand {
  nvidia,
  amd,
  intel,
}

/**
 * Stores data about mining devices, ie. Nvidia GPU.
 */
class Device {
  public type: DeviceType;
  public brand: DeviceBrand;

  /**
   * Create a new Device object.
   * @param type Type of this device.
   * @param brand Brand of this device.
   */
  constructor(type: DeviceType, brand: DeviceBrand) {
    this.type = type;
    this.brand = brand;
  }

  /**
   * Get a nicely formatted version of the device type.
   */
  public getFormattedType(): string {
    switch (this.type) {
      case DeviceType.cpu:
        return 'CPU';
      case DeviceType.gpu:
        return 'GPU';
    }
  }

  /**
   * Get a nicely formatted version of the device brand.
   */
  public getFormattedBrand(): string {
    switch (this.brand) {
      case DeviceBrand.nvidia:
        return 'Nvidia';
      case DeviceBrand.amd:
        return 'AMD';
      case DeviceBrand.intel:
        return 'Intel';
    }
  }
}

export default Device;
export { DeviceType, DeviceBrand };
