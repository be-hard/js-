var sw = 20,
    sh = 20,
    tr = 30,
    tc = 30;
function square(x,y,classname){
    this.x = x;
    this.y = y;
    this.classname = classname;
    this.parent = document.getElementsByClassName("content")[0];
}
square.prototype = {
    create:function(){
        this.viewContent = document.createElement("div");//因为后面要改变蛇头 的方向，所以要存着
        this.viewContent.className = this.classname;
        this.viewContent.style.width = 20  + "px";
        this.viewContent.style.height = 20 + "px";
        this.viewContent.style.left = this.x * sw + "px";
        this.viewContent.style.top = this.y * sh + "px";
        this.parent.appendChild(this.viewContent);
    },
    remove:function(){
        this.parent.removeChild(this.viewContent);
    }
}
function snake(){
    
}
snake.prototype = {
    init:function(){
        this.initData();
        this.createsnake();
        this.creatfood();

    },
    initData:function(){
        this.head = null;
        this.tail = null;
        this.pos = [];
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
        this.direction = "down";
        this.timer = null;
        this.duration = 200;
        this.nextpos = {}
    },
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
        if(this.nextpos.x < 0 || this.nextpos.x > tc - 1 || this.nextpos.y < 0 || this.nextpos.y > tr - 1){
            return this.stratiges.gameover.call(this)

        }
        if(this.bitself()){ 
            return this.stratiges.gameover.call(this)
        }
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
        move:function(flag){   
            console.log(this.direction)
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
            if(flag){
                
                return;
            }
            this.tail.remove();
                this.tail = this.tail.last;
                this.tail.next = null;      
                this.pos.pop();
        },
        gameover:function(){
            clearInterval(this.timer);
       alert("gameover!Your score is " + game.snake.score);
            
            game.ostart.parentNode.style.display = "block";
            game.ocontent.innerHTML = ""
            game.initData()
            // game.snake.init()
        },  
        eat:function(){
            this.stratiges.move(true)
            this.score ++;
            this.foodpos = this.getfoodpos();
            this.food.viewContent.style.left = this.foodpos[0] * sw + "px";
            this.food.viewContent.style.top = this.foodpos[1] * sh + "px";
        }

    },
   


}
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
        window.onclick = function(e){
            console.log(e.target)
        }
        var self = this;
        this.ostart.onclick = function(){
            console.log(1)
            this.parentNode.style.display = "none";
            self.snake.init()
            self.snake.startMove()          
        }    
        this.ocontent.onclick = function(e){
            console.log(6)
            clearInterval(self.snake.timer)
                self.opause.parentNode.style.display = "block";
        self.opause.onclick = function(){
            this.parentNode.style.display = "none";
            self.snake.startMove()  
        }
            
        }
        window.onkeydown = function(e){
            console.log(8,game.snake)
            if(e.which === 37){
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
