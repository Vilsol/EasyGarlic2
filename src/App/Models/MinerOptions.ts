import Device, { DeviceBrand, DeviceType } from './Device';

/**
 * Stores the command options to run the miner.
 */
class MinerOptions {
  /**
   * The algorithm that this miner should use.
   */
  public algorithm: string;
  /**
   * The intensity at which this miner should run.
   */
  public intensity: string;
  /**
   * The extra parameters to use when running this miner.
   */
  public parameters: string;

  /**
   * Create a new MinerOptions object.
   * @param algorithm The algorithm that this miner should use.
   * @param intensity The intensity at which this miner should run.
   * @param parameters The extra parameters to use when running this miner.
   */
  constructor(algorithm: string, intensity: string, parameters: string) {
    this.algorithm = algorithm;
    this.intensity = intensity;
    this.parameters = parameters;
  }

  /**
   * Convert this MinerOptions object to a command arguments string so it works with the given device.
   * @param device The device that these MinerOptions should check for.
   */
  public toCommandArg(device: Device): string | Error {
    // If mining on a GPU
    if (device.type === DeviceType.gpu) {
      let algorithmOptions = '';
      let intensityOptions = '';

      // Use Nvidia Options
      if (device.brand === DeviceBrand.nvidia) {
        algorithmOptions = `--algo=${this.algorithm}`;
        intensityOptions = `--intensity=${this.intensity}`;

        // Use AMD Options
      } else if (device.brand === DeviceBrand.amd) {
        algorithmOptions = `--algorithm ${this.algorithm}`;
        intensityOptions = `--intensity "${this.intensity}"`;
      } else {
        throw new Error('Unknown GPU type, it must be "nvidia" or "amd"');
      }

      // Return output of all the options
      return `${algorithmOptions} ${intensityOptions} ${this.parameters}`;
    }
    // If mining on a cpu
    if (device.type === DeviceType.cpu) {
      // TODO: Add CPU support
      throw new Error('CPU Mining is currently not supported');
    }
    // If it's neither a cpu nor a gpu, then error
    throw new Error('Unknown miner type, it must be "gpu" or "cpu"');
  }
}

export default MinerOptions;
