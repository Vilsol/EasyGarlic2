import color from 'color';

export default class Colors {
  /**
   * Garlicoin Yellow
   */
  public static primary = '#ffca42';

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
   * Danger Red
   */
  public static danger = '#ff3b30';

  /**
   * Danger Red Lighter (0.25)
   */
  public static dangerLighter = color(Colors.danger)
    .lighten(0.25)
    .hex();

  /**
   * Danger Red Darker (0.25)
   */
  public static dangerDarker = color(Colors.danger)
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

  /**
   * Grey For Backgrounds
   */
  public static backgroundGrey = '#FAFAFA';

  /**
   * Grey For Inputs
   */
  public static inputGrey = '#FAFAFA'; // '#F5F5F5'
}
