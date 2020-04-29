(function() {

    function Carrot(showdisk=false, rotation=90) {
        this.Container_constructor();
        this.showdisk=showdisk;
        this.carrotrot = rotation;
        this.make();
        this.loc = 7;
        this.setBounds(this.x, this.y, 0, 0);

    }


    let p = createjs.extend(Carrot, createjs.Container);

    p.make = function(){
        this.dim = Math.min(getCanvDims().h, getCanvDims().w)/ 11;
        this.removeAllChildren();
        let parent = this;
        let carrotimg = new Image();
        carrotimg.src = './resources/carrot.svg';
        carrotimg.onload = function(){
            let t = new createjs.Bitmap(carrotimg);
            t.resize = function(){
                const dim = Math.min(getCanvDims().h, getCanvDims().w)/ 11 / 1.1;
                t.scale = dim / Math.max(t.image.height, t.image.width);
                parent.setBounds(parent.x, parent.y, t.image.width * t.scale, t.image.height * t.scale);
                parent.regX = parent.dim / 2;
                parent.regY = parent.dim / 2;
                t.x = parent.dim - (t.scale * t.image.width) / 8;
                t.y = parent.dim / 2 - t.scale * t.image.width / 2;
                t.rotation = parent.carrotrot;

                //t.y = parent.dim / 2;
                //parent.x = getCanvDims().w / 2;
                //parent.y = getCanvDims().h / 2;
                //console.log("Height fill");



            };
            t.resize();
            parent.carrotimg = t;
            parent.addChild(parent.carrotimg);
            //parent.addChildAt(parent.background, 0);
        };

        this.g = new createjs.Graphics();
        this.disk = new createjs.Shape(this.g);

        this.g.setStrokeStyle(this.dim/20);
        this.g.beginFill("#FFFFFFFF");
        this.g.beginStroke("#ccccccff");
        this.g.drawEllipse(0, 0, this.dim, this.dim);
        //console.log("dim=" + this.dim);
        //console.log(this);
        //this.addChild(this.disk);
        this.disk.x = 0;
        this.disk.y = 0;
        if(this.showdisk){
            this.addChildAt(this.disk, 0);
        }
        if(this.loc){
            this.placeCarrot(nl.locations[this.loc - 1]);
        }
    };

    p.draw = function(ctx, ignoreCache) {
        this.Container_draw(ctx, ignoreCache);
        // add custom logic here.


    };
    p.resize = function(){
        this.make();
    };

    p.placeCarrot = function(loc){
        this.x = loc.x;
        this.y = loc.y;
        this.loc = parseInt(loc.val);
    };

    p.randomCarrotLoc = function(bunnyloc, start=1, end=10){
        let loc = Math.floor(Math.random() * 10);
        while(loc === bunnyloc){
            loc = Math.floor(Math.random() * 10);
        }
        return loc;
    };

    window.Carrot = createjs.promote(Carrot, "Container");
}());