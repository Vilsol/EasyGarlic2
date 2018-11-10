export default class Debug {
  public static LogError(
    message: Error | string,
    ...optionalMessages: Error[] | string[]
  ) {
    // TODO: Find better way to handle errors
    // tslint:disable-next-line
    console.error(message, optionalMessages);
  }
}
