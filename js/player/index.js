import Sprite from '../base/sprite'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/1.png'
const PLAYER_WIDTH = 51
const PLAYER_HEIGHT = 36



//下降速度
const __ = {
  speed: Symbol('speed'),
  up: Symbol('up')
}

const databus = new DataBus()

export default class Player extends Sprite {
  constructor(ctx) {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)
    // 玩家默认处于屏幕底部居中位置
    this.x = screenWidth / 2 - this.width / 2 - 50
    this.y = screenHeight - this.height - 30
    //下降速度
    this[__.speed] = 3
    // 初始化事件监听
    this.initEvent()
    this.render(ctx)
    this.top = 30,
      this.index = 0
    this[__.up] = 0
  }

  update() {
    if (databus.frame % 10 == 0) {
      this.index += 1;
      if (this.index > 7) {
        this.index = 0
      }
    }
    if (this[__.up] == 0) {
      let k = 0.3;
      if (databus.frame % 5 == 0) {
        this[__.speed] += k;
      }
    }

    this.top += this[__.speed] - this[__.up];
    if (this.top > screenHeight) {
      this.top = 30
      this[__.speed] = 2
    }
    this.y = this.top
  }

  render(ctx) {
    if(!this.index){
        this.index = 0
    }
    this.img.src = 'images/' + this.index + '.png'
    ctx.drawImage(
      this.img,
      0,
      0,
      100,
      50,
      this.x,
      this.top,
      this.width,
      this.height
    )
  }
  isCollide(){
    return this.top > 450
  }

  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      this[__.up] = 6
      this[__.speed] = 3
    }))
    canvas.addEventListener('touchend', ((e) => {
      this[__.up] = 0
    }))
  }
}