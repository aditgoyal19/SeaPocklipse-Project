/*
 
Date - 2/11/15 

 Info ---------------------------------------------------------

 Class - StatusLayer :  This class will serve as the Status Layer.HUD will be displayed using this layer.


        Method Summary   : 1. ctor() - Constructor
                           2. init() - Called within ctor(). Used to initialize variables.
                           3. render() - Called within ctor(). Used to display components.
                           4. modify(lives, score) - Updates _lives and _score and displays it on screen.
                           5. reint() - To initialize again.
                           6. registerScore() - To Access DAO.
                           7. redirectToMenu() - To provide functionality to redirect to main menu.
                           8. onMenu() - Redirects to main menu.

         Variable Summary : 1. _lives - Stores lives of player.
                            2. _score -  Stores score of player.
                            3. _winSize - Stores size of window.

 --------------------------------------------------------------
 Change LOG ---------------------------------------------------

3/20/15 - Added Game Over state
 3/22/15 - Added reint method
 --------------------------------------------------------------




 */
var StatusLayer = cc.Layer.extend({

	_lives:null,
	_score:null,
    _finalScore:0,
    _highScore:null,
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
     Used to initialize variables
     */
    init:function () {
		this._super();

        this._winSize = cc.director.getWinSize();

		this._lives = new cc.LabelTTF("Lives:3", "Helvetica", 14);
        this._lives.setColor(cc.color(0,0,0));//black color
        this._lives.setPosition(cc.p(70, this._winSize.height - 20));
       
        this._highScore = new cc.LabelTTF("High Score:"+SP.PlayerScore, "Helvetica", 14);
        this._highScore.setColor(cc.color(0,0,0));//black color
        this._highScore.setPosition(cc.p(this._winSize.width / 2 , this._winSize.height - 20));

        this._score = new cc.LabelTTF("Score:0", "Helvetica", 14);
        this._score.setPosition(cc.p(this._winSize.width - 70, this._winSize.height - 20));
        this._score.setColor(cc.color(0,0,0));//black color

	
    },


    /*
     Used to display components.
     */
	render:function()
	{
		 this.addChild(this._lives);
         this.addChild(this._highScore);
		 this.addChild(this._score);


		
	},
	
	
	/*
	    Gets called from subscriber to update _lives and _score.
	    lives contains the number of lives that ship has .
	    score contains the number of enemies that ship has shot down.
	 */
	modify:function(lives,score , gameOver)
	{

        if(gameOver == 0)
        {

            this.removeChild(this._lives);
            this.removeChild(this._highScore);
            this.removeChild(this._score);


            this._lives = new cc.LabelTTF("Lives:"+lives, "Helvetica", 14);
            this._lives.setColor(cc.color(0,0,0));//black color
            this._lives.setPosition(cc.p(70, this._winSize.height - 20));


            this._score = new cc.LabelTTF("Score:"+score, "Helvetica", 14);
            this._score.setPosition(cc.p(this._winSize.width - 70, this._winSize.height - 20));
            this._score.setColor(cc.color(0,0,0));//black color

            this.render();
        }
        else
        {

                this._finalScore = score;

                var text ;

                if(gameOver == 1)
                    text = "GAME OVER";
                else
                    text = "LEVEL COMPLETE";

                var  ends = new cc.LabelTTF(text, "Helvetica", 40);
                ends.setColor(cc.color(0,0,0));//black color
                ends.setPosition(cc.p(this._winSize.width/ 2 , this._winSize.height / 2 + 200));

                this.addChild(ends);

                this.redirectToMenu();


        }





	},


    /*
        provides button to redirect to main menu
     */
    redirectToMenu:function()
    {
        this.registerScore();
        var fact = SingletonFactory.getInstance("ASSET"); // Factory object



        var playNormal = fact.getAsset("SPRITE",res.buttons_png, cc.rect(378, 0, 126, 33));
        var playSelected = fact.getAsset("SPRITE",res.buttons_png, cc.rect(378, 33, 126, 33));
        var playDisabled = fact.getAsset("SPRITE",res.buttons_png, cc.rect(378, 33 * 2, 126, 33));

        var about = new cc.MenuItemSprite(playNormal, playSelected, playDisabled, this.onMenu, this);

        about.scale = SP.SCALE;

        this._menu = new cc.Menu(about);
        this._menu.alignItemsVerticallyWithPadding(10);

        this._menu.x = this._winSize.width / 2;
        this._menu.y = (this._winSize.height / 2) - 100 ;

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
     Call made to DAO here to save score
     */
    registerScore:function()
    {
        //var sing = new SingletonFactory();
        var dao = SingletonFactory.getInstance("DAO");

        dao.setHighScore(SP.PlayerName,this._finalScore);

    }
	


});

