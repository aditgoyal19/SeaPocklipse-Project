/*

Date - 2/9/15 
Info - This class will serve as the Ship. It will contain all relevant attributes of player 

Change Log :


 Info ---------------------------------------------------------

 Class - Player : This class will serve as the Object that player will control.

        Method Summary   : 1. loadJson() - Sets properties of player from json.
                           2. move(dt) - This method is called from update of Animation layer. Basically it is used to move the ship.
                           3. animate() - This method used to load sprite Sheet (for animating ship). It must be called after loadJson().

 Variable Summary : 1. _speed - Speed of player.
                    2. _sprite - Sprite used to represent the player.

 --------------------------------------------------------------
 Change LOG ---------------------------------------------------
 2/10/15 - Added loadJson method
 2/11/15 - Added animate method
 2/23/15 - Added createBullet method and made changes to move method
 3/7/15  - Fixed a bug (Game used to crash at times)  , Removed Bullet content and moved it to animation layer
 3/10/15 - Adhering to common coding convention

 --------------------------------------------------------------


*/


var Player = cc.Class.extend({
	_speed:0,
	 _sprite:null,

	/*
	    This method is used to Load Player variables with data from player.json file
	 */
	loadJson:function()
	{
		
		var request = new XMLHttpRequest();
		request.open("GET","res/player.json", false);
		request.send(null);
        var data = JSON.parse(request.responseText);
		
		// var sing = new SingletonFactory();
		var fact = SingletonFactory.getInstance("ASSET"); // Factory object
		this._speed =  parseFloat(data.ship.speed);
		this._sprite =  fact.getAsset("SPRITE",data.ship.sprite);
		this._sprite.setAnchorPoint(new cc.Point(0,0));
		this._sprite.setPosition(new cc.Point(parseFloat(data.ship.position.x) ,parseFloat(data.ship.position.y)));
        this._sprite._name=data.ship.name;
        this._sprite._health=data.ship.health;
        this._sprite._lives=data.ship.lives;
		cc.log("loaded from json");
	
	},

    /*
     This method used to load sprite Sheet (for animating ship). It must be called after loadJson().
    */
	animate:function()
	{
		if(this._sprite != null)
		{
			// create sprite sheet
			cc.spriteFrameCache.addSpriteFrames(res.player_plist);
  	
			// init runningAction
			var animFrames = [];
			for (var i = 1; i < 4; i++) {
				var str = "Ship" + i + "_100x160.png";
			
				var frame = cc.spriteFrameCache.getSpriteFrame(str);
				animFrames.push(frame);
			}
		  var animation = new cc.Animation(animFrames, 0.1);
		  this._sprite.runAction(new cc.RepeatForever(new cc.Animate(animation)));
		}
		else
		{
			cc.log("Sprite is not initialized !! Please call this method after sprite is initialized");
		}
	},

    playerGetHit:function(projectileType)
    {

        if(projectileType == "BULLET")
        {
            this._sprite._health = this._sprite._health - 5;
            cc.log(this._sprite._health);
        }

        if(this._sprite._health <= 0 )
        {
            return true;
        }
        else
        {
            return false;
        }
    },
    /*
     This method is called from update of Animation layer. Basically it is used to move the ship.
     */
    move:function(dt)
	{
	
		if ((SP.KEYS[cc.KEY.w] || SP.KEYS[cc.KEY.up]) && this._sprite.y <= 560) {
			this._sprite.y +=  this._speed;
		}
		if ((SP.KEYS[cc.KEY.s] || SP.KEYS[cc.KEY.down]) && this._sprite.y >= 0) {
			this._sprite.y -= this._speed;
		}
		if ((SP.KEYS[cc.KEY.a] || SP.KEYS[cc.KEY.left]) && this._sprite.x >= 0) {
			this._sprite.x -=  this._speed;
		}
		if ((SP.KEYS[cc.KEY.d] || SP.KEYS[cc.KEY.right]) && this._sprite.x <= 379){
		    this._sprite.x +=  this._speed;
		}	
	}

	 
});
