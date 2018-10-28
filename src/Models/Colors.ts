import color from 'color';

class Colors {
  /**
   * Garlicoin Yellow
   */
  public static primary: string = '#ffca42';

  /**
   * Garlicoin Yellow Lighter (0.25)
   */
  public static primaryLighter = color(Colors.primary)
    .lighten(0.25)
    .hex();

  /**
   * Garlicoin Yellow Darker (0.25)
   */
  public static primaryDarker = color(Colors.primary)
    .darken(0.25)
    .hex();

  /**
   * Recommended Text Black
   */
  public static textBlack = '#333';

  /**
   * Blue Hover Color
   */
  public static hoverBlue = '#DEEBFF';

  /**
   * Blue Select Color
   */
  public static selectBlue = '#B2D4FF';

  /**
   * Blue Selected Color
   */
  public static selectedBlue = '#2684FF';
}

export default Colors;
