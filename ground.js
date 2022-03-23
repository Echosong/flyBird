import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/ground.png'
const BG_WIDTH = 432
const BG_HEIGHT = 160

export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.top = 0
    this.left = 0;
    this.render(ctx)
  }

  update(){
    this.left -= 3;
    if(this.left <=- screenWidth) this.left = 0;
  }

   /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
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
      this.height +30,
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
      this.height+30,
    )
  }
}