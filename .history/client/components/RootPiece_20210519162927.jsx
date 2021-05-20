export default class RootPiece {
  constructor(player, iconUrl) {
    this.player = player;
    this.style = {"backgroundImage": `url('${iconUrl}')`};
  }
}