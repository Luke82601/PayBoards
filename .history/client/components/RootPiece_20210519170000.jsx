import React from 'react';
import styled from 'styled-components';



export default class Piece {
  constructor(player) {
    this.player = player;
    this.style = {backgroundImage: `url('${iconUrl}')`};
  }
}