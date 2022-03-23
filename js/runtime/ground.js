import Sprite from '../base/sprite'
import BackGround from './background'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/ground.png'
const WIDTH = 432
const HEIGHT = 148
const BG_HEIGHT = 644

export default class Ground extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, WIDTH, HEIGHT)
    this.height = HEIGHT/ BG_HEIGHT * screenHeight;
    this.top = 0
    this.left = 0;
    this.render(ctx)
  }

  update(){
    this.left -= 3;
    if(this.left <=- screenWidth) this.left = 0;
  }



  render(ctx) {
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      this.left,
      screenHeight - this.height ,
      this.width,
      this.height +80,
    )
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      screenWidth + this.left,
      screenHeight - this.height ,
      this.width,
      this.height +80,
    )
  }
}