(function () {

    function NumberLine() {
        this.Container_constructor();
        this.make();


    }

    let p = createjs.extend(NumberLine, createjs.Container);

    p.make = function () {
        this.removeAllChildren();
        const raddeg = 3.1415 / 180;
        this.angle = 10;//19.574309;
        this.slope = -1 * Math.tan(this.angle * raddeg);
        //console.log(this.slope);
        let img = new Image();
        let parent = this;
        this.background = null;
        img.src = './resources/background.svg';
        img.onload = function () {
            parent.background = new createjs.Bitmap(img);
            parent.background.resize = function () {
                const dims = getCanvDims();
                if (dims.r >= dims.gr) {//height should fill
                    parent.background.scale = 2 * dims.h / parent.background.image.height;
                    const newh = parent.background.scale * parent.background.image.height;
                    const neww = parent.background.scale * parent.background.image.width;
                    parent.background.x = (dims.w - neww) / 2;
                    parent.background.y = newh / -4;
                    //console.log("Height fill")
                } else {
                    parent.background.scale = 2 * dims.w / parent.background.image.width;
                    const newh = parent.background.scale * parent.background.image.height;
                    const neww = parent.background.scale * parent.background.image.width;
                    parent.background.y = (dims.h - newh) / 2;
                    parent.background.x = neww / -4;
                    //console.log("widthfill")
                }
            };
            parent.background.resize();


            //parent.addChildAt(parent.background, 0);
        };
        const thickness = Math.min(getCanvDims().h, getCanvDims().w) / 40;
        const dims = getCanvDims();
        let lx, ly, rx, ry, sx, sy, ey, inw, inh;
        if (dims.r >= dims.gr) {//height should fill
            inw = dims.h * dims.gr;
            inh = dims.h;
        }
        else {
            inw = dims.w;
            inh = inw / dims.gr;

        }

        sy = inh * .75 + (dims.h - inh) / 2;
        sx = (dims.w - inw) / 2;
        lx = -1 * thickness;
        ly = sy - (sx - lx) * this.slope;
        rx = dims.w + thickness;
        ry = sy - (sx - rx) * this.slope;

        this.g = new createjs.Graphics();
        this.back = new createjs.Shape(this.g);
        this.g.beginLinearGradientFill(["#c4e7e4ff", "#85c4d6ff"], [0, 1], 0, ly, 0, ry);
        //this.g.beginLinearGradientFill(["#c4e7e4ff", "#75b4c6ff"], [0, 1], 0, ly, 0, ry);
        this.g.moveTo(lx, ly).lineTo(rx, ry).lineTo(rx, 0).lineTo(lx, 0).lineTo(lx, ly);
        this.g.beginFill('#648f52ff');
        this.g.moveTo(lx, ly).lineTo(rx, ry).lineTo(rx, dims.h).lineTo(lx, dims.h).lineTo(lx, ly);
        this.addChild(this.back);

        this.g = new createjs.Graphics();
        this.line = new createjs.Shape(this.g);
        this.line.resize = function () {
        };
        this.g.setStrokeStyle(thickness);
        this.g.beginFill("#b5b635ff");
        this.g.beginStroke('#b5b635ff');
        //console.log('line:', lx, dims.h - ly, rx, dims.h - ry);
        this.g.moveTo(lx, ly);
        this.g.lineTo(rx, ry);

        this.line.x = 0;
        this.line.y = 0;
        //console.log('here');
        this.addChild(this.line);



        this.locations = [];
        const n = 10;
        for(let i = 0; i < n; i++) {
            //TODO Fix the 1 circle from going under bottom of screen due to making the number spread evenly across whole width
            let d = new Circle((i + 1), "#FFFFFFFF", "#ccccccff");
            const xspacing = (Math.max(lx + thickness, rx - thickness) - Math.min(lx + thickness, rx - thickness)) / n - d.dim;
            d.x = lx + thickness + (xspacing / 2 + i * (d.dim + xspacing) + d.dim / 2);
            d.y = ly + this.slope * (xspacing / 2 + i * (d.dim + xspacing) + d.dim / 2);
            d.regX = d.dim / 2;
            d.regY = d.dim / 2;
            this.locations.push(d);
            this.addChild(d);

        }


        this.bushes = [];
        let b1 = new Image();
        b1.src = './resources/bush1.svg';
        b1.onload = function () {
            let t = new createjs.Bitmap(b1);
            t.resize = function () {
                const dim = Math.min(getCanvDims().h, getCanvDims().w) / 8;
                t.scale = dim / Math.min(t.image.height, t.image.width);
                t.regX = t.scale * t.image.width;
                t.regY = t.scale * t.image.height;
                //console.log("Height fill");
                t.y = getCanvDims().h * 23 / 30 - t.image.height * t.scale;
                t.x = getCanvDims().w * 30 / 30 - t.image.width * t.scale;

            };
            t.resize();
            parent.bushes.push(t);
            parent.addChildAt(t, parent.children.length - 1);


            //parent.addChildAt(parent.background, 0);
        };

        this.soundbutton = new Circle();

        if(createjs.Sound.volume === 1.){
            this.soundbutton.fill = '#ffffff';
            this.soundbutton.textcolor = '#000000';
            this.soundbutton.outline = '#ffffff';
            this.soundbutton.val = '\uf028';
        }
        else{
            this.soundbutton.fill = '#333333';
            this.soundbutton.textcolor = '#ffffff';
            this.soundbutton.outline = '#333333';
            this.soundbutton.val = '\uf026  ';
        }
        this.soundbutton.font = 'FontAwesome';
        this.soundbutton.make();
        this.soundbutton.y = getCanvDims().h - this.soundbutton.dim * 1.1;
        this.soundbutton.x = this.soundbutton.dim * .1;
        this.soundbutton.on("click", function (event) {
            //console.log(event.target);
            if(createjs.Sound.volume === 1.){
                createjs.Sound.volume = 0;
                event.target.parent.fill = '#333333';
                event.target.parent.textcolor = '#ffffff';
                event.target.parent.outline = '#333333';
                //event.target.parent.val = '\uf027';
                event.target.parent.val = '\uf026  ';
                event.target.parent.make();
            }
            else{
                event.target.parent.fill = '#ffffff';
                event.target.parent.textcolor = '#000000';
                event.target.parent.outline = '#ffffff';
                event.target.parent.val = '\uf028';
                event.target.parent.make();
                createjs.Sound.volume = 1.;
            }
        });

        this.addChild(this.soundbutton);



        let b2 = new Image();
        b2.src = './resources/bush1.svg';
        b2.onload = function () {
            let t = new createjs.Bitmap(b2);
            t.resize = function () {
                const dim = Math.min(getCanvDims().h, getCanvDims().w) / 8;
                t.scale = dim / Math.min(t.image.height, t.image.width);
                t.regX = t.scale * t.image.width;
                t.regY = t.scale * t.image.height;
                //console.log("Height fill");
                t.y = getCanvDims().h * 29 / 30 - t.image.height * t.scale / 2;
                t.x = getCanvDims().w * 8 / 30 - t.image.width * t.scale / 2;

            };
            t.resize();
            parent.bushes.push(t);
            parent.addChildAt(t, parent.children.length - 1);

        };
        let b3 = new Image();
            b3.src = './resources/bush2.svg';
            b3.onload = function () {
                let t = new createjs.Bitmap(b3);
                t.resize = function () {
                    const dim = Math.min(getCanvDims().h, getCanvDims().w) / 5;
                    t.scale = dim / Math.min(t.image.height, t.image.width);
                    t.regX = t.scale * t.image.width;
                    t.regY = t.scale * t.image.height;
                    //console.log("Height fill");
                    t.y = getCanvDims().h * 30 / 30 -  t.image.height * t.scale / 2;
                    t.x = getCanvDims().w * 24 / 30 - t.image.width * t.scale / 2;

                };
                t.resize();
                parent.bushes.push(t);
                parent.addChildAt(t, parent.children.length - 1);

            };
        this.clouds = [];
        let c1 = new Image();
            c1.src = './resources/cloud1.svg';
            c1.onload = function () {
                let t = new createjs.Bitmap(c1);
                t.resize = function () {
                    const dim = Math.min(getCanvDims().h, getCanvDims().w) / 8;
                    t.scale = dim / Math.min(t.image.height, t.image.width);
                    t.regX = t.scale * t.image.width;
                    t.regY = t.scale * t.image.height;
                    //console.log("Height fill");
                    t.y = getCanvDims().h * 6 / 30 + t.image.height * t.scale / 2;
                    t.x = 0;

                };
                t.resize();
                parent.clouds.push(t);
                parent.addChildAt(t, parent.children.length - 1);

            };

        let c2 = new Image();
            c2.src = './resources/cloud2.svg';
            c2.onload = function () {
                let t = new createjs.Bitmap(c2);
                t.resize = function () {
                    const dim = Math.min(getCanvDims().h, getCanvDims().w) / 8;
                    t.scale = dim / Math.min(t.image.height, t.image.width);
                    t.regX = t.scale * t.image.width;
                    t.regY = t.scale * t.image.height;
                    //console.log("Height fill");
                    t.y = getCanvDims().h * 3 / 30 + t.image.height * t.scale / 2;
                    t.x = getCanvDims().w * 20 / 30;// - t.image.width * t.scale;

                };
                t.resize();
                parent.clouds.push(t);
                parent.addChildAt(t, parent.children.length - 1);

            };

        let c3 = new Image();
            c3.src = './resources/cloud1.svg';
            c3.onload = function () {
                let t = new createjs.Bitmap(c3);
                t.resize = function () {
                    const dim = Math.min(getCanvDims().h, getCanvDims().w) / 8;
                    t.scale = dim / Math.min(t.image.height, t.image.width);
                    t.regX = t.scale * t.image.width;
                    t.regY = t.scale * t.image.height;
                    //console.log("Height fill");
                    t.y = getCanvDims().h * 3 / 30 + t.image.height * t.scale / 3;
                    t.x = getCanvDims().w * 20 / 30 - t.image.width * t.scale/1.5;

                };
                t.resize();
                parent.clouds.push(t);
                parent.addChildAt(t, parent.children.length - 1);

            };
    };

    p.drawline = function (startx, starty, endx, endy, startloc, endloc) {
        let l = false;
        let endind = 0;
        if(!endloc){
            endind = this.children.length;
        }
        else{
            endind = this.getChildIndex(endloc);
        }
        if (this.pathline) {
            this.removeChild(this.pathline);
        }
        else{
            l = true;
        }
        let g = new createjs.Graphics();
        this.pathline = new createjs.Shape(g);
        g.setStrokeDash([Math.min(getCanvDims().h, getCanvDims().w) / 40,Math.min(getCanvDims().h, getCanvDims().w) / 40]);
        g.setStrokeStyle(Math.min(getCanvDims().h, getCanvDims().w) / 80);
        //g.beginFill('#AA0000DD');
        g.beginStroke('#00000000');
        g.moveTo(startx, starty);
        g.beginStroke('#AA0000DD');
        let rad = Math.sqrt((startx - endx) * (startx - endx) + (starty - endy) * (starty - endy)) / 2;
        let centx = Math.min(startx, endx) + Math.abs(startx - endx) / 2;
        let centy = Math.min(starty, endy) + Math.abs(starty - endy) / 2;
        let angle = Math.atan(-1 * (starty - endy)/(startx - endx));

        //g.arcTo(Math.max(startx, endx), Math.max(starty, endy), endy, endx, rad);
        g.arc(centx, centy, rad, -1 * angle, Math.PI - angle, true);

        if(l){
            //console.log("drawingline", centx, centy, rad, angle)
            //console.log("drawingline", startx, starty, endx, endy);
        }
        this.addChildAt(this.pathline, Math.min(this.getChildIndex(startloc), endind) - 1);

    };

    p.draw = function (ctx, ignoreCache) {
        this.Container_draw(ctx, ignoreCache);
    };

    p.resize = function () {
        this.make();
        this.placeChildren();
    };

    p.clear = function(){
        this.removeChild(this.pathline);
    };

    p.placeChildren = function () {

    };
    window.NumberLine = createjs.promote(NumberLine, "Container");
}());
