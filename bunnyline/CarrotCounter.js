(function() {

    function CarrotCounter() {
        this.Container_constructor();
        this.count = 0;
        this.limit = 3;
        this.make();

    }
    let p = createjs.extend(CarrotCounter, createjs.Container);



    p.make = function(){
        this.removeAllChildren();
        this.carrots = [];
        this.dim = 4 * Math.min(getCanvDims().h, getCanvDims().w)/ 20;
        let spacing = this.dim / 4 / 4;
        this.y = 2 * spacing;
        this.x = getCanvDims().w - this.dim - spacing;
        for(let i = 0; i < this.count; i++){
            var c = new Carrot(false, 0);
            c.x = (this.dim / 4 + spacing) * i;
            //c.children[0].y = 0;
            this.carrots.push(c);
            this.addChild(c);
        }
    };


    p.draw = function(ctx, ignoreCache) {
        this.Container_draw(ctx, ignoreCache);
        // add custom logic here.
    };

    p.resize = function(event){
        this.make();
        //for(let i = 0; i < this.children.length; i++){
        //    this.children[i].resize();
        //}
        //this.placeChildren();
    };

    p.placeChildren = function(){

    };
    p.increment = function(){
        this.count += 1;
        this.make();
        if(this.count===this.limit){
            setTimeout(function () {
                //window.alert("You win!\nPress OK to play again!");
                wb.visible = true;
                wb.trapanimatefunc = function () {
                    wb.trapAnimate();
                };
                createjs.Ticker.addEventListener('tick', wb.trapanimatefunc);
                setTimeout(function () {
                    wb.visible = false;

                }, 5000);
            }, 100);
            ns.clear();
            nl.clear();
            let tmpinst = this;
            setTimeout(function () {
                if(tmpinst.count === 3){
                    tmpinst.count = 0;
                }
                tmpinst.make();
                if(!ns.signval) {
                    bunny.setDefaultFront();
                }
            }, 5100);
        }

    };
    p.reset = function(){
        this.count = 0;
        this.make();
    };
    window.CarrotCounter = createjs.promote(CarrotCounter, "Container");
}());
