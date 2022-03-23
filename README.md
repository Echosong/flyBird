# flyBird
### 飞翔小鸟-微信小游戏

> 应家里小孩的要求， 闲来花几个小时做了个 经典的飞翔小鸟游戏。标准源码 适合微信小程序入门学习使用

## 源码目录

./js
├── base                                   // 定义游戏开发基础类
│   ├── animatoin.js                       // 帧动画的简易实现
│   ├── pool.js                            // 对象池的简易实现
│   └── sprite.js                          // 游戏基本元素精灵类
├── libs
│   ├── symbol.js                          // ES6 Symbol简易兼容
│   └── weapp-adapter.js                   // 小游戏适配器
├── player
│   └── index.js                           // 玩家类（小鸟）
├── runtime
│   ├── background.js                      // 背景类
|   ├── ground.js                          // 滚动地面，实现视觉飞翔效果
|   ├── ground.js                          // 上下障碍柱子
│   ├── gameinfo.js                        // 用于展示分数和结算界面
│   └── music.js                           // 全局音效管理器
├── databus.js                             // 管控游戏状态
└── main.js                                // 游戏入口主函数

