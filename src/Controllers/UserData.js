import Miner from 'Controllers/Miner';

const ElectronStore = window.require('electron-store');

const store = new ElectronStore();

/**
 * Get an array of Miners that are in the User Data Store.
 * @returns {Miner[]} The list of all miners
 */
function getMiners() {
  const miners = store.get('miners', []);
  return miners.map(miner => new Miner(miner.platform, miner.device, miner.brand));
}

/**
 * Add a Miner to the User Data Store.
 * @param {Miner} miner The miner to add
 */
function addMiner(miner) {
  // Get the previous one
  const miners = store.get('miners', []);
  // Push new item
  miners.push(miner);
  // Set/Update store
  store.set('miners', miners);
}

export default {
  getMiners,
  addMiner,
};
