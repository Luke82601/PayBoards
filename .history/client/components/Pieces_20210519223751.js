/* eslint-disable one-var */
// import React from 'react';
import RootPiece from './RootPiece.js';












class Rook extends RootPiece {
  constructor(player) {
    super(player, (player === 1 ? 'images/whiterook.png' : 'images/blackrook.png'));
  }

  isMovePossible(src, dest) {
    let mod = src % 8;
    let diff = 8 - mod;
    return (Math.abs(src - dest) % 8 === 0 || (dest >= (src - mod) && dest < (src + diff)));
  }

  /**
   * get path between src and dest (src and dest exclusive)
   * @param  {num} src
   * @param  {num} dest
   * @return {[array]}
   */
  getSrcToDestPath(src, dest) {
    let path = [], pathStart, pathEnd, incrementBy;
    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    } else {
      pathStart = src;
      pathEnd = dest;
    }
    if (Math.abs(src - dest) % 8 === 0) {
      incrementBy = 8;
      pathStart += 8;
    } else {
      incrementBy = 1;
      pathStart += 1;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  }
}


class Pawn extends RootPiece {
  constructor(player) {
    super(player, (player === 1 ? 'images/whitepawn.png' : 'images/blackpawn.png'));
    this.initialPositions = {
      1: [48, 49, 50, 51, 52, 53, 54, 55],
      2: [8, 9, 10, 11, 12, 13, 14, 15]
    };
  }

  isMovePossible(src, dest, isDestEnemyOccupied) {

    if (this.player === 1) {
      if ((dest === src - 8 && !isDestEnemyOccupied) || (dest === src - 16 && this.initialPositions[1].indexOf(src) !== -1)) {
        return true;
      } else if (isDestEnemyOccupied && (dest === src - 9 || dest === src - 7)) {
        return true;
      }
    } else if (this.player === 2) {
      if ((dest === src + 8 && !isDestEnemyOccupied) || (dest === src + 16 && this.initialPositions[2].indexOf(src) !== -1)) {
        return true;
      } else if (isDestEnemyOccupied && (dest === src + 9 || dest === src + 7)) {
        return true;
      }
    }
    return false;
  }

  /**
   * returns array of one if pawn moves two steps, else returns empty array
   * @param  {[type]} src  [description]
   * @param  {[type]} dest [description]
   * @return {[type]}      [description]
   */
  getSrcToDestPath(src, dest) {
    if (dest === src - 16) {
      return [src - 8];
    } else if (dest === src + 16) {
      return [src + 8];
    }
    return [];
  }
}

export {
  King,
  Rook,
  Knight,
  Bishop,
  Queen,
  Pawn
}