(function() {

    function WinBunny() {

        this.Container_constructor();
        this.make();
        this.visible = false;
        this.on('click', function (e) {
            e.target.parent.visible = false;
            carrotcounter.reset();
            if(!ns.signval) {
                bunny.setDefaultFront();
            }
        });
        this.tickertime = 0;
        this.trapscale = 1.0;

    }

    let p = createjs.extend(WinBunny, createjs.Container);

    p.draw = function(ctx, ignoreCache) {
        this.Container_draw(ctx, ignoreCache);
        // add custom logic here.
    };


    p.make = function(){
        this.removeAllChildren();
        let dim = getCanvDims();
        this.width = dim.w;
        this.height = dim.h;
        this.rect = new createjs.Shape();

        this.rect.graphics.setStrokeStyle(0);
        this.rect.graphics.beginFill('#FFFFFF88');
        this.rect.graphics.beginStroke('#FFFFFF88');
        this.rect.graphics.drawRect(0, 0, dim.w, dim.h);
        this.addChild(this.rect);

        this.cursor = "pointer";
        let parent = this;
        let b2 = new Image();
        //b2.crossOrigin = "Anonymous"; // Should work fine
        b2.src = './resources/winbunny.svg';
        b2.onload = function () {
            let t = new createjs.Bitmap(b2);
            t.resize = function () {
                t.hitArea = new createjs.Shape();
                //let g = new createjs.Graphics(t.hitArea);
                t.hitArea.graphics.beginFill("#00000000").drawRect(0,0, getCanvDims().w, getCanvDims().h);
                const dim = Math.min(getCanvDims().h, getCanvDims().w) / 2;
                t.scale = dim / Math.min(t.image.height, t.image.width);
                //t.regX = t.scale * t.image.width;
                //t.regY = t.scale * t.image.height;
                //console.log("Height fill");
                t.y = getCanvDims().h * 0.5 - t.image.height * t.scale / 2;
                t.x = getCanvDims().w * 0.5 - t.image.width * t.scale / 2;

            };
            t.resize();
            parent.bunny = t;
            parent.addChild(t);

        };
        this.traps = [];
        let mdim = Math.min(getCanvDims().h, getCanvDims().w);

        let trap = new createjs.Shape();
        trap.regX = 200 * trap.scale;
        trap.regY = -250 * trap.scale;
        trap.graphics.setStrokeStyle(1);
        trap.graphics.beginFill('#F89939');
        trap.graphics.beginStroke('#F89939');
        trap.graphics.moveTo(0,0);
        trap.graphics.lineTo(400,0);
        trap.graphics.lineTo(300, 500);
        trap.graphics.lineTo(100, 500);
        trap.graphics.lineTo(0,0);
        trap.scale = Math.min(getCanvDims().h, getCanvDims().w) / 10 / 500;
        trap.x =  dim.w / 2 - mdim / 2.7;
        trap.y =  dim.h / 2 - mdim / 48;
        trap.rotation = -60;
        this.traps.push(trap);
        this.addChild(trap);

        trap = new createjs.Shape();
        trap.regX = 200 * trap.scale;
        trap.regY = -250 * trap.scale;
        trap.graphics.setStrokeStyle(1);
        trap.graphics.beginFill('#F89939');
        trap.graphics.beginStroke('#F89939');
        trap.graphics.moveTo(0,0);
        trap.graphics.lineTo(400,0);
        trap.graphics.lineTo(300, 500);
        trap.graphics.lineTo(100, 500);
        trap.graphics.lineTo(0,0);
        trap.scale = Math.min(getCanvDims().h, getCanvDims().w) / 10 / 500;

        trap.x =  dim.w / 2 - mdim / 2.5;
        trap.y =  dim.h / 2 + mdim / 8;
        trap.rotation = -90;
        this.traps.push(trap);
        this.addChild(trap);

        trap = new createjs.Shape();
        trap.regX = 200 * trap.scale;
        trap.regY = -250 * trap.scale;
        trap.graphics.setStrokeStyle(1);
        trap.graphics.beginFill('#F89939');
        trap.graphics.beginStroke('#F89939');
        trap.graphics.moveTo(0,0);
        trap.graphics.lineTo(400,0);
        trap.graphics.lineTo(300, 500);
        trap.graphics.lineTo(100, 500);
        trap.graphics.lineTo(0,0);
        trap.scale = Math.min(getCanvDims().h, getCanvDims().w) / 10 / 500;
        trap.rotation = -120;
        trap.x =  dim.w / 2 - mdim / 2.7 ;//+ 150 * trap.scale;
        trap.y =  dim.h / 2 + mdim * 13 / 48;


        this.traps.push(trap);
        this.addChild(trap);


        trap = new createjs.Shape();
        trap.regX = 200 * trap.scale;
        trap.regY = -250 * trap.scale;
        trap.graphics.setStrokeStyle(1);
        trap.graphics.beginFill('#F89939');
        trap.graphics.beginStroke('#F89939');
        trap.graphics.moveTo(0,0);
        trap.graphics.lineTo(400,0);
        trap.graphics.lineTo(300, 500);
        trap.graphics.lineTo(100, 500);
        trap.graphics.lineTo(0,0);
        trap.scale = Math.min(getCanvDims().h, getCanvDims().w) / 10 / 500;

        trap.x =  dim.w / 2 + mdim / 2.7;
        trap.y =  dim.h / 2 - mdim / 48;
        trap.rotation = 60;
        this.traps.push(trap);
        this.addChild(trap);

        trap = new createjs.Shape();
        trap.regX = 200 * trap.scale;
        trap.regY = -250 * trap.scale;
        trap.graphics.setStrokeStyle(1);
        trap.graphics.beginFill('#F89939');
        trap.graphics.beginStroke('#F89939');
        trap.graphics.moveTo(0,0);
        trap.graphics.lineTo(400,0);
        trap.graphics.lineTo(300, 500);
        trap.graphics.lineTo(100, 500);
        trap.graphics.lineTo(0,0);
        trap.scale = Math.min(getCanvDims().h, getCanvDims().w) / 10 / 500;
        trap.x =  dim.w / 2 + mdim / 2.5;
        trap.y =  dim.h / 2 + mdim / 8;
        trap.rotation = 90;
        this.traps.push(trap);
        this.addChild(trap);

        trap = new createjs.Shape();
        trap.regX = 200 * trap.scale;
        trap.regY = -250 * trap.scale;
        trap.graphics.setStrokeStyle(1);
        trap.graphics.beginFill('#F89939');
        trap.graphics.beginStroke('#F89939');
        trap.graphics.moveTo(0,0);
        trap.graphics.lineTo(400,0);
        trap.graphics.lineTo(300, 500);
        trap.graphics.lineTo(100, 500);
        trap.graphics.lineTo(0,0);
        trap.scale = Math.min(getCanvDims().h, getCanvDims().w) / 10 / 500;

        trap.x =  dim.w / 2 + mdim / 2.7 ;//+ 150 * trap.scale;
        trap.y =  dim.h / 2 + mdim * 13 / 48;

        trap.rotation = 120;
        this.traps.push(trap);
        this.addChild(trap);

    };

    p.setTrapScale = function(scale){
        for(let i = 0; i < this.traps.length; i++){
            this.traps[i].scale = scale * Math.min(getCanvDims().h, getCanvDims().w) / 10 / 500;
        }
    };

    p.trapAnimate = function(){
        //console.log(this.tickertime);
        if(this.tickertime >= 0 && this.tickertime < 4000){
            this.setTrapScale(1.0 - 0.2 * Math.sin(2 * Math.PI * this.tickertime / 2000));
            this.tickertime += ticktime;
        }
        else{
            this.setTrapScale(1.0);
            this.tickertime = 0;
            createjs.Ticker.removeEventListener('tick', wb.trapanimatefunc);
            wb.trapanimatefunc = null;

        }
    };

    p.resize = function(dim=Math.min(getCanvDims().h, getCanvDims().w)/ 11){
        this.dim = dim;
        this.make();
    };

    window.WinBunny = createjs.promote(WinBunny, "Container");
}());
