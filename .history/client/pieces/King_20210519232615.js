import RootPiece from './RootPiece.js';
import { isSameDiagonal, isSameRow } from '../helpers';

export default class King extends RootPiece {
  constructor(player) {
    super(player, (player === 1 ? 'images/whiteking.png' : 'images/blackking.png'));
  }

  isMovePossible(src, dest) {
    return (src - 9 === dest ||
      src - 8 === dest ||
      src - 7 === dest ||
      src + 1 === dest ||
      src + 9 === dest ||
      src + 8 === dest ||
      src + 7 === dest ||
      src - 1 === dest);
  }

  /**
   * always returns empty array because of one step
   * @return {[]}
   */
  getSrcToDestPath(src, dest) {
    return [];
  }
}