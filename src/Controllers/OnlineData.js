import Miner from 'Controllers/Miner';
import Device from 'Controllers/Device';
import MinerOptions from 'Controllers/MinerOptions';

import data from '../../data.json';

// TODO: Make this entire file fetch data online instead

/**
 * Get all the miners available online
 * @returns {Array<Object>}
 */
function getAllMiners() {
  return Object.values(data.miners);
}

/**
 * Get a miner with the given id
 * @param {string} id The id to search for e.g. windows_gpu_nvidia
 */
function getMinersWithId(id) {
  return data.miners[id];
}

/**
 * Download and install a miner with the given miner id and device uuid.
 * @param {string} id The id of the miner to install e.g windows_gpu_nvidia
 * @param {string} uuid The uuid of the device that this miner should use.
 */
function installMinerWithId(id, uuid) {
  const minerData = data.miners[id];
  const device = new Device(minerData.platform, minerData.type, minerData.brand, uuid);
  const options = new MinerOptions('allium');
  // TODO: Install miner
  return new Miner(device, options);
}

export default {
  getAllMiners,
  getMinersWithId,
  installMinerWithId,
};
