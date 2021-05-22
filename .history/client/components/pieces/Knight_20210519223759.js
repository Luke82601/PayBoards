export default class Knight extends RootPiece {
  constructor(player) {
    super(player, (player === 1 ? 'images/whiteknight.png' : 'images/blackknight.png'));
  }

  isMovePossible(src, dest) {
    return (src - 17 === dest ||
      src - 10 === dest ||
      src + 6 === dest ||
      src + 15 === dest ||
      src - 15 === dest ||
      src - 6 === dest ||
      src + 10 === dest ||
      src + 17 === dest);
  }

  /**
   * always returns empty array because of jumping
   * @return {[]}
   */
  getSrcToDestPath() {
    return [];
  }
}