import Device, {
  DeviceBrand,
  DevicePlatform,
  DeviceType,
} from 'App/Models/Device';

import osType from 'os';
import Debug from 'Services/Debug';
import sysInfo from 'systeminformation';

/* Require with Types + Electron */
const SystemInformation = (window as any).require(
  'systeminformation'
) as typeof sysInfo;
const os = (window as any).require('os') as typeof osType;

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
  // Get Device Platform
  const devicePlatform = getPlatform();
  if (devicePlatform === undefined) {
    return undefined;
  }

  // Get Device Graphics
  try {
    const graphics = await SystemInformation.graphics();
    // If there are no graphics cards, use cpu
    if (graphics.controllers.length === 0) {
      // TODO: CPU
    }

    // Loop through every device and map graphics -> device
    const devices = graphics.controllers.map(item => {
      // Get Device Brand
      const deviceBrand = item.vendor.trim().toLowerCase();

      // Create a new Device object and return it
      return new Device(
        DeviceType.gpu,
        DeviceBrand[deviceBrand],
        DevicePlatform[devicePlatform]
      );
    });
    // Return list of devices
    return devices;
  } catch (error) {
    Debug.LogError(error);
    return undefined;
  }
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
