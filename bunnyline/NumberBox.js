(function() {

    function NumberBox(fill = '#FFFFFF', outline='#000000') {
        this.fill = fill;
        this.outline = outline;
        this.Container_constructor();
        this.make();



    }
    let p = createjs.extend(NumberBox, createjs.Container);



    p.make = function(){
        this.removeAllChildren();

        this.dots = [];
        this.signs = [];
        this.eq = new Octagon('=', "#b5b635ff", "#FFFFFFFF");
        this.spacing = this.eq.dim / 4;
        this.xdim = this.eq.dim * 5 + 6 * this.spacing;
        this.ydim = this.eq.dim * 3 + 4 * this.spacing;
        this.eq.x = 4 * (this.spacing + this.eq.dim) + this.spacing / 2;
        this.eq.y = this.spacing / 2;
        let i;
        for(i = 1; i < 5; i++) {
            let d = new Circle(i, "#b5b635ff", "#FFFFFFFF");
            d.x = this.spacing / 2 + d.dim * i + this.spacing * i;
            d.y = this.spacing / 2 + d.dim + this.spacing;
            this.dots.push(d);
        }
        for(i = 0; i < 5; i++){

            d = new Circle(i+5, "#b5b635ff", "#FFFFFFFF");
            d.x = this.spacing / 2 + d.dim * i + this.spacing * i;
            d.y = this.spacing / 2 + 2 * (this.spacing + d.dim);
            this.dots.push(d);
        }

        let s = new Square('+', "#b5b635ff", "#FFFFFFFF");
        s.x = this.spacing / 2 + s.dim * 2 + this.spacing * 2;
        s.y = this.spacing / 2;
        this.signs.push(s);
        s = new Square('-', "#b5b635ff", "#FFFFFFFF");
        s.x = this.spacing / 2 + s.dim * 3 + this.spacing * 3;
        s.y = this.spacing / 2;
        this.signs.push(s);

        this.g = new createjs.Graphics();
        this.shape = new createjs.Shape(this.g);
        this.shape.resize = function () {};
        this.g.setStrokeStyle(2);
        this.g.beginFill(this.fill);
        this.g.beginStroke(this.outline);
        this.g.drawRect(0, 0, this.xdim, this.ydim);
        //this doesnt work right
        this.x = getCanvDims().w - this.xdim;
        this.y = getCanvDims().h - this.ydim;
        //this.addChild(this.shape);

        for(i = 0; i < this.dots.length; i++){
            this.addChild(this.dots[i]);
        }
        for(i = 0; i < this.signs.length; i++){
            this.addChild(this.signs[i]);
        }
        this.addChild(this.eq);

    };

    p.setSignClick = function(allow){
        for(let i = 0; i < this.signs.length; i++){
            if(allow) {
                if(this.signs[i].clicklistener){
                    this.signs[i].off('click', this.signs[i].clicklistener);
                    this.signs[i].clicklistener = null;
                }
                this.signs[i].clicklistener = this.signs[i].on('click', ns.signclick);
                this.signs[i].cursor = 'pointer'

            }
            else{
                this.signs[i].off('click', this.signs[i].clicklistener);
                this.signs[i].clicklistener = null;
                this.signs[i].cursor = 'default'
            }
        }
    };

    p.setNumClick = function(allow){
        for(let i = 0; i < this.dots.length; i++){
            if(allow) {
                if(this.dots[i].clicklistener){
                    this.dots[i].off('click', this.dots[i].clicklistener);
                    this.dots[i].clicklistener = null;
                }
                this.dots[i].clicklistener = this.dots[i].on('click', ns.distclick);
                this.dots[i].cursor = 'pointer'
            }
            else{
                this.dots[i].off('click', this.dots[i].clicklistener);
                this.dots[i].cursor = 'default';
            }
        }
    };

    p.setEqClick = function(allow){

        if(allow) {
            if(this.eq.clicklistener){
                this.eq.off('click', this.eq.clicklistener);
                this.eq.clicklistener = null;
            }
            this.eq.clicklistener = this.eq.on('click', ns.eqclick);
            this.eq.cursor = 'pointer'
        }
        else{
            this.eq.off('click', this.eq.clicklistener);
            this.eq.cursor = 'default'
        }

    };

    p.draw = function(ctx, ignoreCache) {
        this.Container_draw(ctx, ignoreCache);
        // add custom logic here.
    };

    p.resize = function(event){
        this.make();
        for(let i = 0; i < this.children.length; i++){
            this.children[i].resize();
        }
        this.placeChildren();
    };

    p.placeChildren = function(){

    };
    window.NumberBox = createjs.promote(NumberBox, "Container");
}());
