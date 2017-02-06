/*

Date - 2/8/15 
Info ---------------------------------------------------------

Class - SingletonFactory : Ensures that single instance of objects are used . Serves as a factory of singleton objects.

        Method Summary   : 1. getInstance(type) - Gets singleton instance of 'type'

        Variable Summary : 1. _assetFact - Singleton for class AssetFactory.
                           2. _main - Singleton for MainMenuLayer.
                           3. _status - Singleton for StatusLayer.
                           4. _animation - Singleton for AnimationLayer.
                           5. _bground - Sinlgeton for BackgroundLayer.
                           6._dao = Singleton for DAO.
                           7._game = Singleton for GameScene.

Class - AssetFactory : Serves as factory for all assets (png , mp3)

        Method Summary : 1. getAsset(type, key, rectInfo) - Gets Asset of 'type' based on 'key' and 'rectInfo'.

        Variable Summary : 1.  _sprite - Gets initialized with a sprite object and returned in getAsset().



--------------------------------------------------------------
Change LOG ---------------------------------------------------
3/10/15 - Adhering to common coding convention
3/22/15 - Made getInstance static
--------------------------------------------------------------

*/

var SingletonFactory = cc.Class.extend({
	 _assetFact:null,
     _game:null,
	 _main:null,
     _highScore:null,
    _highScoreLayer:null,
	 _status:null,
	 _animation:null,
	 _bground:null,
    _dao:null,
    _network:null,



     
    
});

/*
 Returns an instance based on parameter 'type'. Static method
 */

SingletonFactory.getInstance = function (type){
    if(type == "ASSET")
    {
        if (!this._assetFact) {
            this._assetFact = new AssetFactory();//createInstance();
        }
        return this._assetFact;
    }
    else if(type == "STATUS")
    {
        if (!this._status) {
            this._status = new StatusLayer();
        }
        return this._status;
    }
    else if(type == "ANIMATION")
    {
        if (!this._animation) {
            this._animation = new AnimationLayer();
        }
        return this._animation;
    }
    else if(type == "BGROUND")
    {
        if (!this._bground) {
            this._bground = new BackgroundLayer();
        }
        return this._bground;
    }
    else if(type == "MAIN")
    {
        if(!this._main){
            this._main = new MainMenuLayer();
        }
        return this._main;
    }
    else if(type == "GAME")
    {
        if(!this._game){
            this._game = new GameScene();
        }
        return this._game;
    }
    else if(type == "DAO")
    {
        if(!this._dao){
            this._dao = new DAO();
        }
        return this._dao;
    }
    else if(type == "NETWORK")
    {
        if(!this._network){
            this._network = new NetworkComp();
        }
        return this._network;
    }
    else if(type == "HIGHSCORE")
    {
        if(!this._highScore){
            this._highScore = new HighScoreScene();
        }
        return this._highScore;
    }
    else if(type == "HIGHLAYER")
    {
        if(!this._highScoreLayer){
            this._highScoreLayer = new HighScoreLayer();
        }
        return this._highScoreLayer;
    }
}

var AssetFactory = cc.Class.extend({
   _sprite : null,



    /*
     Returns an asset based on parameter 'key' and 'rectInfo'.
     key corresponds to the key defined in resource.js and rectInfo specifies the part of image
     */
   getAsset:function(type, key, rectInfo){

	if(type == "SPRITE")
	{

        if(key == undefined)
        {
            this._sprite = new cc.Sprite();
        }
        else
        {
            if (rectInfo == undefined) {
                this._sprite = new cc.Sprite(key);
            }
            else {
                this._sprite = new cc.Sprite(key, rectInfo);
            }
        }

	}
  
	return this._sprite;
	}




});

