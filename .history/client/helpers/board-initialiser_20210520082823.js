import Bishop from '../pieces/Bishop.js';
import King from '../pieces/King.js';
import Knight from '../pieces/Knight.js';
import Pawn from '../pieces/Pawn.js';
import Queen from '../pieces/Queen.js';
import Rook from '../pieces/Rook.js';

export default function initialiseChessBoard() {
  const whichPiece = (square, index, i) => {
    if (square[0] === null) {
      return null;
    }
    if (square[0] === 'br1') {
      return new Rook("images/blackrook.png");
    }

    if (square[0] === 'bkn1' || square[0] === 'bkn2') {
      return (
        <img name={`${index}${i}`} className="blackpiece" alt="" src="images/blackknight.png" />
      );
    }
    if (square[0] === 'bb1' || square[0] === 'bb2') {
      return (
        <img name={`${index}${i}`} className="blackpiece" alt="" src="images/blackbishop.png" />
      );
    }
    if (square[0] === 'bk') {
      return (
        <img name={`${index}${i}`} className="blackpiece" alt="" src="images/blackking.png" />
      );
    }
    if (square[0] === 'bq') {
      return (
        <img name={`${index}${i}`} className="blackpiece" alt="" src="images/blackqueen.png" />
      );
    }
    if (square[0] === 'bp') {
      return (
        <img name={`${index}${i}`} className="blackpiece" alt="" src="images/blackpawn.png" />
      );
    }
    if (square[0] === 'wr1' || square[0] === 'wr2') {
      return (
        <img name={`${index}${i}`} className="whitepiece" alt="" src="images/whiterook.png" />
      );
    }
    if (square[0] === 'wkn1' || square[0] === 'wkn2') {
      return (
        <img name={`${index}${i}`} className="whitepiece" alt="" src="images/whiteknight.png" />
      );
    }
    if (square[0] === 'wb1' || square[0] === 'wb2') {
      return (
        <img name={`${index}${i}`} className="whitepiece" alt="" src="images/whitebishop.png" />
      );
    }
    if (square[0] === 'wk') {
      return (
        <img name={`${index}${i}`} className="whitepiece" alt="" src="images/whiteking.png" />
      );
    }
    if (square[0] === 'wq') {
      return (
        <img name={`${index}${i}`} className="whitepiece" alt="" src="images/whitequeen.png" />
      );
    }
    if (square[0] === 'wp') {
      return (
        <img name={`${index}${i}`} className="whitepiece" alt="" src="images/whitepawn.png" />
      );
    }
  };

}