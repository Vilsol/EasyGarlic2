import Device, {
  DeviceBrand,
  DevicePlatform,
  DeviceType,
} from 'App/Models/Device';

/**
 * Get every possible Device combination
 */
function getAllDevices(): Device[] {
  const devices: Device[] = [];
  // Loop through every platform, brand, and type to create devices for them
  Object.keys(DevicePlatform).forEach(platform => {
    Object.keys(DeviceBrand).forEach(brand => {
      Object.keys(DeviceType).forEach(type => {
        // Nvidia doesn't make CPUs
        if (
          DeviceBrand[brand] !== DeviceBrand.nvidia ||
          DeviceType[type] !== DeviceType.cpu
        ) {
          devices.push(
            new Device(
              DeviceType[type],
              DeviceBrand[brand],
              DevicePlatform[platform]
            )
          );
        }
      });
    });
  });
  return devices;
}

/**
 * Find a device with the given id.
 * @param id The id of the device to find
 */
function getDeviceWithId(id: string): Device | undefined {
  return getAllDevices().find(x => x.getId() === id);
}

export { getAllDevices, getDeviceWithId };
