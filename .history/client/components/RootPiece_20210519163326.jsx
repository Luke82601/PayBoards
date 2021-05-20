import React from 'react';
import styled from 'styled-components';

export default class RootPiece {
  constructor(player, iconUrl) {
    this.player = player;
    this.style = iconUrl;
  }
}