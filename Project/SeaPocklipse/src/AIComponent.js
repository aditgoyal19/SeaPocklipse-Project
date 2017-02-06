/**
 * 
 This Class will provide the Artificial Intelligence for the Game.
 The movement Of enemy planes will be calculated here

        Method Summary   : 1. ctor(): Constructor
                           2. enemyMovement(): To select the type of enemy and its related AI behaviour
                           3. bomberMove(): Called From enemyMovement to make The bomber enemy move in random path.

                           TO BE IMPLEMENTED
                           4. enemyAttack(): Enemy Bombing or bullets according to the position of Player and Enemy
                           5. difficultyControl():  Changing the Difficulty of levels according to the time the player stays in game.
                           6.  checkEnemyState(): Checkng if enemies is moving or Shooting

       Variable Summary : 1. _phy : To call the Physics Component
                          2. enemyType : To know the type of enemy for AI behaviour to be implemented
                          3. velocity  : To pass the velocity of Enemy Baomber
                          4. dt        : Time interval
                          5. spriteObj : To Know the Position of the Sprite Object Passed from Calling Methods


 --------------------------------------------------------------
 */


var AIComponent=cc.Class.extend({


    /*
    * Set initial Properties
    * */
ctor:function()
{

  _phy=  new PhysicsComp();



},

/*
     * Controlling the Enemies Movement according to its type
     * */

    enemyMovement: function (enemyType,velocity,dt)
    {


        if(enemyType._name=="Bomber")
        {
            this.bomberMove(enemyType,velocity,dt)
        }


    },

    /*
     * Enemy Bombing or bullets according to the position of Player and Enemy
     * */

    enemyAttack: function (enemyType, enemyPos, playerPos)
    {


    },
    /*
     * Changing the Difficulty of levels according to the time the player stays in game.
     *
     *
     * */
    difficultyControl: function (playerObj)
    {


    },
    /**
     * Checkng if enemies is moving or Shooting
     * **/

    checkEnemyState:function()
    {




    },
/*
* calling for bomber movement
* */
bomberMove:function(spriteObj,velocity,dt) {



        if (spriteObj.y >= 720) {
            velocity.y = -10;
            //_phy.moveEuler(spriteObj, velocity, dt);
        }
        else if (spriteObj.y <= 400) {
            velocity.y = 10;
           // this._velocity.y = 10;
           // _phy.moveEuler(spriteObj, this._velocity, dt);
        }
        else if (spriteObj.x >= 400) {
            velocity.x = -10;
            //this._velocity.x = -10;
           // _phy.moveEuler(spriteObj, this._velocity, dt);
        }
        else if (spriteObj.x <= 0) {
            velocity.x = 10;
           // this._velocity.x = 10;
           // _phy.moveEuler(spriteObj, this._velocity, dt);
        }
        else {
           // _phy.moveEuler(spriteObj, this._velocity, dt);
        }
    }

});
