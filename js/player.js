(function() {


    // spriteSheetImg - the image containing all the frames
    // xFrameRef - the column position starting at 0 in spritesheet where sprite frames start
    // yFrameRef - the row position starting at 0 in spritesheet where sprite frames start
    function Player(spriteSheetImg, xFrameRef, yFrameRef) {
       
        // Player's position
        this.x = 0;
        this.y = 700;
        this.lastX = 0;
        this.lastY = 0;
        this.xFrameRef = xFrameRef || 0;
        this.yFrameRef = yFrameRef || 0; // The starting position of the y sprite frame
        this.width = 64; // width, height - same as sprite
        this.height = 64; 
        this.moveSpeed = 3;
        this.jumpSpeed = 15;
        this.velocityX = 0;
        this.velocityY = 0;
        this.jumping = true;
        this.grounded = false;
        this.health = 100;
        this.hit = 0;
       
        // A player "has a" sprite
        this.sprite = new Sprite(spriteSheetImg, this.xFrameRef, this.yFrameRef, this.width,this.height, 10, 3, false);
        
        // Change the row position in the sprite sheet
        // do show different walk states
        this.dir = 0; // Assign facing values to this
        this.facing = {
            left: 1,
            right: 1,
            jump: 0 ,
            idle:  5       
        };

        this.idle = false;
        this.died = false;
        
    };


    Player.prototype.update = function(deltaTime) {
        if (!player.died) {
        // We transfer the coordinates of the player
        // to it's visual representation (i.e. the sprite)
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        // Include the starting reference along with the row
        // (this sprite sheet has 4 rows, with 3 frames for each direction)
        this.sprite.frameYOffset = this.yFrameRef + this.dir;
       
        // Set the animation idle property
        this.sprite.pauseAnim = this.idle;

       
        // Now make sure the sprite updates
        this.sprite.update(deltaTime);
        }
    }

    Player.prototype.kill = function() {
        this.died == true;
        this.sprite.pauseAnim = true;
        this.y = 1000; 
        this.sprite.numAnimFrames = 0;
    }

    Player.prototype.render = function(context) {
        // Render the visual representation of the player
        if (!player.died) {
        this.sprite.render(context); 
        };           
    }

    // Provide the position and dimensions of a rectangle to compare with player rect
    // Returns true if player intersecting with the given rectangle
    Player.prototype.intersectsWith = function(rectX, rectY, rectWidth, rectHeight) {

        if (rectX < this.x + this.width && this.x < rectX + rectWidth && rectY < this.y + this.height)
            return this.y < rectY + rectHeight;
        else
            return false;
    }

    window.Player = Player;

})();