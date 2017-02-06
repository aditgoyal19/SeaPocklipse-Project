/*
 

 Info ---------------------------------------------------------

 Class - GameScene :  This class will serve as the Main Screen. Its Layer will render on start of the Game.
                      Creates object of BackgroundLayer , AnimationLayer , StatusLayer  and attaches to the scene.

         Method Summary   : 1. onEnter() - Gets called when scene in entered.

 --------------------------------------------------------------
 Change LOG ---------------------------------------------------
3/20/15 - Adding onExit function

 --------------------------------------------------------------


*/


//
var GameScene = cc.Scene.extend({

    _bLayer:null,
    _aLayer:null,
    _sLayer:null,
    _instanceCount:0,
    /*
        Gets called when scene in entered.
     */
    onEnter:function () {
        this._super();
		
		//var sing = new SingletonFactory();
        this._bLayer =  SingletonFactory.getInstance("BGROUND");//new BackgroundLayer();
        this._aLayer =  SingletonFactory.getInstance("ANIMATION");
        this._sLayer =  SingletonFactory.getInstance("STATUS");

        if(this._instanceCount > 0)
        {
            this._bLayer.reint();
            this._aLayer.reint();
            this._sLayer.reint();
        }



        this._aLayer.subscribe(this._sLayer);
        
		this.addChild(this._bLayer, 0);
		this.addChild(this._aLayer, 1);
		this.addChild(this._sLayer, 2);


    },

    /*
    To remove all layers
    */
    onExit:function()
    {

        this._bLayer.cleanUp();
        this._aLayer.cleanUp();
        this._instanceCount++;
        this.removeAllChildren();
    }
});
