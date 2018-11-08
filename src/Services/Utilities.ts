export default class Utilities {
  /**
   * Get a "VALUE (#)" name where # is based on count of "VALUE"s found.
   *
   * This works like Windows' "New Folder" menu:
   * If there's already one, it renames it to "New Folder (1),"
   * and continues until the name isn't taken.
   * @param values The array of all available values.
   * @param valueToSearch The values to search for duplicates.
   */
  public static getNextValue(values: string[], valueToSearch: string): string {
    const regex = new RegExp(`^(?:${valueToSearch}( \([\d.]+\))?)$`);
    const valuesFound = values.filter(n => regex.test(n));
    if (valuesFound.length > 0) {
      return `${valueToSearch} (${valuesFound.length})`;
    } else {
      return valueToSearch;
    }
  }
}
