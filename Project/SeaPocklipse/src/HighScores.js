/*
 

 Info ---------------------------------------------------------

 Class - HighScoreScene :  This class serves as base on which HighScoreLayer is rendered.
 Method Summary   : 1. onEnter() - Gets called when scene in entered.

 Class - HighScoreLayer :  This class will display top20 highscores.

    Method Summary   : 1. ctor() - Constructor
                       2. init() - Called within ctor(). Used to initialize variables.
                       3. render() - Called within ctor(). Used to display highScore list.
                       4. reint() - To initialize again.
                       5. onMenu() - Redirects to main menu.
                       6. getKeyByValue(value) - To return Key of 'value'
                       7. processMap() - processes the given map to fill up _scoreNames and _scoreValues in sorted manner

    Variable Summary :
                       1. _scoreMap - stores map
                       2. _scoreNames - array of map keys
                       3. _scoreValues - array of map values
 --------------------------------------------------------------
 Change LOG ---------------------------------------------------
4/1/15 - Added button and improved logic so that highscores are displayed in descending order of the score

 --------------------------------------------------------------


 */

var HighScoreLayer = cc.Layer.extend({


    _scoreMap:{},
    _scoreNames:[],
    _scoreValues:[],

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
        //this.init();
        this.render();
    },

    /*
     Used to initialize variables
     */
    init:function () {
       // this._super();

        //Fetch Map from Server
        var network = SingletonFactory.getInstance("NETWORK");
        this._scoreMap = network.getHighScoreList();

        cc.log("From Redis");
        cc.log(this._scoreMap);
        this.processMap();
    },


    /*
     Used to display components.
     */
    render:function()
    {
        // var sing = new SingletonFactory();
        var fact = SingletonFactory.getInstance("ASSET"); // Factory object

        var winSize = cc.director.getWinSize();
        //..................................................Adding Background (By Nishant).............................................................//
        var background = fact.getAsset("SPRITE",res.bgSea_png);
        background.setAnchorPoint(new cc.Point(0,0));
        background.setPosition(new cc.Point(0,0));
        this.addChild(background, 0);


        //Headers
        var rank = new cc.LabelTTF("Rank", "Helvetica", 24);
        rank.setColor(cc.color(0,0,0));//black color
        rank.setPosition(cc.p(70, (winSize.height - 30)));
        this.addChild(rank, 1);

        var playerName = new cc.LabelTTF("Player", "Helvetica", 24);
        playerName.setColor(cc.color(0,0,0));//black color
        playerName.setPosition(cc.p(winSize.width / 2 , (winSize.height - 30)));
        this.addChild(playerName, 1);

        var score = new cc.LabelTTF("Score", "Helvetica", 24);
        score.setPosition(cc.p(winSize.width - 70, (winSize.height - 30)));
        score.setColor(cc.color(0,0,0));//black color
        this.addChild(score, 1);


        var count = 0;
        while(count < 20 && count < this._scoreNames.length){
            //key will be -> 'id'
            //dictionary[key] -> 'value'

            var rank = new cc.LabelTTF(count+1, "Helvetica", 18);
            rank.setColor(cc.color(0,0,0));//black color
            rank.setPosition(cc.p(70, (winSize.height - 60)- (30 * count)));
            this.addChild(rank, 1);

            var playerName = new cc.LabelTTF(this._scoreNames[count], "Helvetica", 18);
            playerName.setColor(cc.color(0,0,0));//black color
            playerName.setPosition(cc.p(winSize.width / 2 , (winSize.height - 60) - (30 * count)));
            this.addChild(playerName, 1);

            var score = new cc.LabelTTF(this._scoreValues[count], "Helvetica", 18);
            score.setPosition(cc.p(winSize.width - 70, (winSize.height - 60)- (30 * count)));
            score.setColor(cc.color(0,0,0));//black color
            this.addChild(score, 1);
            count++;
        }


        //Render Back Button
        var fact = SingletonFactory.getInstance("ASSET"); // Factory object



        var backNormal = fact.getAsset("SPRITE",res.buttons_png, cc.rect(504, 0, 126, 33));
        var backSelected = fact.getAsset("SPRITE",res.buttons_png, cc.rect(504, 33, 126, 33));
        var backDisabled = fact.getAsset("SPRITE",res.buttons_png, cc.rect(504, 33 * 2, 126, 33));

        var about = new cc.MenuItemSprite(backNormal, backSelected, backDisabled, this.onMenu, this);

        about.scale = SP.SCALE;

        this._menu = new cc.Menu(about);
        this._menu.alignItemsVerticallyWithPadding(10);

        this._menu.x = winSize.width / 2;
        this._menu.y = 50 ;

        this.addChild(this._menu, 1,2);
    },

    /*
     gets caleed on click of play again . Redirects to main menu
     */
    onMenu:function()
    {

        var menu = new MainMenuScene();
        this.removeAllChildren();
        cc.director.runScene( menu);
        //this._parent.destroy();
    },

    /*
    To process the map so that we get sorted scores
     */
    processMap:function()
    {
        for(key in this._scoreMap)
        {
            this._scoreValues.push(this._scoreMap[key]);

        }

        this._scoreValues.sort(function(a, b){return b-a}); //Sort in descending order
        cc.log(this._scoreValues);

        //Get list of corresponding keys
        for(var i = 0; i < this._scoreValues.length ; i++)
        {
            this._scoreNames.push(this.getKeyByValue(this._scoreValues[i]));
        }
        cc.log(this._scoreNames);

    },


    /*
    Helper function that returns key of given 'value'
     */
    getKeyByValue:function(value)
    {
        for( var key in this._scoreMap ) {
            if( this._scoreMap.hasOwnProperty( key ) ) {
                if( this._scoreMap[ key ] === value )
                    return key;
            }
        }
    },
});




var HighScoreScene = cc.Scene.extend({
    _instanceCount:0,
    /*
     Gets called when scene in entered.
     */
    onEnter:function () {
        this._super();
        var layer = SingletonFactory.getInstance("HIGHLAYER");


        if(this._instanceCount > 0)
        {
            layer.reint();
        }
        this.addChild(layer);

    },
    /*
     Gets called when scene exits.
     */
    onExit:function () {

        this._instanceCount++;
        this.removeAllChildren();
    }
});