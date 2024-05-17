`use strict`;
$(function () {
    $(`button`).on(`click`, function () { location.href = "./intro.html"; });
    let canvas = document.querySelector(`canvas`);
    canvas.style.removeProperty(`backgroundColor`)
    let ctx = canvas.getContext(`2d`);
    let cycle = document.querySelector(`img`);
    let leftPos = -125;
    cycle.style.insetInlineStart = leftPos + `px`;
    let maxWidth = window.innerWidth;
    const redColour = `#d10000`;
    const yellowColour = `#ffec11`;
    const blueColour = `#1be7ff`;
    let rect1X = 0;
    let rect2X = 0;
    setInterval(() => {
        moveCycle(cycle);
        drawLine1(ctx);
        drawLine2(ctx);
    }, 40);

    /**
     * 
     * @param {HTMLImageElement} cycle 
     */
    function moveCycle(cycle) {
        if (leftPos <= maxWidth) {
            leftPos += 5;
            cycle.style.insetInlineStart = leftPos + `px`;
        }
    }
    let line1Y = 87;
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    function drawLine1(ctx) {
        if (line1Y < 0) {
            line1Y += 20;
        }
        if (line1Y > 150) {
            line1Y -= 20;
        }
        let randomDirection = Math.floor(Math.random() * 4);
        ctx.fillStyle = blueColour;
        ctx.beginPath();
        if (rect1X == 0) {
            ctx.rect(rect1X, line1Y, 10, 5);
            rect1X += 10;
        }
        else
            if (randomDirection == 0) {
                ctx.rect(rect1X, line1Y, 5, 10);
                line1Y += 10;
                rect1X += 5
            }
            else
                if (randomDirection == 1) {
                    ctx.rect(rect1X, line1Y, 5, -10);
                    line1Y -= 10;
                    rect1X += 5;
                }
                else {
                    ctx.rect(rect1X, line1Y, 10, 5);
                    rect1X += 10;
                }
        ctx.fill();
    }

    let line2Y = 237;
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    function drawLine2(ctx) {
        if (line2Y > 350) {
            line2Y -= 20;
        }
        if (line2Y < 150) {
            line2Y += 20;
        }
        let randomDirection = Math.floor(Math.random() * 4);
        ctx.fillStyle = redColour;
        ctx.beginPath();
        if (rect2X == 0) {
            ctx.rect(rect2X, line2Y, 10, 5);
            rect2X += 10;
        }
        else
            if (randomDirection == 0) {
                ctx.rect(rect2X, line2Y, 5, 10);
                line2Y += 10;
                rect2X += 5
            }
            else
                if (randomDirection == 1) {
                    ctx.rect(rect2X, line2Y, 5, -10);
                    line2Y -= 10;
                    rect2X += 5;
                }
                else {
                    ctx.rect(rect2X, line2Y, 10, 5);
                    rect2X += 10;
                }
        ctx.fill();
    }
    setTimeout(()=>{
        location.href = "intro.html"
    }, 10000)
});
