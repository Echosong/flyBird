import Player from './player/index'
import BackGround from './runtime/background'
import Ground from './runtime/ground'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'
import Column from './runtime/column'

const ctx = canvas.getContext('2d')
const databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        // 维护当前requestAnimationFrame的id
        this.aniId = 0

        this.restart()
    }

    restart() {
        databus.reset()

        canvas.removeEventListener(
            'touchstart',
            this.touchHandler
        )

        this.bg = new BackGround(ctx)
        this.player = new Player(ctx)
        this.ground = new Ground(ctx)
        this.gameinfo = new GameInfo()
        this.music = new Music()
        this.column = new Column(ctx, 0)
        this.column1 = new Column(ctx, 1);

        this.bindLoop = this.loop.bind(this)
        this.hasEventBind = false

        // 清除上一局的动画
        window.cancelAnimationFrame(this.aniId)

        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }

   

    // 全局碰撞检测
    collisionDetection() {
        const that = this
        if (this.player.isCollide()) {
            databus.gameOver = true
        }
        if(this.column1.isCollide(this.player)
        || this.column.isCollide(this.player)
        ){
           databus.gameOver = true;
        }

    }

    // 游戏结束后的触摸事件处理逻辑
    touchEventHandler(e) {
        e.preventDefault()

        const x = e.touches[0].clientX
        const y = e.touches[0].clientY

        const area = this.gameinfo.btnArea

        if (x >= area.startX &&
            x <= area.endX &&
            y >= area.startY &&
            y <= area.endY) this.restart()
    }

    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.bg.render(ctx)
        this.column.render(ctx)
        this.column1.render(ctx)
        this.ground.render(ctx)
        this.player.render(ctx);


        this.gameinfo.renderGameScore(ctx, databus.score)
        // 游戏结束停止帧循环
        if (databus.gameOver) {
            this.gameinfo.renderGameOver(ctx, databus.score)
            if (!this.hasEventBind) {
                this.hasEventBind = true
                this.touchHandler = this.touchEventHandler.bind(this)
                canvas.addEventListener('touchstart', this.touchHandler)
            }
        }
    }

    // 游戏逻辑更新主函数
    update() {
        if (databus.gameOver) return
        this.bg.update()
        this.ground.update()
        this.player.update()
        this.column.update()
        this.column1.update()
        this.collisionDetection()
  
    
    }

    // 实现游戏帧循环
    loop() {
        databus.frame++
        
        this.update()
        this.render()

        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }
}