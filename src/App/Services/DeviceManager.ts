import osType from 'os';
import sysInfo from 'systeminformation';

import Device, {
  DeviceBrand,
  DevicePlatform,
  DeviceType,
} from 'App/Models/Device';
import Debug from 'Services/Debug';

/* Require with Types + Electron */
const SystemInformation = (window as any).require(
  'systeminformation'
) as typeof sysInfo;
const os = (window as any).require('os') as typeof osType;

let deviceCache: Device[] | undefined;

/**
 * Find a device with the given id.
 * @param id The id of the device to find
 */
async function getDeviceWithId(id: string): Promise<Device | undefined> {
  const device = await getAvailableDevices();
  if (device === undefined) {
    return undefined;
  }
  return device.find(x => x.getId() === id);
}

/**
 * Get the current platform
 */
function getPlatform(): string | undefined {
  switch (os.platform()) {
    case 'win32':
      return 'windows';
    case 'darwin':
      return 'macos';
    case 'linux':
      return 'linux';
    default:
      return undefined;
  }
}

/**
 * Get all available devices
 */
async function getAvailableDevices(): Promise<Device[] | undefined> {
  if (deviceCache) {
    return deviceCache;
  }

  // Get Device Platform
  const devicePlatform = getPlatform();
  if (devicePlatform === undefined) {
    return undefined;
  }

  // Get Device Graphics
  try {
    const graphics = await SystemInformation.graphics();
    const cpu = await SystemInformation.cpu();

    const cpuDevice = new Device(
      DeviceType.cpu,
      vendorToBrand(cpu.vendor.trim().toLowerCase()),
      DevicePlatform[devicePlatform],
      cpu.brand
    );

    // Loop through every device and map graphics -> device
    const devices = graphics.controllers
      .map(item => {
        // Create a new Device object and return it
        return new Device(
          DeviceType.gpu,
          vendorToBrand(item.vendor.trim().toLowerCase()),
          DevicePlatform[devicePlatform],
          item.model
        );
      })
      .filter(device => {
        if (device.brand === cpuDevice.brand) {
          if (device.model === cpuDevice.model) {
            return false;
          } else if (isIntegratedGPU(device)) {
            return false;
          }
        }
        return true;
      });

    devices.push(cpuDevice);

    deviceCache = devices;

    // Return list of devices
    return devices;
  } catch (error) {
    Debug.LogError(error);
    return undefined;
  }
}

/**
 * Convert vendor to device brand
 */
function vendorToBrand(vendor: string): DeviceBrand {
  let brand: DeviceBrand = DeviceBrand[vendor];

  if (!brand) {
    if (vendor.indexOf('intel') >= 0) {
      brand = DeviceBrand.intel;
    } else if (vendor.indexOf('advanced micro devices') >= 0) {
      brand = DeviceBrand.amd;
    }
  }

  return brand;
}

/**
 * Check if device is an integrated GPU
 */
function isIntegratedGPU(device: Device): boolean {
  if (device.brand === DeviceBrand.intel) {
    if (device.model.toLowerCase().indexOf('hd graphics')) {
      return true;
    }
  }

  return false;
}

/**
 * Get the default device for this platform
 */
async function getDefaultDevice(): Promise<Device | undefined> {
  const devices = await getAvailableDevices();
  if (devices === undefined) {
    return undefined;
  } else {
    return devices[0];
  }
}

const DeviceManager = {
  getAvailableDevices,
  getDefaultDevice,
  getDeviceWithId,
};

export default DeviceManager;
