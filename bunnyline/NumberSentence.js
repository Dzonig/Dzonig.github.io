(function () {

    function NumberSentence() {
        this.Container_constructor();
        this.startval = this.signval = this.distval = this.eqval = this.endval = null;
        this.make();
    }

    let p = createjs.extend(NumberSentence, createjs.Container);

    p.draw = function (ctx, ignoreCache) {
        this.Container_draw(ctx, ignoreCache);
        // add custom logic here.
    };

    p.verifyns = function () {
        if (this.startval && !this.signval && (this.distval || this.eqval || this.endval)) {
            return false;
        } else if (this.startval && this.signval && !this.distval && (this.eqval || this.endval)) {
            return false;
        } else if (this.startval && this.signval && this.distval && !this.eqval && this.endval) {
            return false;
        } else if (this.startval && this.signval && this.distval && this.eqval && this.endval) {
            let s = parseInt(this.startval.val);
            let d = this.signval.val === '-' ? -1 : 1;
            let di = parseInt(this.distval.val);
            let eq = this.eqval.val;
            let e = parseInt(this.endval.val);
            if (eq !== '=' || (this.signval.val !== '-' && this.signval.val !== '+') || !btwn(e, 0, 11) || !btwn(s, 0, 11) || !btwn(di, 0, 11)) {
                return false;
            }
            return s + d * di !== e;

        }
        return true;


    };

    p.make = function () {
        this.removeAllChildren();

        this.start = new Circle("", '#FFFFFF96', '#FFFFFF00');
        let spacing = this.start.dim / 2;
        let dim = this.start.dim;
        this.start.x = spacing;
        this.start.y = spacing;
        this.start.setBounds(this.start.x, this.start.y, dim, dim);
        this.addChild(this.start);

        this.sign = new Square("", '#FFFFFF96', '#FFFFFF00');
        this.sign.x = 1 * (spacing + dim) + spacing;
        this.sign.y = spacing;
        this.sign.setBounds(this.sign.x, this.sign.y, dim, dim);
        this.addChild(this.sign);

        this.dist = new Circle("", '#FFFFFF96', '#FFFFFF00');
        this.dist.x = 2 * (spacing + dim) + spacing;
        this.dist.y = spacing;
        this.dist.setBounds(this.dist.x, this.dist.y, dim, dim);
        this.addChild(this.dist);

        this.eq = new Octagon("", '#FFFFFF96', '#FFFFFF00');
        this.eq.x = 3 * (spacing + dim) + spacing;
        this.eq.y = spacing;
        this.eq.setBounds(this.eq.x, this.eq.y, dim, dim);
        this.addChild(this.eq);

        this.end = new Circle("", '#FFFFFFAA', '#FFFFFF00');
        this.end.x = 4 * (spacing + dim) + spacing;
        this.end.y = spacing;
        this.end.setBounds(this.end.x, this.end.y, dim, dim);
        this.addChild(this.end);

        if (this.startval) {
            this.startval.resize();
            this.startval.x = this.start.x;
            this.startval.y = this.start.y;
            this.addChild(this.startval);
        }
        //console.log("signval", this.signval);
        if (this.signval) {
            this.signval.resize();
            this.signval.x = this.sign.x;
            this.signval.y = this.sign.y;
            this.addChild(this.signval);
        }
        if (this.distval) {
            this.distval.resize();
            this.distval.x = this.dist.x;
            this.distval.y = this.dist.y;
            this.addChild(this.distval);
        }
        if (this.eqval) {
            this.eqval.resize();
            this.eqval.x = this.eq.x;
            this.eqval.y = this.eq.y;
            this.addChild(this.eqval);
        }
        if (this.endval) {
            this.endval.resize();
            this.endval.x = this.end.x;
            this.endval.y = this.end.y;
            this.addChild(this.endval);
        }
    };

    p.signclick = function (e) {
        if(ns.signval){
            ns.removeChild(ns.signval);
        }
        ns.clear();
        nl.clear();
        let t = e.target.parent;
        let n = new window.Square(t.val, t.fill, t.outline, t.dim);
        n.x = ns.sign.x;
        n.y = ns.sign.y;
        ns.signval = n;
        ns.addChild(n);
        n.clicklistener = n.on("click", function (e) {
            ns.removeChild(ns.signval);
            ns.signval = null;
            if (ns.distval) {
                ns.removeChild(ns.distval);
                ns.distval = null;
            }
            nb.setSignClick(true);
            nb.setNumClick(false);
            nb.setEqClick(false);
            nl.clear();

            bunny.setDefaultFront();
            let loc = nl.locations[bunny.loc];
            bunny.x = loc.x;// - w + loc.getBounds().width / 2;
            bunny.y = loc.y - loc.getBounds().height / 3;

        });
        nb.setSignClick(true);
        nb.setNumClick(true);
        nb.setEqClick(false);

        let loc = nl.locations[bunny.loc];
        bunny.x = loc.x;// - w + loc.getBounds().width / 2;
        bunny.y = loc.y - loc.getBounds().height / 3;
        if (ns.signval.val == '+') {
            bunny.setDefaultSideRight();
            //bunny.x += nl.locations[bunny.loc].dim / 2;
            //bunny.y += nl.slope * nl.locations[bunny.loc].dim / 2;
            //nl.drawline(nl.locations[bunny.loc].x, nl.locations[bunny.loc].y, bunny.x, bunny.y, loc);
        } else {
            bunny.setDefaultSideLeft();
            bunny.x -= nl.locations[bunny.loc].dim / 1.7;
            bunny.y -= nl.slope * nl.locations[bunny.loc].dim / 1.7;
            //nl.drawline(nl.locations[bunny.loc].x, nl.locations[bunny.loc].y, bunny.x, bunny.y, loc);
        }

    };

    p.distclick = function (e) {
        if(ns.distval){
            ns.removeChild(ns.distval);
        }
        let t = e.target.parent;
        let n = new window.Circle(t.val, t.fill, t.outline, t.dim);
        n.x = ns.dist.x;
        n.y = ns.dist.y;
        ns.distval = n;
        ns.addChild(n);
        n.clicklistener = n.on("click", function (e) {
            ns.removeChild(ns.distval);
            ns.distval = null;
            nb.setSignClick(false);
            nb.setNumClick(true);
            nb.setEqClick(true);
            nl.clear();
            let loc = nl.locations[bunny.loc];
            bunny.x = loc.x;// - w + loc.getBounds().width / 2;
            bunny.y = loc.y - loc.getBounds().height / 3;
            if (ns.signval.val == '+') {
                bunny.setDefaultSideRight();
            } else {
                bunny.setDefaultSideLeft();
                bunny.x -= nl.locations[bunny.loc].dim / 1.7;
                bunny.y -= nl.slope * nl.locations[bunny.loc].dim / 1.7;
            }


        });
        nb.setSignClick(false);
        nb.setNumClick(true);
        nb.setEqClick(true);

        let loc = nl.locations[bunny.loc];
        let dir = 1;
        if (ns.signval.val == '-') {
            dir = -1;
        }
        const end = bunny.loc + 1 + ns.distval.val * dir;
        if (end >= 1 && end <= 10) {
            bunny.x = nl.locations[end - 1].x;// - nl.locations[end - 1].dim;
            bunny.y = nl.locations[end - 1].y - nl.locations[end - 1].dim;// - nl.locations[end - 1].dim * (1 / nl.slope);
            nl.drawline(nl.locations[bunny.loc].x, nl.locations[bunny.loc].y, bunny.x, bunny.y - Math.min(getCanvDims().h, getCanvDims().w) / 16, loc);
        }
        if (ns.signval.val == '+') {
            bunny.setHopRightSide();
        } else {
            bunny.setHopLeftSide();
        }

    };

    p.eqclick = function (e) {
        //console.log(e);
        if(ns.eqval){
            return;
        }
        let t = e.target.parent;
        let n = new window.Octagon(t.val, t.fill, t.outline, t.dim);
        n.x = ns.eq.x;
        n.y = ns.eq.y;
        ns.eqval = n;
        ns.addChild(n);
        ns.signval.off('click', ns.signval.clicklistener);
        ns.distval.off('click', ns.distval.clicklistener);


        nb.setEqClick(false);
        nb.setSignClick(true);
        nb.setNumClick(false);

        let loc = nl.locations[bunny.loc];
        let dir = 1;
        if (ns.signval.val == '-') {
            dir = -1;
        }
        const end = bunny.loc + 1 + ns.distval.val * dir;
        //console.log(end, bunny.loc, ns.distval.val, dir);
        ns.endval = new Circle(end, ns.distval.fill, ns.distval.outline, ns.distval.dim);
        ns.endval.x = ns.end.x;
        ns.endval.y = ns.end.y;
        ns.addChild(ns.endval);
        let nsstartval = ns.startval;
        let clearfunc = function () {
            if(ns.eqval !== null && ns.startval === nsstartval){
                ns.clear();
                nl.clear();
            }

        };
        if (end >= 1 && end <= 10) {
            bunny.x = nl.locations[end - 1].x;// - nl.locations[end - 1].dim;
            bunny.y = nl.locations[end - 1].y - nl.locations[end - 1].dim;// - nl.locations[end - 1].dim * (1 / nl.slope);
            nl.drawline(nl.locations[bunny.loc].x, nl.locations[bunny.loc].y, bunny.x, bunny.y - Math.min(getCanvDims().h, getCanvDims().w) / 16, loc);
        } else {
            bunny.x = nl.locations[bunny.loc].x;// - nl.locations[end - 1].dim;
            bunny.y = nl.locations[bunny.loc].y - nl.locations[bunny.loc].dim / 3;
            bunny.setSad();
            createjs.Sound.play("sadchirp");
            setTimeout(function () {
                if(bunny.status && ns.startval === nsstartval) {
                    bunny.setDefaultFront();
                }
                clearfunc();
            }, 3000);
            return
        }

        let prevloc = nl.locations[bunny.loc];
        loc = nl.locations[end - 1];
        bunny.x = loc.x;// - w + loc.getBounds().width / 2;
        bunny.y = loc.y - loc.getBounds().height / 3;
        bunny.prevloc = bunny.loc;
        bunny.loc = end - 1;
        let s = nl.locations[ns.startval.val - 1];

        nl.drawline(s.x, s.y, bunny.x, bunny.y, prevloc, loc);


        if (end === carrot.loc) {
            bunny.setHappy();
            createjs.Sound.play("happychirp");
            setTimeout(function () {
                if(bunny.status && ns.startval === nsstartval) {
                    bunny.setDefaultFront();
                }
                clearfunc();
            }, 3000);
            carrotcounter.increment();
            carrot.placeCarrot(nl.locations[carrot.randomCarrotLoc(bunny.loc)]);
        } else {
            createjs.Sound.play("sadchirp");
            bunny.setSad();
            setTimeout(function () {
                if(bunny.status && ns.startval === nsstartval) {
                    bunny.setDefaultFront();
                }
                clearfunc();
            }, 3000);
        }

    };


    p.resize = function (event) {
        this.make();
        //for(let i = 0; i < this.children.length; i++){
        //    this.children[i].resize();
        //}
        this.placeChildren();

        if (this.eqval) {
            let ploc = nl.locations[bunny.prevloc];
            let loc = nl.locations[bunny.loc];
            console.log(ploc, loc);
            bunny.x = loc.x;// - w + loc.getBounds().width / 2;
            bunny.y = loc.y - loc.getBounds().height / 3;
            if (bunny.status === 'happy') {
                bunny.setHappy();
            } else if (bunny.status === 'sad') {
                bunny.setSad();
                //bunny.sadbun.resize();
            }
            nl.drawline(ploc.x, ploc.y, bunny.x, bunny.y, ploc, loc);

            nb.setSignClick(true);
            nb.setNumClick(false);
            nb.setEqClick(false);
        } else if (this.distval) {
            nb.setSignClick(false);
            nb.setNumClick(true);
            nb.setEqClick(true);

            let loc = nl.locations[bunny.loc];
            let dir = 1;
            if (ns.signval.val === '-') {
                dir = -1;
            }
            const end = bunny.loc + 1 + ns.distval.val * dir;
            if (end >= 1 && end <= 10) {
                bunny.x = nl.locations[end - 1].x;// - nl.locations[end - 1].dim;
                bunny.y = nl.locations[end - 1].y - nl.locations[end - 1].dim;// - nl.locations[end - 1].dim * (1 / nl.slope);
                nl.drawline(nl.locations[bunny.loc].x, nl.locations[bunny.loc].y, bunny.x, bunny.y - Math.min(getCanvDims().h, getCanvDims().w) / 16, loc);
            }
            if (ns.signval.val === '+') {
                bunny.setHopRightSide();
            } else {
                bunny.setHopLeftSide();
            }
        } else if (this.signval) {
            nb.setSignClick(true);
            nb.setNumClick(true);
            nb.setEqClick(false);

            let loc = nl.locations[bunny.loc];
            bunny.x = loc.x;// - w + loc.getBounds().width / 2;
            bunny.y = loc.y - loc.getBounds().height / 3;
            if (ns.signval.val === '+') {
                bunny.setDefaultSideRight();
                //bunny.x += nl.locations[bunny.loc].dim / 2;
                //bunny.y += nl.slope * nl.locations[bunny.loc].dim / 2;
                //nl.drawline(nl.locations[bunny.loc].x, nl.locations[bunny.loc].y, bunny.x, bunny.y, loc);
            } else {
                bunny.setDefaultSideLeft();
                bunny.x -= nl.locations[bunny.loc].dim / 1.7;
                bunny.y -= nl.slope * nl.locations[bunny.loc].dim / 1.7;
                //nl.drawline(nl.locations[bunny.loc].x, nl.locations[bunny.loc].y, bunny.x, bunny.y, loc);
            }
        } else {
            let loc = nl.locations[bunny.loc];
            bunny.x = loc.x;
            bunny.y = loc.y - loc.getBounds().height / 3;
            nb.setSignClick(true);
            nb.setNumClick(false);
            nb.setEqClick(false);

        }
    };

    p.setStart = function () {
        if (this.startval) {
            this.removeChild(this.startval);
        }
        this.startval = new Circle(bunny.loc + 1, "#b5b635ff", "#FFFFFFFF");
        this.startval.x = this.start.x;
        this.startval.y = this.start.y;
        this.addChild(this.startval);
    };

    p.clear = function () {
        let sv = ns.signval;
        let ev = ns.eqval;
        let endv = ns.endval;
        let dv = ns.distval;
        ns.removeChild(sv);
        ns.removeChild(ev);
        ns.removeChild(endv);
        ns.removeChild(dv);
        ns.signval = null;
        ns.eqval = null;
        ns.distval = null;
        ns.endval = null;
        ns.setStart();
        bunny.status = null;
    };

    p.placeChildren = function () {
    };

    window.NumberSentence = createjs.promote(NumberSentence, "Container");


}());
