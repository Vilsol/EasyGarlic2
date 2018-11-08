import Miner from 'App/Models/Miner';
import ElectronStore from 'electron-store';

// Weird TypeScript require because window.require doesn't exist
const es = (window as any).require('electron-store') as typeof ElectronStore;

// Need to require from electron in very strange way because electron :(
const store: ElectronStore = new es({ name: 'data' });

// TODO: Perhaps find a way to cache the store? idk fam

/**
 * Get an array of Miners that are in the User Data Store.
 */
function getMiners(): Miner[] {
  const miners: Miner[] = store.get('miners', []);
  return miners.map(miner => Miner.ObjectToMiner(miner));
}

/**
 * Replaces the current miners array with an new one in the User Data Store.
 * @param miners The list of all miners to set
 */
function setMiners(miners: Miner[]) {
  store.set('miners', miners);
}

/**
 * Add a Miner to the User Data Store.
 * @param miner The miner to add
 */
function addMiner(miner: Miner) {
  // Get the previous one
  const miners: Miner[] = store.get('miners', []);
  // Push new item
  miners.push(miner);
  // Set/Update store
  store.set('miners', miners);
}

export default {
  addMiner,
  getMiners,
  setMiners,
};
