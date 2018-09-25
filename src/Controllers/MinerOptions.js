/**
 * The MinerOptions Object is used to store the command options for that miner
 * e.g. intensity, extra parameters...
 */
class MinerOptions {
  /**
   * Create a MinerOptions Object from a given JS Object
   * @param {Object} data The Object to create the MinerOptions from
   */
  static fromObject(data) {
    if (!data) {
      throw new Error('Data is null!');
    }
    return new MinerOptions(data.algorithm, data.intensity, data.parameters);
  }

  /**
   * Create a new MinerOptions Object
   * @param {string} algorithm The algorithm to use for mining.
   * @param {string} [intensity] (optional) The intensity at which to mine.
   * @param {string} [parameters] (optional) The extra parameters to use when mining.
   */
  constructor(algorithm, intensity, parameters) {
    if (!algorithm) {
      throw new Error('Missing parameters for Miner object');
    }
    this.algorithm = algorithm;
    this.intensity = intensity || '';
    this.parameters = parameters || '';
  }

  /**
   * Outputs the MinerOption object to a string of command arguments.
   * @param {Miner} miner The miner that these options should use
   */
  toCommandArgs(miner) {
    // If mining on a GPU
    if (miner.device === 'gpu') {
      let algorithmOptions = '';
      let intensityOptions = '';

      // Use Nvidia Options
      if (miner.brand === 'nvidia') {
        algorithmOptions = `--algo=${this.algorithm}`;
        intensityOptions = `--intensity=${this.intensity}`;

      // Use AMD Options
      } else if (miner.brand === 'amd') {
        algorithmOptions = `--algorithm ${this.algorithm}`;
        intensityOptions = `--intensity "${this.intensity}"`;
      } else {
        throw new Error('Unknown GPU type, it must be "nvidia" or "amd"');
      }

      // Return output of all the options
      return `${algorithmOptions} ${intensityOptions} ${this.parameters}`;
    }
    // If mining on a cpu
    if (miner.device === 'cpu') {
      // TODO: Add CPU support
      throw new Error('CPU Mining is currently not supported');
    }
    // If it's neither a cpu nor a gpu, then error.
    throw new Error('Unknown miner type, it must be "gpu" or "cpu"');
  }
}

export default MinerOptions;
