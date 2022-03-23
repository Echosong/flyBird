import Sprite from '../base/sprite'

import DataBus from '../databus'
const databus = new DataBus()
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_WIDTH = 78
const BG_HEIGHT = 500

const __ = {
    speed: Symbol('speed'),
    upY: Symbol('upY'),
    downY: Symbol('downY'),
    over: Symbol('over')
  }


export default class Column extends Sprite {
    constructor(ctx, type) {
        super('', BG_WIDTH, BG_HEIGHT)
        this.upImg = new Image();
        this.upImg.src = "images/up.png";
        this.downImg = new Image();
        this.downImg.src = "images/down.png";
        this.render(ctx)
        this[__.speed] = 1.5
        this.type = type
        this.innerHeight = 150;
        // 中心距离
        this.init()

        if(this.type== 0){
            this.w = screenWidth + 28
        }else{
            this.w = screenWidth/2 - 22
        }
    }


    init (){
        //180 是地面的位置
        let groundHeigh = 146
        let over =  ((this.height *2 + this.innerHeight) - (screenHeight -groundHeigh))/2
        console.log('over========', over, '间隔========' + this.innerHeight)
        let k = over - 120;
        //间隔 
        this [__.over] = k/2 - Math.ceil(Math.random()*k) 

        //上面的柱子x坐标就为  -over
        this[__.upY] = (0 - over) + this[__.over]
        //下面柱子 x坐标 为 屏幕高度 + over
        this[__.downY]  = (screenHeight- groundHeigh) + over - this.height + this[__.over];
    
        //拿到间隔的x左边 当前y左边
        this.left = 0
    }

    //判断玩家碰撞
    isCollide(sp){
        let spX = sp.x;
        let spY = sp.y;
        //起始Y坐标
        let startY =  this[__.upY] + this.height 
        //结束Y 坐标
        let endY =  startY + this.innerHeight;
        let startX = this.w - this.left
        let endX = startX + 50
        if(databus.frame < 100){
            return false;
        }
       let flg = false
        console.log('spx===', spX, 'spY========', spY, 'startX====', startX,'endX===', endX, 'startY=======', startY, 'endY======', endY)
        //只要x再这个访问 Y 再间隔范围才安全
        if(spX < endX  && spX > startX){
            if(spY < startY || spY > endY){
                flg = true;
            }
        }
        return flg
      }

    update() {
        this.left +=  this[__.speed]
        if ((this.w - this.left) <= -30 )  {
            this.w =  screenWidth + 28
            this.left = 0
            this.init()
            //得分
            databus.score +=1
        }
    }

    /**
     * 画四根柱子
     */
    render(ctx) {
        ctx.drawImage(
            this.upImg,
            0,
            0,
            this.width,
            this.height,
            this.w - this.left  ,
            this[__.upY],
            50,
            this.height,
        )
        ctx.drawImage(
            this.downImg,
            0,
            0,
            this.width,
            this.height,
            this.w - this.left,
            this[__.downY],
            50,
            this.height,
        )
    }
}