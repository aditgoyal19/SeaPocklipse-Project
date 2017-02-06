/*
 
 Info ---------------------------------------------------------

 Class - ExplosionEffect :  Extends cc.Layer. To render the Explosion effect.

 All Sprite Explosion and FX  will have its implementation here.
 Method Summary   : 1. ctor() - Constructor
                    2. exAnimate() - This function renders all sprite explosion sprite animations.
                    3. isDone() - This function checks if explosion animation is finsihed or not .


 Variable Summary : 1. _sprite - Stores the sprite object .
 2. _actionComm - store the return from cocos animation function.This return a bool value and is used to create conditional events in the Animation layer.


 --------------------------------------------------------------
 Change LOG ---------------------------------------------------
 --------------------------------------------------------------
 */

var ExplosionEffect = cc.Class.extend({
  

	_sprite:null,
	_actionComm:null,
	_type:null,

    /*
     Constructor
     */
	ctor:function(type, xPos, yPos)
	{
		//var sing = new SingletonFactory();
		var fact = SingletonFactory.getInstance("ASSET"); // Factory object


        this._sprite =  fact.getAsset("SPRITE");

        this._sprite.x = xPos;
        this._sprite.y = yPos;

        this._type = type;
	},    	


    /*
     This function renders all sprite explosion sprite animations.
     */
    exAnimate:function()
	{
	if(this._sprite != null)
		{
            if(this._type == "Bomber") {
                cc.spriteFrameCache.addSpriteFrames(res.ExplosionBomber_plist);
                var animFrames = [];
                for (var i = 1; i < 9; i++) {
                    var _obj = "exploSp" + i + ".png";
                    //cc.log(_obj);
                    var _frame = cc.spriteFrameCache.getSpriteFrame(_obj);
                    animFrames.push(_frame);
                }

                var _animation = new cc.Animation(animFrames, 0.1);
                this._actionComm = this._sprite.runAction(new cc.Animate(_animation));
            }
            else
            {
                cc.spriteFrameCache.addSpriteFrames(res.ExplosionBullet_plist);

                var animFrames = [];
                for (var i = 1; i < 9; i++) {
                    var _obj = "exploBulletSp" + i + ".png";
                   // cc.log(_obj);
                    var _frame = cc.spriteFrameCache.getSpriteFrame(_obj);
                    animFrames.push(_frame);
                }

                var _animation = new cc.Animation(animFrames, 0.1);
                this._actionComm = this._sprite.runAction(new cc.Animate(_animation));
            }
		}
		else
		{
			cc.log("Sprite is not initialized !! Please call this method after sprite is initialized");
		}
	},

/*
 This function checks if explosion animation is finsihed or not .
 */
    isDone:function()
    {

        return this._actionComm.isDone();
    }
       
});

