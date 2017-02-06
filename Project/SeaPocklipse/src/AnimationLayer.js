/*

Info - This class will serve as the AnimationLayer. All Animation on screen will have its logic here.

 Info ---------------------------------------------------------

 Class - AnimationLayer :  Extends cc.Layer. Used for displaying game objects along with their interaction with each other.
                            All animation will have its logic here.
        Method Summary   : 1. ctor() - Constructor
                           2. init() - Called within ctor(). Used to initialize variables.
                           3. render() - Called within ctor(). Used to display components.
                           4. update(dt) - Scheduled to call every frame. Used to check for collisions and move objects.
                           5. shoot(dt) -  Scheduled to call 12 times a sec . Creates a bullet
                           6. subscribe(ob) - Adds parameter ob to list of observers.
                           7. unsubscribe(index) - Removes observer at 'index'.
                           8. cleanUp() - Cleans up before switching the scene.
                           9.  reint() - To initialize again.

        Variable Summary : 1. _ship - Stores object of Player class.
                           2. _score - Maintains score.
                           3. _enemies - Stores enemies.
                           4. _winSize - Stores Window size.
                           5. _observers - Array that stores observers (For Observer pattern).
                           6. _bulletCount - Stores number of bullets rendered on canvas.
                           7. _bullets - Array that stores bullets.
                           8. _phy - Stores physics object.
                           9. _BackGroundAudio- To play the BackGround Music in the Game
                           10._explosionSound- To play the Explosion Sound on Plane Shot
                           11._gameOver:To Play the Game Over Sound at the end of the game to show the changed state.,

 --------------------------------------------------------------
 Change LOG ---------------------------------------------------
 2/11/15 - Added Keyboard listner , subscribe and unsubscribe methods along with observers[]
 2/23/15 - Added shoot function to initialize Bullets
 3/7/15 - Added bullets from player
 3/21/15 - Added Clean up code
 3/22/15 - Added reint method
 --------------------------------------------------------------
*/
var AnimationLayer = cc.Layer.extend({

	_ship:null,
	_score:0,
    _playerLife:0,
	_winSize:null,
	_bulletCount:0,
    _gameState:null,
	_explosion:[],
    _observers:[],
    _bullets:[],
    _enemyBullets:[],
    _enemies:[],
    _BackGroundAudio:null,
    _explosionSound:null,
    _gameOver:null,
    _phy:null,
    _enemyWaveCount:0,

	/*
        Constructor
	*/
    ctor:function(){
       //var context=cc.audioEngine;

        //context.playMusic("res/sound/TwinCobra.mp3",true);

        this._super();
        this.init();
		this.render();
    },


    /*
    To re-initialize everything
     */
    reint:function()
    {
        this.init();
        this.render();
    },

	/*
     Used to initialize variables and keyboard listeners
	 */
    init:function () {
        this._enemyWaveCount = 0;
        this._phy = new PhysicsComp();
        this._gameState = "INIT";
		this._score = 0;
		this._super();
		this._winSize = cc.director.getWinSize();
		this._ship = new Player();

		this._ship.loadJson();
		this._playerLife= this._ship._sprite._lives;
        this._ship.animate();

        this._BackGroundAudio=myAudioEngine;
        this._BackGroundAudio.playMusic(res.bg_music,true);
        this._explosionSound=myAudioEngine;
        this._gameOver=myAudioEngine;






		
		
		if (cc.sys.capabilities.hasOwnProperty('keyboard'))
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed:function (key, event) {
                    SP.KEYS[key] = true;
                },
                onKeyReleased:function (key, event) {
                    SP.KEYS[key] = false;
                }
            }, this);
			
			if (cc.sys.capabilities.hasOwnProperty('mouse'))
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseMove: function(event){
                    SP.MOUSE_X = event.getLocationX();
                    SP.MOUSE_Y = event.getLocationY();
                }
            }, this);

    },

    /*
         Used to display components.
    */
	render:function()
	{
		this.addChild(this._ship._sprite, 1);

	    this.scheduleUpdate();
        this.schedule(this.enemyShoot, 1);
        this.schedule(this.shoot, 1 /12);
        this.enemyWave(); //First Wave
        this.schedule(this.enemyWave,20);
        this._gameState = "START";
	},


    /*
        Generate Enemy Wave
    */
    enemyWave:function()
    {
        var prevEnemySize =  this._enemies.length;
        this._enemyWaveCount++;
        for(var k=0;k<=10;k++)
        {
            this._enemies.push(new Enemy("Bomber"));
        }

        for(var i= prevEnemySize;i<this._enemies.length;i++) {
            this.addChild(this._enemies[i]._sprite, 1);
        }



    },
    /*
     This function is used to create Enemy bullets .
     */
    enemyShoot:function(dt)
    {
        if(this._gameState == "START")
        {
            //Initialize bullet here
            for(var i=0;i<this._enemies.length;i++)
            {
                var enemyBull = new Projectile();
                enemyBull.setEnemyBulletProperties(this._enemies[i], this._ship, 50.0, res.bullet_png);

                //this._bullets[this._bulletCount] = bull;
                this._enemyBullets.push(enemyBull);
                //	this._bulletCount++;

                this.addChild(enemyBull._sprite, 2);
            }
        }
    },
    /*
     This function is used to create bullets .
     */
	shoot:function(dt)
	{
		//Initialize bullet here 
        if(this._ship!=null && this._gameState == "START")
        {
            var bull = new Projectile();
       		bull.setProperties(this._ship,100.0,res.bullet_png);

            this._bullets.push(bull);
			this.addChild(bull._sprite,2);
        }
        else if(this._playerLife > 0)
        {
            this._ship = new Player();
            this._ship.loadJson();
            this._ship.animate();

            this.addChild(this._ship._sprite, 1);
        }
        else
        {


            this._gameState = "GAMEOVER";

        }
	},
	
	/*
	    Gets called every frame
	 */
	update:function(dt)
	{

         if(this._enemyWaveCount > 5)
         {
            this._gameState = "LEVELCOMPLETE";
         }else
         {
             if(this._ship!=null) {
                 this._ship.move(dt);
             }
             for(var i=0;i<this._enemies.length;i++)
             {
                 this._enemies[i].move(dt);
             }
             //Work with projectiles
             for(var i = this._bullets.length - 1  ; i >= 0 ; i--) {
                 for (var j = 0; j < this._enemies.length; j++) {//-----Collision physics check--------//
                     if (this._enemies[j] != null && this._phy.checkForCollision(this._enemies[j]._sprite, this._bullets[i]._sprite)) {
                         if (this._enemies[j].getHit("BULLET"))// if health goes zero for Enemy
                         {
                             cc.log("Plane shot down");

                             var planeExplosion = new ExplosionEffect("Bomber", this._enemies[j]._sprite.x + 75, this._enemies[j]._sprite.y + 50);
                             this._explosionSound.playEffect(res.Explosion_effect,false);
                             planeExplosion.exAnimate();
                             this.addChild(planeExplosion._sprite, 1);


                             this._explosion.push(planeExplosion);
                             this.removeChild(this._enemies[j]._sprite);
                             this._enemies.splice(j, 1);
                             this._score++;
                         }


                         this._bullets[i]._active = false;

                         var bullExpl = new ExplosionEffect("Bullet", this._bullets[i]._sprite.x, this._bullets[i]._sprite.y);
                         this.addChild(bullExpl._sprite, 1);
                         bullExpl.exAnimate();
                         this._explosion.push(bullExpl);
                     }
                 }

                 if (!this._bullets[i]._active) {
                     this.removeChild(this._bullets[i]._sprite);
                     this._bullets.splice(i, 1);
                 }

                 if (this._bullets[i] != null) {
                     this._bullets[i].move(dt);
                 }

             }

             /*************************************************************Enemy Bullet *********************////////////////
             for(var i = this._enemyBullets.length - 1  ; i >= 0 ; i--) {
                 if (this._ship != null && this._phy.checkForCollision(this._ship._sprite, this._enemyBullets[i]._sprite)) {
                     if (this._ship.playerGetHit("BULLET"))// if health goes zero for Enemy
                     {
                         cc.log("Plane shot down");

                         var shipExplosion = new ExplosionEffect("Bomber", this._ship._sprite.x + 75, this._ship._sprite.y + 50);
                         this._explosionSound.playEffect(res.Explosion_effect,false);
                         shipExplosion.exAnimate();
                         this.addChild(shipExplosion._sprite, 1);


                         this._explosion.push(shipExplosion);
                         this.removeChild(this._ship._sprite);
                         delete this._ship._sprite;
                         delete this._ship;
                         this._playerLife--;
                     }


                     this._enemyBullets[i]._active = false;

                     var bullExplOnShip = new ExplosionEffect("Bullet", this._enemyBullets[i]._sprite.x, this._enemyBullets[i]._sprite.y);
                     this.addChild(bullExplOnShip._sprite, 1);
                     bullExplOnShip.exAnimate();
                     this._explosion.push(bullExplOnShip);
                 }


                 if (!this._enemyBullets[i]._active) {
                     this.removeChild(this._enemyBullets[i]._sprite);
                     this._enemyBullets.splice(i, 1);
                 }

                 if (this._enemyBullets[i] != null) {
                     this._enemyBullets[i].move(dt);
                 }
             }
             //Work with explosions
             for(var i = this._explosion.length - 1  ; i >= 0 ; i--)
             {
                 if(this._explosion[i].isDone())
                 {
                     this.removeChild(this._explosion[i]._sprite);
                     this._explosion.splice(i,1);

                 }
             }
         }




        //Get data and send it to observers.
        if(this._gameState == "START")
        {
            var score = this._score;
            var shipLife=this._playerLife;
            this._observers.forEach(function(item) {
                item.modify(shipLife, score, 0);
            });
        }
        else if(this._gameState == "GAMEOVER" || this._gameState == "LEVELCOMPLETE")
        {

            var flag = 1;

            if(this._gameState == "LEVELCOMPLETE")
                flag = 2;

            this.unschedule(this.shoot);
            this.unschedule(this.enemyShoot);
            this.unschedule(this.enemyWave);



            var score = this._score;
            this._BackGroundAudio.stopMusic();
            this._explosionSound.playEffect(res.game_Over_effect,false);


            this._observers.forEach(function(item) {
                item.modify(0, score, flag);
            });


            this._explosion.splice(0, this._explosion.length);
            this._bullets.splice(0, this._bullets.length);
            this._enemyBullets.splice(0, this._enemyBullets.length);
            this._enemies.splice(0, this._enemies.length);
            this._observers.splice(0, this._observers.length);



            this.removeAllChildren();

            this.unscheduleUpdate();
        }

        
		

	},
	
	
	/*
	    This function is used to allow an observer to subscribe AnimationLayer.
	 ob parameter refers to any class that has modify function implemented.

	 */
	subscribe:function(ob)
	{
			this._observers.push(ob); 
	},

	
	/*
	    This method is used to unsubsribe an observer from AnimationLayer .
	     Parameter index specifies the index at which observer must be removed.
	 */
	unsubscribe:function(index)
	{
		this._observers.splice(index,1);
	},

    /*
     Clean-up before switching the scene else wont be able to add later
     */
    cleanUp:function()
    {


        this.removeAllChildren();



    }
	
});

