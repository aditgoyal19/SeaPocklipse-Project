/*
 
 Info - This class will serve as the Data Access Object .Job of persisting data will be carried out by this Class

 Info ---------------------------------------------------------

 Class - DAO :  Persisting data

 Method Summary   : 1. ctor() - Constructor
                    2. init() - Called within ctor(). Used to initialize .
                    3.  setHighScore(playerId, score) . Used to set highscore of a playerid , If playerId exists and existing score is smaller then it is updated.
                    4.  getHighScore(playerId) . Fetches Highscore of a playerId.


Variable Summary :
                   1. _playerMap : A map that will fetch Player data from


 --------------------------------------------------------------
 Change LOG ---------------------------------------------------
 3/31/2015 - New HighScore published to server
 --------------------------------------------------------------
 */

var DAO = cc.Layer.extend({
    _playerMap:{},

    /*
     Constructor
     */
    ctor:function(){
        this.init();
    },

    /*
     Used to initialize and load database.
     */
    init:function(){
       //cc.sys.localStorage.removeAllItems();

        var data = null ;



        if(!(cc.sys.localStorage.getItem("Player") === null))
        {
            data = cc.sys.localStorage.getItem("Player");
        }


        if( data != null && data != "undefined") {
            this._playerMap = JSON.parse(data);
        }else
        {
            cc.sys.localStorage.setItem("Player", JSON.stringify(this._playerMap));
        }


    },

    /*
     Used to set highscore of a playerid , If playerId exists and existing score is smaller then it is updated.
     */
     setHighScore:function(playerId, score)
     {

         if((score != null ))
         {
             var currentScore = this._playerMap[playerId];

             if((currentScore != undefined && currentScore < score) || currentScore == undefined)
             {
                this._playerMap[playerId] = score;
                cc.sys.localStorage.setItem("Player", JSON.stringify(this._playerMap));


                 //New HighScore... Let the world know about this
                 var network = SingletonFactory.getInstance("NETWORK");
                 network.publishHighScore(playerId, score);
             }


         }



     },

    /*
     . Fetches Highscore of a playerId.
     */
     getHighScore:function(playerId)
     {
         if(this._playerMap[playerId] != undefined)
         {
             return this._playerMap[playerId];
         }else
         {
             return 0;
         }

     },

});