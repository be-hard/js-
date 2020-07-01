var sw = 20,
    sh = 20,
    tr = 30,
    tc = 30;
<<<<<<< HEAD
// 零件准备
// 把食物，蛇头，蛇身的每一节都看成是一个个的小方块，实例化的时候为小方块里对应添加不同的样式类名就能变成不同的事物
=======
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
function square(x,y,classname){
    this.x = x;
    this.y = y;
    this.classname = classname;
    this.parent = document.getElementsByClassName("content")[0];
}
square.prototype = {
    create:function(){
<<<<<<< HEAD
        // viewContent为创建的方块，并设置好类名、在游戏界面中的位置
        this.viewContent = document.createElement("div");
        this.viewContent.className = this.classname;
        this.viewContent.style.width = sw  + "px";
        this.viewContent.style.height = sh + "px";
=======
        this.viewContent = document.createElement("div");//因为后面要改变蛇头 的方向，所以要存着
        this.viewContent.className = this.classname;
        this.viewContent.style.width = 20  + "px";
        this.viewContent.style.height = 20 + "px";
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
        this.viewContent.style.left = this.x * sw + "px";
        this.viewContent.style.top = this.y * sh + "px";
        this.parent.appendChild(this.viewContent);
    },
    remove:function(){
        this.parent.removeChild(this.viewContent);
    }
}
<<<<<<< HEAD
// 蛇的构造函数
=======
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
function snake(){
    
}
snake.prototype = {
    init:function(){
        this.initData();
        this.createsnake();
        this.creatfood();

    },
<<<<<<< HEAD
    // 用链表的方式连接蛇的各个部分，蛇移动时更新链表中的关键节点的前后指针
    initData:function(){
        this.head = null;
        this.tail = null;
        // pos数组存储蛇身体的每一节的坐标，用于判断蛇头是否下一步会咬到自己
        this.pos = [];
        // 蛇头往不同方向走坐标的对应变化和蛇头应旋转的角度
=======
    initData:function(){
        this.head = null;
        this.tail = null;
        this.pos = [];
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
        this.poschange = {
            left:{
                x:-1,
                y:0,
                rotate:-180
            },
            right:{
                x:1,
                y:0,
                rotate:0
            },
            up:{
                x:0,
                y:-1,
                rotate:-90
            },
            down:{
                x:0,
                y:1,
                rotate:90
            }

        };
<<<<<<< HEAD
        // 蛇默认往右走
        this.direction = "right";
        this.timer = null;
        this.duration = 200;
        // 存储蛇头下一步的坐标，用于判断下一步蛇的情况分析，咬到自己或者吃到食物，或者安全，或者撞到墙
        this.nextpos = {};
        this.food = null;
        // 存储食物坐标
        this.foodpos = null;
    },
    // 初始化蛇的各个部分
=======
        this.direction = "down";
        this.timer = null;
        this.duration = 200;
        this.nextpos = {}
    },
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
    createsnake:function(){
        this.head = new square(2,0,"snakehead");
        this.pos.push([2,0]);
        this.head.create();
        this.snakeBody1 = new square(1,0,"snakebody");
        this.pos.push([1,0]);
        this.snakeBody1.create()
        this.tail = new square(0,0,"snakebody");
        this.pos.push([0,0]);
        this.tail.create();
        this.head.last = null;
        this.head.next = this.snakeBody1;
        this.snakeBody1.last = this.head;
        this.snakeBody1.next = this.tail;
        this.tail.last = this.snakeBody1;
        this.tail.next = null;
        this.score = 0;
    
    },
<<<<<<< HEAD
    // 新创建一节蛇身
=======
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
    createsection:function(attr,x,y,className){
        this[attr] = new square(x,y,className);
        this.pos.push(this[attr].x,this[attr].y);
        this[attr].create()
    },
    
    creatfood:function(){       
       this.foodpos = this.getfoodpos();
       this.food = new square(this.foodpos[0],this.foodpos[1],"food");
       this.food.create()
    },
    getfoodpos:function(){
        var x = getrandomNum(0,tr -1);
        var y = getrandomNum(0,tc -1);
        console.log(x,y)
        var arr = [x,y];
        var same = false;
        for(var i = 0;i < this.pos.length; i++){
            if(JSON.stringify(this.pos[i]) === JSON.stringify(arr)){
                same = true;
                break;
            }
        }
        if(same){
            this.getfoodpos()
        }else{
            return arr;
        }
        
    },
    startMove:function(){
        clearInterval(this.timer);
        this.timer = setInterval(this.judgeSituation.bind(this),this.duration)
    },
    judgeSituation:function(){
        
        this.nextpos = {
            x:this.head.x + this.poschange[this.direction].x,
            y:this.head.y + this.poschange[this.direction].y
        }
<<<<<<< HEAD
        // 判断撞到墙
=======
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
        if(this.nextpos.x < 0 || this.nextpos.x > tc - 1 || this.nextpos.y < 0 || this.nextpos.y > tr - 1){
            return this.stratiges.gameover.call(this)

        }
<<<<<<< HEAD
        // 判断咬到自己
        if(this.bitself()){ 
            return this.stratiges.gameover.call(this)
        }
        // 判断吃到食物
=======
        if(this.bitself()){ 
            return this.stratiges.gameover.call(this)
        }
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
        if(this.nextpos.x === this.foodpos[0] && this.nextpos.y === this.foodpos[1]){
            return this.stratiges.eat.call(this)
        }
        this.stratiges.move.call(this);
    },

    bitself:function(){
        console.log(this.pos,this.nextpos)
        for(var i = 0;i < this.pos.length;i ++){
            if(this.nextpos.x === this.pos[i][0] && this.nextpos.y === this.pos[i][1]){
                return true;
            }
        }
       
    },
    stratiges:{
<<<<<<< HEAD
        // 移动时更新链表关键节点的前后指针，移动效果是通过删除蛇头，在原来蛇头的位置添加一节蛇身，前面添加蛇头，后面删除蛇尾。
        move:function(flag){   
            console.log(this,this.direction)
=======
        move:function(flag){   
            console.log(this.direction)
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
            this.nextpos = {
                x:this.head.x + this.poschange[this.direction].x,
                y:this.head.y + this.poschange[this.direction].y
            }
            this.newbody = new square(this.head.x,this.head.y,"snakebody");
            this.newbody.next = this.head.next;
            this.head.next.last = this.newbody;
            this.newbody.last = null;
            this.head.remove();
            this.newbody.create();
            this.head = new square(this.nextpos.x,this.nextpos.y,"snakehead");
            this.head.last = null;
            this.head.next = this.newbody;
            this.newbody.last = this.head;
          
            this.head.create();
            this.head.viewContent.style.transform = "rotate(" + this.poschange[this.direction].rotate + "deg)";
            this.pos.splice(0,0,[this.nextpos.x,this.nextpos.y]) 
<<<<<<< HEAD
            // 当吃到食物时，后面的蛇尾就不用删除了
=======
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
            if(flag){
                
                return;
            }
            this.tail.remove();
                this.tail = this.tail.last;
                this.tail.next = null;      
                this.pos.pop();
        },
<<<<<<< HEAD
        // 游戏结束
=======
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
        gameover:function(){
            clearInterval(this.timer);
       alert("gameover!Your score is " + game.snake.score);
            
            game.ostart.parentNode.style.display = "block";
            game.ocontent.innerHTML = ""
            game.initData()
            // game.snake.init()
        },  
<<<<<<< HEAD
        // 吃到食物
        eat:function(){
            // console.log(this)  注意这个this指向是指向this.strategy
            this.stratiges.move.call(this,true)
=======
        eat:function(){
            this.stratiges.move(true)
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
            this.score ++;
            this.foodpos = this.getfoodpos();
            this.food.viewContent.style.left = this.foodpos[0] * sw + "px";
            this.food.viewContent.style.top = this.foodpos[1] * sh + "px";
        }

    },
   


}
<<<<<<< HEAD
// 随机产生食物的坐标
=======
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
function getrandomNum(min,max){
    return Math.round(Math.random() * (max - min) + min);
}
var game = {
    init:function(){
        this.initData();
        // this.snake.init()
        this.handle()
    },
    initData:function(){
        this.ostart = document.getElementsByClassName("start")[0];
        this.opause = document.getElementsByClassName("pause")[0];
        this.ocontent = document.getElementsByClassName("content")[0]
        this.snake = new snake();
    },
    handle:function(){
<<<<<<< HEAD
        var self = this;
        // 开始游戏
        this.ostart.onclick = function(){
=======
        window.onclick = function(e){
            console.log(e.target)
        }
        var self = this;
        this.ostart.onclick = function(){
            console.log(1)
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
            this.parentNode.style.display = "none";
            self.snake.init()
            self.snake.startMove()          
        }    
<<<<<<< HEAD
        // 游戏中途点击界面暂停，再次点击继续游戏
        this.ocontent.onclick = function(e){
=======
        this.ocontent.onclick = function(e){
            console.log(6)
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
            clearInterval(self.snake.timer)
                self.opause.parentNode.style.display = "block";
        self.opause.onclick = function(){
            this.parentNode.style.display = "none";
            self.snake.startMove()  
        }
            
        }
<<<<<<< HEAD
        // 键盘按方向键控制蛇头的移动方向
        window.onkeydown = function(e){
            console.log(8,game.snake)
            if(e.which === 37){
                // 向右走的时候不能直接让其向左走，其他方向类似
=======
        window.onkeydown = function(e){
            console.log(8,game.snake)
            if(e.which === 37){
>>>>>>> 89f3fd8522d8ebb80d0ee79f8c714cbedb23f930
               return game.snake.direction = game.snake.direction === "right" ? "right" : "left";
            }
            if(e.which === 38){
                return game.snake.direction = game.snake.direction === "down" ? "down" : "up";
            }
            if(e.which === 39){
                return game.snake.direction = game.snake.direction === "left" ? "left" : "right";
            }
            if(e.which === 40){
                return game.snake.direction = game.snake.direction === "up" ? "up" : "down";
            }
        }
    }

}
game.init()
