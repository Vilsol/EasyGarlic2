import color from 'color';

class Colors {
  public static primary: string = '#ffca42';
  public static primaryLighter = color(Colors.primary)
    .lighten(0.25)
    .hex();
  public static primaryDarker = color(Colors.primary)
    .darken(0.25)
    .hex();
  public static textBlack = '#333';
}

export default Colors;
