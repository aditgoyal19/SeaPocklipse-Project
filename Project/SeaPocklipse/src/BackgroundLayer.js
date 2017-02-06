/*


 Info ---------------------------------------------------------

 Class - BackgroundLayer : Extends cc.Layer. Used for scrolling of background

        Method Summary   : 1. ctor() - Constructor
                           2. init() - Called within ctor(). Used to initialize variables.
                           3. render() - Called within ctor(). Used to display components.
                           4. update(dt) - Scheduled to call every frame. Used for scrolling background.
                           5. reint() - To initialize again.

         Variable Summary : 1. _bgSprite1 - Stores background Sprite 1.
                            2. _bgSprite2 - Stores background Sprite 2.
                            3. _winSize - Stores window size.

 --------------------------------------------------------------
 Change LOG ---------------------------------------------------
 2/10/15 - Made new method render() which will add components to layer.
 3/21/15 - Added Clean up code
 3/22/15 - Added reint method
 --------------------------------------------------------------

*/
var BackgroundLayer = cc.Layer.extend({

	_bgSprite1:null,
	_bgSprite2:null,
	_winSize:null,

    /*
     Constructor
     */
    ctor:function(){
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
     Used to initialize variables.
     */
    init:function () {
    this._super();
	this._winSize = cc.director.getWinSize();
	 
	//var sing = new SingletonFactory();
	var fact = SingletonFactory.getInstance("ASSET"); // Factory object
	   
	this._bgSprite1 = fact.getAsset("SPRITE",res.bgSea_png);
	this._bgSprite1.setAnchorPoint(new cc.Point(0,0));
	this._bgSprite1.setPosition(new cc.Point(0,0));
        
	  
	 this._bgSprite2 = fact.getAsset("SPRITE",res.bgSea_png);
	 this._bgSprite2.setAnchorPoint(new cc.Point(0,0));
	 this._bgSprite2.setPosition(new cc.Point(0,this._winSize.height));

	 
	  var scrollAction1 = new cc.RepeatForever(new cc.MoveBy(14.0,new cc.Point(0, -this._winSize.height)));
	  var scrollAction2 = new cc.RepeatForever(new cc.MoveBy(14.0,new cc.Point(0, -this._winSize.height)));


	 this._bgSprite1.runAction(scrollAction1);
	 this._bgSprite2.runAction(scrollAction2);
	 
	 this.scheduleUpdate();
    },


    /*
     Used to display components.
     */
	render:function()
	{
		this.addChild(this._bgSprite1, 0);	
		this.addChild(this._bgSprite2, 0);	  
	 
	},


    /*
     Gets called every frame . Essentially used to reposition background images if it has scrolled out of window.
     */
	update:function(dt)
	{
		if(this._bgSprite1.y <= -this._winSize.height)
		{
			 this._bgSprite1.setPosition(new cc.Point(0,this._winSize.height));
			
		}
		
		if(this._bgSprite2.y <= -this._winSize.height)
		{
			 this._bgSprite2.setPosition(new cc.Point(0,this._winSize.height));
			
		}
		
		
	},

    /*
    Clean-up
     */
    cleanUp:function()
    {
        this.removeAllChildren();
    }



});

