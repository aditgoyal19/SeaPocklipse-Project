/*

Date - 2/20/15 

 Info ---------------------------------------------------------

 Class - PhysicsComp :  This is the physics Component for Seapocklipse.

        Method Summary   : 1. checkForCollision(sprite1, sprite2) - Called to check for collision between two sprite objects.
                           2. createCollisionBox(sprite) - This function gets a bounding box for sprite.
                           3. collisionFunction:function(spriteRectA , spriteRectB) - Collision between two bounding boxes are checked here.
                           4. moveEuler(sprite, velocity, dt) - Performs Velocity Euler integration .


 --------------------------------------------------------------
 Change LOG ---------------------------------------------------
 --------------------------------------------------------------
 */

var PhysicsComp  = cc.Class.extend({


    /*
     Called to check for collision between two sprite objects.
     */
    checkForCollision:function(spriteObjA , spriteObjB)
    {

        var BoxA =  this.createCollisionBox(spriteObjA);
        var BoxB =  this.createCollisionBox(spriteObjB);


        //run collison function;
        return this.collisionFunction(BoxA, BoxB);

    },


    /*
     This function gets a bounding box for sprite.
     */
    createCollisionBox:function(spriteObj)
    {
    //--03/06/15
    //calculating max and min extents
        var texWidth = spriteObj.getTextureRect().width;
        var texHeight = spriteObj.getTextureRect().height;

        var centerX = spriteObj.x;
        var centerY = spriteObj.y;

        x_Extentent_max = spriteObj.x + texWidth/2;
        x_Extentent_min = spriteObj.x - texWidth/2;

        y_Extentent_max = spriteObj.y + texHeight/2;
        y_Extentent_min = spriteObj.y - texHeight/2;

        return  new cc.Rect(centerX, centerY, texWidth, texHeight);

    },


    /*
     Collision between two bounding boxes spriteRectA , spriteRectB are checked here.
     */
     collisionFunction:function(spriteRectA , spriteRectB)
     {

            if (spriteRectA.x < spriteRectB.x + spriteRectB.width
                && spriteRectA.x + spriteRectA.width > spriteRectB.x
                && spriteRectA.y < spriteRectB.y + spriteRectB.height
                && spriteRectA.height + spriteRectA.y > spriteRectB.y)
            {
                return true;
            }
            else
            {
                return false;
            }

        },


     /*
     Performs Velocity Euler integration .
      sprite - Sprite Object
      velocity - Velocity
      dt - deltaTime
      */
      moveEuler:function(sprite, velocity, dt)
      {
            sprite.x = sprite.x + (velocity.x ) * dt;
            sprite.y = sprite.y + (velocity.y ) * dt;
      }

});
