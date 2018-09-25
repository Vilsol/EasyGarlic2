import Device from 'Controllers/Device';


/**
 * Get all of the locally available devices to mine one.
 */
function getAllAvailableDevices() {
  // TODO: Detect devices
  return [
    new Device('windows', 'gpu', 'nvidia', '0'),
    new Device('windows', 'gpu', 'amd', '1'),
  ];
}

export default {
  getAllAvailableDevices,
};
