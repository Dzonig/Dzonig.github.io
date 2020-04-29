function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only
}

/**
 * Sets the canvas size to fill the page
 * @param canvas
 */
function setCanvasSize(canvas){
    dims = getCanvDims();
    canvas.width = dims.w;
    canvas.height = dims.h;
    canvas.style.marginTop = canvas.style.marginBottom = Math.max((window.innerHeight - dims.h) / 2, 0) + 'px';
    canvas.style.marginLeft = canvas.style.marginRight = Math.max((window.innerWidth - dims.w) / 2, 0) + 'px';
}

/**
 * finds the ratio between height and width of page, and compares to the desired game ratio. Then expands the
 * non-filling dimension to a maximum of 2 times its intended ratio (so max and min ratios are 32:9 and 16:18
 * respectively)
 * @returns {{r: number, w: number, h: number, gr: number}}
 */
function getCanvDims(){
    const gameh = 9;
    const gamew = 16;
    const gameratio = gamew/gameh;
    const ratio = window.innerWidth / window.innerHeight;
    let h, w;
    if(ratio > gameratio){
        w = Math.min((2 * gamew / gameh) * window.innerHeight, window.innerWidth);
        h = window.innerHeight;
    }
    else if(ratio < gameratio){
        h = Math.min((2 * gameh / gamew) * window.innerWidth, window.innerHeight);
        w = window.innerWidth;
    }
    else{
        h = window.innerHeight;
        w = window.innerHeight;
    }
    return {h: h, w: w, r:w/h, gr:gameratio};
}

function btwn(v, a, b){
    let x = Math.min(a,b);
    let y = Math.max(a,b);
    return x < v && v < y;
}

