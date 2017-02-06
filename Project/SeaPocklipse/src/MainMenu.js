/*


 Info ---------------------------------------------------------

 Class - MainMenuLayer : Extends cc.Layer . This class will serve as the Main Screen. Its Layer will render on start of the Game.

    Method Summary :   1. ctor() - Constructor
                       2. init() - Called within ctor(). Used to initialize variables.
                       3. render() - Called within ctor(). Used to display components.
                       4. onNewGame(pSender) - Called on click of New Game Button.
                       5. onSettings(pSender) - Called on click of Options Button.
                       6. onAbout(pSender) - Called on click of About Button.
                       7. registerName() - Registers name in localStorage  via DAO.

    Variable Summary : 1.  _menu - Creates menu that is displayed.


 Class - MainMenuScene : Extends cc.Scene . Creates object of MainMenuLayer and attaches to the scene

       Method Summary   : 1. onEnter() - Gets called when scene in entered.


 --------------------------------------------------------------
 Change LOG ---------------------------------------------------
 2/9/15 - Added Factory object , Moved Sprite calls to AssetFactory.js  (Nishant)
 3/22/15 - added registerName()
 --------------------------------------------------------------
*/
var MainMenuLayer = cc.Layer.extend({
  
  
	_menu:null,
    _uiTextField:null,
    _testMap:{},

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

		this.init(); 
		this.render();
        return true;
    },
	
	
	/*
		init() function used to initialize Layer elements . It gets called in constructor
		
		Added by Nishant 2/7/15
	*/
	init:function()
	{
      // var sing = new SingletonFactory();
		 var fact = SingletonFactory.getInstance("ASSET"); // Factory object
  
		var winSize = cc.director.getWinSize();
	//..................................................Adding Background (By Nishant).............................................................//	
		var background = fact.getAsset("SPRITE",res.bgSea_png);
		 background.setAnchorPoint(new cc.Point(0,0));
	     background.setPosition(new cc.Point(0,0));
		this.addChild(background,0);

        //...........Text box
        var text1 = new  cc.Scale9Sprite();

        this._uiTextField = new cc.EditBox(0.5, text1);
        this._uiTextField.setAnchorPoint(new cc.Point(0,0));
        this._uiTextField.setPosition(new cc.Point(winSize.width / 2 - 70,winSize.height / 2 - 140));
        this._uiTextField.setMaxLength(10);
        this._uiTextField.fontSize = 20;
        this._uiTextField.string = "Enter Name here";
        this._uiTextField.fontName = "Helvetica";

        this.addChild(this._uiTextField,1);

        //.........Background Image for textbox
        var TextBG = fact.getAsset("SPRITE",res.blank_png);
        TextBG.setAnchorPoint(new cc.Point(0,0));
        TextBG.setPosition(new cc.Point(winSize.width / 2 - 95 ,winSize.height / 2 - 150));
        TextBG.scale = SP.SCALE
        this.addChild(TextBG,0);



        //Add Title
        var title =  fact.getAsset("SPRITE",res.title_png);
        title.setAnchorPoint(new cc.Point(0,0));

        title.x = winSize.width / 2 - 200;
        title.y = winSize.height / 2 + 200;
        this.addChild(title,0);


	//...................................................Adding Buttons (By Nishant 2/7/15)...................................................... //
	
		var newGameNormal =   fact.getAsset("SPRITE",res.buttons_png, cc.rect(0, 0, 126, 33));
        var newGameSelected = fact.getAsset("SPRITE",res.buttons_png, cc.rect(0, 33, 126, 33));
        var newGameDisabled = fact.getAsset("SPRITE",res.buttons_png, cc.rect(0, 33 * 2, 126, 33));

        var gameSettingsNormal = fact.getAsset("SPRITE",res.buttons_png, cc.rect(126, 0, 126, 33));
        var gameSettingsSelected = fact.getAsset("SPRITE",res.buttons_png, cc.rect(126, 33, 126, 33));
        var gameSettingsDisabled = fact.getAsset("SPRITE",res.buttons_png, cc.rect(126, 33 * 2, 126, 33));

        var highScoreNormal = fact.getAsset("SPRITE",res.buttons_png, cc.rect(252, 0, 126, 33));
        var highScoreSelected = fact.getAsset("SPRITE",res.buttons_png, cc.rect(252, 33, 126, 33));
        var highScoreDisabled = fact.getAsset("SPRITE",res.buttons_png, cc.rect(252, 33 * 2, 126, 33));



		 var newGame = new cc.MenuItemSprite(newGameNormal, newGameSelected, newGameDisabled, this.onNewGame, this);
         var gameSettings = new cc.MenuItemSprite(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this.onSettings, this);
         var highScore = new cc.MenuItemSprite(highScoreNormal, highScoreSelected, highScoreDisabled, this.onHighScore, this);
         newGame.scale = SP.SCALE;
         gameSettings.scale = SP.SCALE;
        highScore.scale = SP.SCALE;
	//...................................................Added Buttons (By Nishant 2/7/15)...................................................... //
	
	//...................................................Adding Menu (By Nishant 2/7/15) ........................................................//
		this._menu = new cc.Menu(newGame, gameSettings, highScore);
		this._menu.alignItemsVerticallyWithPadding(10);
	
		this._menu.x = winSize.width / 2;
		this._menu.y = winSize.height / 2;
	//...................................................Added Menu (By Nishant 2/7/15) ........................................................//
	},


    /*
     Used to display components.
     */
	render:function()
	{
			this.addChild(this._menu, 1,2);
	},
	
	//.............................................Adding Button Callbacks (By Nishant 2/7/15)..................................................//
	/*
		onNewGame() will be called on click of New Game Button . This will redirect to game level. 
	*/
	onNewGame:function (pSender) {

        if(this._uiTextField.string != "Enter Name here" && this._uiTextField.string != "" )
        {
            cc.log("New Game will start here");
            this.registerName();
            var scene = SingletonFactory.getInstance("GAME");

            //      cc.director.runScene(new cc.TransitionFade(1.2, scene));
            cc.director.runScene( scene);
        }
        else
        {
            alert("Please Enter Name !");
        }

    },
	
	/*
		onSettings() will be called on click of Options Button . This will redirect to Settings menu.
	*/
     onSettings:function (pSender) {
		  cc.log("calling setting");

     },
	 
	 /*
      onHighScore() will be called on click of HighScore Button. This will redirect to About Menu.
	 */
    onHighScore:function (pSender) {
		cc.log("About us content will appear");

        var scene = SingletonFactory.getInstance("HIGHSCORE");

        //      cc.director.runScene(new cc.TransitionFade(1.2, scene));
        cc.director.runScene( scene);

     },
	 //.............................................Added Button Callbacks (By Nishant 2/7/15)..................................................//


    /*
    Call made to DAO here
     */
    registerName:function()
    {
       // var sing = new SingletonFactory();
        var dao = SingletonFactory.getInstance("DAO");



        SP.PlayerName = this._uiTextField.string.toUpperCase();

        var highScore = dao.getHighScore(SP.PlayerName);

        SP.PlayerScore = highScore;


    },

});



var MainMenuScene = cc.Scene.extend({

    /*
     Gets called when scene in entered.
     */
    onEnter:function () {
        this._super();
        var layer = SingletonFactory.getInstance("MAIN");
        this.addChild(layer);
    },
    /*
     Gets called when scene exits.
     */
    onExit:function () {

        this.removeAllChildren();
    }
});

