export default class Utilities {
  /**
   * Returns current date ready for DB
   */
  public static DateNow(){
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
}