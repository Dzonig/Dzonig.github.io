(function() {

    function Square(val='', fill="#FFFFFF", outline = "#000000", dim=Math.min(getCanvDims().h, getCanvDims().w)/ 11) {
        this.val = val;
        this.dim = dim;
        this.fill = fill;
        this.outline = outline;
        this.Container_constructor();
        this.make();

    }
    let p = createjs.extend(Square, createjs.Container);


    p.draw = function(ctx, ignoreCache) {
        this.Container_draw(ctx, ignoreCache);
        // add custom logic here.
    };

    p.make = function(){
        this.removeAllChildren();
        this.g = new createjs.Graphics();
        this.shape = new createjs.Shape(this.g);

        this.g.setStrokeStyle(this.dim/20);
        this.g.beginFill(this.fill);
        this.g.beginStroke(this.outline);
        this.rad = this.dim/5;
        this.g.drawRoundRect(0, 0, this.dim, this.dim, this.rad, this.rad, this.rad, this.rad);
        //console.log("dim=" + this.dim);
        this.addChild(this.shape);

        this.text = new createjs.Text(this.val, this.dim / 2 + "px Arial", "#000000" );
        this.text.regX = this.text.regY = 0;
        this.text.textAlign = "center";
        this.text.textBaseline = "middle";
        this.text.x = this.dim / 2; //(this.dim - this.text.getMeasuredWidth()) / 2;
        this.text.y = this.dim / 2; //(this.dim - this.text.getMeasuredHeight()) / 2;
        this.addChild(this.text);
    };

    p.resize = function(dim=Math.min(getCanvDims().h, getCanvDims().w)/ 11){
        this.dim = dim;
        this.make();
    };

    window.Square = createjs.promote(Square, "Container");
}());
