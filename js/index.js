`use strict`;
$(function () { // on load
    $(`button`).on(`click`, function () { location.href = "./intro.html"; }); // skip intro button to intro.html
    let canvas = document.querySelector(`canvas`); // get canvas
    let ctx = canvas.getContext(`2d`); // get context
    let cycle = document.querySelector(`img`); // get image
    let leftPos = -125; // image left position
    cycle.style.insetInlineStart = leftPos + `px`; // image left position
    let maxWidth = window.innerWidth; // max window width
    const redColour = `#d10000`; // red
    const blueColour = `#1be7ff`; // blue
    let rect1X = 0; // line 1 start
    let rect2X = 0; // line 2 start
    setInterval(() => { // loop these functions
        moveCycle(cycle); // image
        drawLine1(ctx); // line 1
        drawLine2(ctx); // line 2
    }, 40); // 40 miliseconds
    // end interval

    /**
     * Moves the cycle image
     * @param {HTMLImageElement} cycle the image to be moved
     */
    function moveCycle(cycle) {
        if (leftPos <= maxWidth) { // while left position <= to max width
            leftPos += 10; // add 10 pixels
            cycle.style.insetInlineStart = leftPos + `px`;
        } // end if
    } // moveCycle(HTMLImageElement)

    let line1Y = 87; // set initial y position line 1

    /**
     * Draws line 1
     * @param {CanvasRenderingContext2D} ctx the context of the canvas
     */
    function drawLine1(ctx) {
        if (line1Y < 0) { // if Y is smaller than 0
            line1Y += 20; // add 20 px
        } // end if
        if (line1Y > 175) { // if 
            line1Y -= 20; // remove 20px
        } // end if
        let randomDirection = Math.floor(Math.random() * 4); // random number from 0 to 3
        ctx.fillStyle = blueColour; // colour is blue
        ctx.beginPath(); // begin path
        if (rect1X == 0) { // if x == 0
            ctx.rect(rect1X, line1Y, 10, 5); // draw line to the right
            rect1X += 10; // add to path
        } // end if
        else // else
            if (randomDirection == 0) { // if random is 0
                ctx.rect(rect1X, line1Y, 5, 10); // draw line down 
                line1Y += 10; // add 10 px to y
                rect1X += 5; // add 5 px to x
            } // end if
            else //  else
                if (randomDirection == 1) { // if random is 1 
                    ctx.rect(rect1X, line1Y, 5, -10); // draw line up
                    line1Y -= 10; // remove 10 from y
                    rect1X += 5; // add 5 to x
                } // end if
                else { // else random is 2 or 3
                    ctx.rect(rect1X, line1Y, 10, 5); // draw line to right
                    rect1X += 10; // add 10 to x
                } // end else
        ctx.fill(); // fil line
    } // drawLine1(CanvasRenderingContext2D)

    let line2Y = 237; // y position of line 2

    /**
     * Draws the second line in red<br>Check drawLine1() for more information
     * @param {CanvasRenderingContext2D} ctx the contaxt of the canvas element
     */
    function drawLine2(ctx) {
        if (line2Y > 350) {
            line2Y -= 20;
        }
        if (line2Y < 175) {
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
    } // drawLine2(CanvasRenderingContext2D)

    setTimeout(()=>{ // set timeout for 10 seconds to change location after 10 seconds
        location.href = "intro.html"; // goto intro.html
    }, 10000); // end timeout

}); // end on load
