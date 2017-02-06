/*

Date - 2/23/15

 Info ---------------------------------------------------------

 Class - Projectile : This class will serve as the Projectile. It can be of player or enemy .

         Method Summary   : 1. setProperties(parent, speed, type) - Sets variables of Projectile.
                            2. move(dt) - Moves the projectile.

        Variable Summary : 1. _speed - Speed of projectile.
                           2. _sprite - Sprite used to represent the Projectile.
                           3. _velocity - Velocity of projectile.
                           4.  _active - Checks if projectile can be removed.

 --------------------------------------------------------------
 Change LOG ---------------------------------------------------
 3/7/15 - Gave same speed to all bullets
 3/9/15 - Added Accuracy of guns
 3/10/15 - Adhering to common coding convention

 --------------------------------------------------------------
*/
var Projectile = cc.Class.extend({
	_speed:0,
	_sprite:null,
	_velocity:null,
	_active:true,
    _phy:null,
	_enemyBullOffset:0,
    /*
    This method is used to set properties variables with data from player.json file
    */
	setProperties:function(parent, speed, type)
    {
        _phy =  new PhysicsComp();

		var mouseX = SP.MOUSE_X;
		var mouseY = SP.MOUSE_Y;
		
		//Add offset 
	    mouseX = mouseX + Math.floor(Math.random() * (60 - SP.BULLET_ACC)) + (60 - SP.BULLET_ACC);
		mouseX = mouseX - Math.floor(Math.random() * (60 - SP.BULLET_ACC)) - (60 - SP.BULLET_ACC);
		
		mouseY = mouseY + Math.floor(Math.random() * (60 - SP.BULLET_ACC)) + (60 - SP.BULLET_ACC);
		mouseY = mouseY - Math.floor(Math.random() * (60 - SP.BULLET_ACC)) - (60 - SP.BULLET_ACC);

		//var sing = new SingletonFactory();
		var fact = SingletonFactory.getInstance("ASSET"); // Factory object
		this._speed =  parseFloat(speed);
		
		
		this._sprite =  fact.getAsset("SPRITE",type);
		
		this._sprite.setAnchorPoint(new cc.Point(0,0));
		// 50 is offset added so that bullet is shot from center of ship 
		this._sprite.setPosition(new cc.Point(parseFloat(parent._sprite.x) + 50 ,parseFloat(parent._sprite.y) + 50));  
		
		
		this._velocity = new cc.Point(mouseX - this._sprite.x ,mouseY - this._sprite.y);
		this._velocity = cc.pNormalize(this._velocity); 
		
		
		//100 is bullet speed
		this._velocity.x = this._velocity.x * this._speed;
		this._velocity.y = this._velocity.y * this._speed;	
	
	
		this._active =true;


            var angle = Math.atan2(mouseY - this._sprite.y, mouseX - this._sprite.x);
            angle = angle * (180 / Math.PI);
            angle -= 20;
            this._sprite.setRotation(-angle);


    },
    /*
     This method is used to set properties variables with data from player.json file
     */
    setEnemyBulletProperties:function(parent,player, speed, type)
    {
        _phy =  new PhysicsComp();
        _enemyBullOffset=parent._sprite._offset;




       // var sing = new SingletonFactory();
        var fact = SingletonFactory.getInstance("ASSET"); // Factory object
        this._speed =  parseFloat(speed);


        this._sprite =  fact.getAsset("SPRITE",type);

        this._sprite.setAnchorPoint(new cc.Point(0,0));
        // 50 is offset added so that bullet is shot from center of ship
        this._sprite.setPosition(new cc.Point(parseFloat(parent._sprite.x)+_enemyBullOffset ,parseFloat(parent._sprite.y) + _enemyBullOffset));


        this._velocity = new cc.Point(player._sprite.x-parent._sprite.x ,player._sprite.y-parent._sprite.y);
        this._velocity = cc.pNormalize(this._velocity);


        //100 is bullet speed
        this._velocity.x = this._velocity.x * this._speed;
        this._velocity.y = this._velocity.y * this._speed;


        this._active =true;


        var angle = Math.atan2(parent._sprite.x-player._sprite.x ,parent._sprite.y-player._sprite.y);
        angle = angle * (180 / Math.PI);
        angle -= 20;
        this._sprite.setRotation(-angle);


    },
    /*
        Used to move the projectile.
     */
	move:function(dt)
    {
	 if (this._sprite.y >= 720 || this._sprite.y <= 0 || this._sprite.x <= 0 || this._sprite.x >= 480) {
		
		this._active = false;
	    
	 }else
	 {
         _phy.moveEuler(this._sprite, this._velocity, dt);
	 }
  
    }

});
