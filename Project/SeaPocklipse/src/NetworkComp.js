/*
 
 Date - 3/31/15

 Info ---------------------------------------------------------

 Class - NetworkComp :  This class will serve as the network component of the Game. All calls to python server will be made using this class
 Method Summary   : 1. ctor() - Constructor
 2. init() - Called within ctor(). Used to initialize variables.
 3. render() - Called within ctor(). Used to display components.
 4. publishHighScore(playerName, highScore) - Used to set HighScore using playerName as key and highScore as value. Called from Status Layer.
 5. getHighScoreList:function() - Used to fetch top20 highScores . Called in HighScore Page


 Variable Summary : 1. _ship - Stores object of Player class.
 1. _thriftClient - Will act as client . All calls to server will be made using this variable


 --------------------------------------------------------------
 Change LOG ---------------------------------------------------

 --------------------------------------------------------------
 */

var NetworkComp  = cc.Class.extend({
    _thriftClient:null,

    /*
     Constructor
     */
    ctor:function(){
        this.init();
    },


    /*
     _thriftClient gets initialized here so that it can be used later
     */
    init:function(){
        try {
            var transport = new Thrift.Transport("http://localhost:30303//pythonService/redisService");
            var protocol = new Thrift.Protocol(transport);

            this._thriftClient = new LeaderboardClient(protocol);
        }catch(ouch){
            cc.log("Problem!!! while initializing thrift");
        }
    },

    /*
        Used to set HighScore using playerName as key and highScore as value
     */
    publishHighScore:function(playerName, highScore)
    {
        try {
            this._thriftClient.setHighScore(playerName, highScore);
        }catch(ouch){
            cc.log("Problem!!! while setting highScore");
        }
    },

    /*
        used to fetch List of HighScores top20
     */
    getHighScoreList:function()
    {
        try {
            return this._thriftClient.getTop20();
        }catch(ouch){
            cc.log("Problem!!! while fetching highScore list");
        }
    },
});