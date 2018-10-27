/**
 * Type of Mining Devices
 */
enum DeviceType {
  cpu = 'cpu',
  gpu = 'gpu',
}

/**
 * Brands of Mining Brands
 */
enum DeviceBrand {
  nvidia = 'nvidia',
  amd = 'amd',
  intel = 'intel',
}

/**
 * Operating System/Platform of Mining Device
 */
enum DevicePlatform {
  windows = 'windows',
  macos = 'macos',
  linux = 'linux',
}

/**
 * Stores data about mining devices, ie. Nvidia GPU.
 */
class Device {
  public type: DeviceType;
  public brand: DeviceBrand;
  public platform: DevicePlatform;

  /**
   * Create a new Device object.
   * @param type Type of this device.
   * @param brand Brand of this device.
   * @param platform Platform of this device.
   */
  constructor(type: DeviceType, brand: DeviceBrand, platform: DevicePlatform) {
    this.type = type;
    this.brand = brand;
    this.platform = platform;
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

  public getFormattedPlatform(): string {
    switch (this.platform) {
      case DevicePlatform.windows:
        return 'Windows';
      case DevicePlatform.macos:
        return 'macOS';
      case DevicePlatform.linux:
        return 'Linux';
    }
  }

  public getName(): string {
    return `${this.getFormattedPlatform()} ${this.getFormattedBrand()} ${this.getFormattedType()}`;
  }

  public getId(): string {
    return `${this.platform}_${this.brand}_${this.type}`;
  }
}

export default Device;
export { DeviceType, DeviceBrand, DevicePlatform };
