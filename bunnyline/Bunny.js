(function() {

    function Bunny() {
        this.Container_constructor();
        this.make();
        this.loc = 5;
        this.setBounds(this.x, this.y, 0, 0);

    }


    let p = createjs.extend(Bunny, createjs.Container);

    p.make = function(){
        this.removeAllChildren();
        let parent = this;
        let defbunrightside = new Image();
        defbunrightside.src = './resources/bunnydefaultrightside.svg';
        defbunrightside.onload = function(){
            let t = new createjs.Bitmap(defbunrightside);
            t.resize = function(){
                const dim = Math.min(getCanvDims().h, getCanvDims().w)/ 8;
                parent.scaleX = parent.scaleY = dim / Math.min(Math.abs(t.image.width), Math.abs(t.image.height));
                parent.setBounds(parent.x, parent.y, Math.abs(t.image.width) * parent.scaleY, t.image.height * parent.scaleY);
                parent.regX = t.scaleY * Math.abs(t.image.width) / 2;
                parent.regY = t.scaleY * t.image.height;
                //parent.x = getCanvDims().w / 2;
                //parent.y = getCanvDims().h / 2;
                //console.log("Height fill");



            };
            t.resize();
            parent.defbunrightside = t;
            //parent.addChildAt(parent.background, 0);
        };

        let defbunleftside = new Image();
        defbunleftside.src = './resources/bunnydefaultleftside.svg';
        defbunleftside.onload = function(){
            let t = new createjs.Bitmap(defbunleftside);
            t.resize = function(){
                const dim = Math.min(getCanvDims().h, getCanvDims().w)/ 8;
                // noinspection JSSuspiciousNameCombination
                parent.scaleX = parent.scaleY = dim / Math.min(Math.abs(t.image.height), Math.abs(t.image.width));
                parent.setBounds(parent.x, parent.y, Math.abs(t.image.width) * parent.scaleY, t.image.height * parent.scaleY);
                parent.regX = t.scaleY * Math.abs(t.image.width) / 2;
                parent.regY = t.scaleY * t.image.height;
                //parent.x = getCanvDims().w / 2;
                //parent.y = getCanvDims().h / 2;
                //console.log("Height fill");



            };
            t.resize();
            parent.defbunleftside = t;
            //parent.addChildAt(parent.background, 0);
        };

        let defbunfnt = new Image();
        defbunfnt.src = './resources/bunnydefaultfront.svg';
        defbunfnt.onload = function(){
            let t = new createjs.Bitmap(defbunfnt);
            t.resize = function(){
                const dim = Math.min(getCanvDims().h, getCanvDims().w)/ 8;
                parent.scale = dim / Math.min(t.image.height, t.image.width);
                parent.setBounds(parent.x, parent.y, t.image.width * parent.scale, t.image.height * parent.scale);
                parent.regX = t.scale * t.image.width / 2;
                parent.regY = t.scale * t.image.height;
                //parent.x = getCanvDims().w / 2;
                //parent.y = getCanvDims().h / 2;
                //console.log("Height fill");



            };
            t.resize();
            parent.defbunfnt = t;
            if(parent.children.length === 0 && !parent.status){
                parent.setDefaultFront();
            }
            //parent.addChild(parent.defbunfnt);
            //parent.addChildAt(parent.background, 0);
        };

        let sadbun= new Image();
        sadbun.src = './resources/bunnysad.svg';
        sadbun.onload = function(){
            let t = new createjs.Bitmap(sadbun);
            t.resize = function(){
                const dim = Math.min(getCanvDims().h, getCanvDims().w)/ 8;
                parent.scale = dim / Math.min(t.image.height, t.image.width);
                parent.setBounds(parent.x, parent.y, t.image.width * parent.scale, t.image.height * parent.scale);
                parent.regX = t.scale * t.image.width / 2;
                parent.regY = t.scale * t.image.height;

                //console.log("Height fill");
            };

            parent.sadbun = t;
            if(parent.status === 'sad'){
                parent.setSad();
            }
        };

        let happybun= new Image();
        happybun.src = './resources/bunnyhappy.svg';
        happybun.onload = function(){
            let t = new createjs.Bitmap(happybun);
            t.resize = function(){
                const dim = Math.min(getCanvDims().h, getCanvDims().w)/ 8;
                parent.scale = dim / Math.min(t.image.height, t.image.width);
                parent.setBounds(parent.x, parent.y, t.image.width * parent.scale, t.image.height * parent.scale);
                parent.regX = t.scale * t.image.width / 2;
                parent.regY = t.scale * t.image.height;

                //console.log("Height fill");
            };

            parent.happybun = t;
            if(parent.status === 'happy'){
                parent.setHappy();
            }
        };

        let hopbunfront= new Image();
        hopbunfront.src = './resources/bunnyhopfront.svg';
        hopbunfront.onload = function(){
            let t = new createjs.Bitmap(hopbunfront);
            t.resize = function(){
                const dim = Math.min(getCanvDims().h, getCanvDims().w)/ 8;
                parent.scale = dim / Math.min(t.image.height, t.image.width);
                parent.setBounds(parent.x, parent.y, t.image.width * parent.scale, t.image.height * parent.scale);
                parent.regX = t.scale * t.image.width / 2;
                parent.regY = t.scale * t.image.height;

                //console.log("Height fill");
            };

            parent.hopbunfront = t;

        };

        let hopbunrightside= new Image();
        hopbunrightside.src = './resources/bunnyhoprightside.svg';
        hopbunrightside.onload = function(){
            let t = new createjs.Bitmap(hopbunrightside);
            t.resize = function(){
                const dim = Math.min(getCanvDims().h, getCanvDims().w)/ 8;
                parent.scale = dim / Math.min(t.image.height, t.image.width);
                parent.setBounds(parent.x, parent.y, t.image.width * parent.scale, t.image.height * parent.scale);
                parent.regX = t.scale * t.image.width / 2;
                parent.regY = t.scale * t.image.height;

                //console.log("Height fill");
            };

            parent.hopbunrightside = t;

        };

        let hopbunleftside= new Image();
        hopbunleftside.src = './resources/bunnyhopleftside.svg';
        hopbunleftside.onload = function(){
            let t = new createjs.Bitmap(hopbunleftside);
            t.resize = function(){
                const dim = Math.min(getCanvDims().h, getCanvDims().w)/ 8;
                parent.scale = dim / Math.min(t.image.height, t.image.width);
                parent.setBounds(parent.x, parent.y, t.image.width * parent.scale, t.image.height * parent.scale);
                parent.regX = t.scale * t.image.width / 2;
                parent.regY = t.scale * t.image.height;

                //console.log("Height fill");
            };

            parent.hopbunleftside = t;

        };
    };

    p.setDefaultFront = function(){
        this.removeAllChildren();
        this.defbunfnt.resize();

        this.addChild(this.defbunfnt);
    };

    p.setDefaultSideLeft = function(){
        this.removeAllChildren();
        this.defbunleftside.resize();
        this.defbunleftside.rotation = -1 * nl.angle;

        this.addChild(this.defbunleftside);
    };

    p.setDefaultSideRight = function(){
        this.removeAllChildren();
        this.defbunrightside.resize();
        this.defbunrightside.rotation = -1 * nl.angle;
        this.addChild(this.defbunrightside);
    };

    p.setSad = function(){
        this.removeAllChildren();
        this.sadbun.resize();
        this.addChild(this.sadbun);
        this.status = 'sad';
    };

    p.setHappy = function(){
        this.removeAllChildren();
        this.happybun.resize();
        this.addChild(this.happybun);
        this.status = 'happy';
    };

    p.setHopFront = function(){
        this.removeAllChildren();
        this.hopbunfront.resize();
        this.addChild(this.hopbunfront);
    };

    p.setHopRightSide = function(){
        this.removeAllChildren();
        this.hopbunrightside.resize();
        this.addChild(this.hopbunrightside);
    };

    p.setHopLeftSide = function(){
        this.removeAllChildren();
        this.hopbunleftside.resize();
        this.addChild(this.hopbunleftside);
    };


    p.draw = function(ctx, ignoreCache) {
        this.Container_draw(ctx, ignoreCache);
        // add custom logic here.


    };
    p.resize = function(){
        this.make();
    };

    window.Bunny = createjs.promote(Bunny, "Container");
}());