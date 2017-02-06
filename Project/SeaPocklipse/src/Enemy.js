/*
 
Info - This class will serve as the Enemies. It will contain all relevant attributes of enemy planes


Change log : 
3/9/15 - Added getHit method which will deduct enemy's health based on type of projectile 
3/10/15 - Adhering to common coding convention

 Info ---------------------------------------------------------

 Class - Enemy : Will represent all properties of a Enemy.

        Method Summary   : 1. ctor() - Constructor
                    2. init() - Called within ctor(). Used to initialize variables.
                    3. getHit(type) - Called whenever enemy is hit by 'type' causing it to lose some amount of health.

        Variable Summary : 1. _speed - Enemy speed.
                           2. _sprite - Enemy sprite.
                           3. _health - Enemy Health.
 --------------------------------------------------------------
 Change LOG ---------------------------------------------------
 3/9/15 - Added getHit method which will deduct enemy's health based on type of projectile
 3/10/15 - Adhering to common coding convention

 --------------------------------------------------------------

*/
var Enemy =cc.Class.extend({
	_speed:0,
	_sprite:null,
	_health:0,
    _velocity:null,
    _aiComp:null,
    _type:null,
    _winSize:null,
    /*
     Constructor
     */
	ctor:function(enemyType){
		this.init(enemyType);
	},

    /*
     Used to initialize variables
     */
    init:function (enemyType) {
        //var sing = new SingletonFactory();
        var fact = SingletonFactory.getInstance("ASSET");
        this._winSize=cc.director.getWinSize();
        this._phy = new PhysicsComp();
        this._aiComp = new AIComponent();

        if(enemyType=="Bomber")
        {
            this._sprite = fact.getAsset("SPRITE", res.enemy_bomber_png);
            this._sprite._name = "Bomber";
            this._sprite._offset=20;
            this._sprite.setAnchorPoint(new cc.Point(0, 0));

            this._sprite.setPosition(new cc.Point(Math.random()*(400 - 50)+ 50,/*max - min) + min*/ this._winSize.height));
            this._health = 100;
            this._velocity = new cc.Point(- Math.random()*(45 - 10)+10, - Math.random()*(45 - 10)+10);
        }

    },


    /*
     Called whenever enemy is hit by 'type' causing it to lose some amount of health.
     */
	getHit:function(projectileType)
    {

	    if(projectileType == "BULLET")
	    {
	    	this._health = this._health - 5;
		    cc.log(this._health);
	    }
	
	    if(this._health <= 0 )
	    {
		    return true;
	    }
	    else
	    {
		    return false;
	    }
    },

    /*
     Used to move the enemy.
     */
    move:function(dt)
    {
        /*if (this._sprite.y >= 720 || this._sprite.y <= 0 || this._sprite.x <= 0 || this._sprite.x >= 480) {

            this._active = false;
0
        }else*/

        {
           // cc.log(this._velocity);
        //cc.log(this._sprite._name);
            this._aiComp.enemyMovement(this._sprite,this._velocity,dt);
           // cc.log(this._velocity);
            this._phy.moveEuler(this._sprite, this._velocity, dt);
        }

    },


    /*
    * Know the type of enemy
    * */
    getType:function(){}
});
