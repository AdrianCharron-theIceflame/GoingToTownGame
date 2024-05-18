"use strict";

// // functions that I will use
const $$ = sel => document.querySelector(sel);
const textNode = text => document.createTextNode(text);
const node = nodeType => document.createElement(nodeType);

// // declare DOM objects
const section = $$(`#playerInformation`);
const btnStart = $$(`#btnStart`);
const btnRollDice = $$(`#btnRollDice`);
const btnEndRound = $$(`#btnEndRound`);
const fldNumRounds = $$(`#fldNumRounds`);
const playerScore = $$(`#playerScore`);
const playerFScore = $$(`#playerFScore`);
const botScore = $$(`#botScore`);
const botFScore = $$(`#botFScore`);

$(function () { // on load
    // hide all objects that don't need to be shown
    $(`#bot`).hide();
    $(`#player`).hide();
    $(`#buttonGroup`).hide();
    $(`div#finalResults`).hide();
    $(`#playerFScore`).hide();
    $(`#botFScore`).hide();
    $(`#playerScore`).hide(`fast`); // 
    $(`#botScore`).hide(`fast`);
    // create user-player
    const userPlayer = new Player(localStorage.getItem(`fname`), localStorage.getItem(`lname`), localStorage.getItem(`username`), localStorage.getItem(`email`), localStorage.getItem(`phone`));
    const adversary = new Player(`theAI`, `John`, `Adversary`);
    // display player's info
    try { // try to display info
        displayInfo();
    } // end try
    catch (err) { // catch thrown error
        alert(`${err}`);
        newPlayer();
    } // end catch
    // create game
    const game = new GoingToTown(userPlayer, adversary);
    // create dice rollers
    const playerDice = new DiceRolls(game.player1);
    const adversaryDice = new DiceRolls(game.player2);
    // create an error label
    const errorLabel = node(`label`);
    errorLabel.setAttribute(`class`, `error`)
    // add error label to setup div
    const setup = $$(`#setUp`);
    setup.appendChild(errorLabel);
    // disabl start button
    btnStart.setAttribute(`disabled`, ``);
    if (fldNumRounds.value >= 1 && fldNumRounds.value <= 11) { // if input is valid, 
        btnStart.removeAttribute(`disabled`); // enable button
        $(`label.error`).hide(); // hide error
    } // end if
    else { // else input not valid
        btnStart.setAttribute(`disabled`, ``); // stay disabled
        $(`label.error`).show(); // show error label
        errorLabel.textContent = `Number must be between 1 and 11.` // add text
    }
    fldNumRounds.addEventListener(`input`, () => { // add event listener to field for inputs
        if (fldNumRounds.value >= 1 && fldNumRounds.value <= 11) { // if field is valid
            btnStart.removeAttribute(`disabled`); // start enabled
            $(`label.error`).hide(); // hide label
            errorLabel.textContent = ``;
        } // end if
        else { // else field not valid
            btnStart.setAttribute(`disabled`, ``); // diable button
            $(`label.error`).show(); // show error
            errorLabel.textContent = `Number must be between 1 and 11.` // message
        } // end if
    }) // end field event listener

    $(`button#quit`).on(`click`, function () { // button quit event on click
        localStorage.setItem(`playerScore`, game.player1.score); // store current points for player
        localStorage.setItem(`botScore`, game.player2.score); // store current points for bot
        actionPerformed_btnLeaveGame(); // call leave game function
    }); // end on click bor quit button

    btnStart.addEventListener(`click`, () => { // start button on click
        $(`p.roundNumber`).text(`Round ${game.currentRound}:`); // set round number text
        $(`#bot`).slideDown(); // slide down bot area
        $(`#player`).slideDown(); // slide down player area
        $(`#buttonGroup`).slideDown(); // slide down button group
        playGame(); // call play the game
    }); // end event listener

    /**
     * The gameplay flow
     */
    function playGame() {
        btnEndRound.setAttribute(`disabled`, ``) // disable the end round button
        if (!game.isGameFinished) { // if game isn't finished
            btnStart.setAttribute(`disabled`, ``); // disable the start button
            fldNumRounds.setAttribute(`disabled`, ``); // disable number field
            btnRollDice.removeAttribute(`disabled`); // enable roll dice button
            game.numRounds = Math.floor(Number(fldNumRounds.value)); // floor the value because I cannot deal with floating oint numbers
            let numDice = 3; // initial dice number
            btnRollDice.addEventListener(`click`, () => { // roll dice on click
                roll(numDice--) // roll dice, then decrement
            }); // end event listener
            btnEndRound.addEventListener(`click`, endTheRound); // end round on click call endRound
        } // end if
        else { // else, game is finished
            endGame(); // call end game
        } // end else
    } // playGame()

    /**
     * Rolls how many dice are passed and displays them with the animation
     * @param {Number} num the number of dice
     */
    function roll(num) {
        // select dice image
        const playerImg1 = document.querySelector(`#playerDice1`);
        const playerImg2 = document.querySelector(`#playerDice2`);
        const playerImg3 = document.querySelector(`#playerDice3`);
        const botImg1 = document.querySelector(`#botDice1`);
        const botImg2 = document.querySelector(`#botDice2`);
        const botImg3 = document.querySelector(`#botDice3`);
        // set the round to current round
        $(`p.roundNumber`).text(`Round ${game.currentRound}:`);
        // get player dice roll array
        let rolls = DiceRolls.rollDice(num);
        // get bot dice roll array
        let adversRolls = DiceRolls.rollDice(num);
        if (num == 3) { // if 3 dice were rolled
            $(`#playerScore`).slideUp(`fast`); // hide round scores
            $(`#botScore`).slideUp(`fast`);
            let diceImg = []; // new array to reorder the dice
            if (rolls[0] >= rolls[1] && rolls[0] >= rolls[2]) { // if rolls[0] is largest
                diceImg.push(rolls[0]); // add roll[0]
                if (rolls[1] >= rolls[2]) { // if roll[1] is largest
                    diceImg.push(rolls[1]); // add roll[1]
                    diceImg.push(rolls[2]); // add roll[2]
                } // end if
                else { // else, 2 is biggest
                    diceImg.push(rolls[2]); // add roll[2]
                    diceImg.push(rolls[1]); // add roll[1]
                } // end else
            } // end if
            else // else roll[0] is not biggest
                if (rolls[1] >= rolls[0] && rolls[1] >= rolls[2]) { // if roll[1] is biggest
                    diceImg.push(rolls[1]); // add roll[1]
                    if (rolls[0] >= rolls[2]) { // if roll[0] is largest
                        diceImg.push(rolls[0]); // add roll[0]
                        diceImg.push(rolls[2]); // add roll[2]
                    } // end if
                    else { // else, roll[2] is largest
                        diceImg.push(rolls[2]); // add roll[2]
                        diceImg.push(rolls[0]); // add roll[0]
                    } // end else
                } // end if
                else // else, roll[0] and roll[1] are not biggest
                    if (rolls[2] >= rolls[0] && rolls[2] >= rolls[1]) { // if roll[2] is largest
                        diceImg.push(rolls[2]); // add roll[2]
                        if (rolls[0] >= rolls[1]) { // if roll[0] is largest
                            diceImg.push(rolls[0]); // add roll[0]
                            diceImg.push(rolls[1]); // add roll[1]
                        } // end if
                        else { // else, roll[1] is largest
                            diceImg.push(rolls[1]); // add roll[1]
                            diceImg.push(rolls[0]); // add roll[0]
                        } // end else
                    } // end if
            let botDiceImg = []; // same concept as before
            if (adversRolls[0] >= adversRolls[1] && adversRolls[0] >= adversRolls[2]) {
                botDiceImg.push(adversRolls[0]);
                if (adversRolls[1] >= adversRolls[2]) {
                    botDiceImg.push(adversRolls[1]);
                    botDiceImg.push(adversRolls[2]);
                }
                else {
                    botDiceImg.push(adversRolls[2]);
                    botDiceImg.push(adversRolls[1]);
                }
            }
            else
                if (adversRolls[1] >= adversRolls[0] && adversRolls[1] >= adversRolls[2]) {
                    botDiceImg.push(adversRolls[1]);
                    if (adversRolls[0] >= adversRolls[2]) {
                        botDiceImg.push(adversRolls[0]);
                        botDiceImg.push(adversRolls[2]);
                    }
                    else {
                        botDiceImg.push(adversRolls[2]);
                        botDiceImg.push(adversRolls[0]);
                    }
                }
                else
                    if (adversRolls[2] >= adversRolls[0] && adversRolls[2] >= adversRolls[1]) {
                        botDiceImg.push(adversRolls[2]);
                        if (adversRolls[0] >= adversRolls[1]) {
                            botDiceImg.push(adversRolls[0]);
                            botDiceImg.push(adversRolls[1]);
                        }
                        else {
                            botDiceImg.push(adversRolls[1]);
                            botDiceImg.push(adversRolls[0]);
                        }
                    }
            // remove animations
            playerImg1.style.removeProperty(`animation`);
            playerImg2.style.removeProperty(`animation`);
            playerImg3.style.removeProperty(`animation`);
            botImg1.style.removeProperty(`animation`);
            botImg2.style.removeProperty(`animation`);
            botImg3.style.removeProperty(`animation`);
            // clear the previous round
            playerDice.clearRound();
            adversaryDice.clearRound();
            // Player dice animations
            playerImg1.setAttribute(`src`, `./images/DiceSide${diceImg[0]}.png`);
            playerImg1.addEventListener(`load`, () => {
                playerImg1.style.animation = "roll-in 2s linear 1 forwards";
            });
            playerImg2.setAttribute(`src`, `./images/DiceSide${diceImg[1]}.png`);
            playerImg2.addEventListener(`load`, () => {
                playerImg2.style.animation = "roll-in 2s linear 1 forwards";
            });
            playerImg3.setAttribute(`src`, `./images/DiceSide${diceImg[2]}.png`);
            playerImg3.addEventListener(`load`, () => {
                playerImg3.style.animation = "roll-in 2s linear 1 forwards";
            });
            // add rolls to round score
            playerDice.addDiceSet(...rolls);
            // update round score
            playerScore.textContent = `Your score for the round is ${playerDice.roundScore}`;
            // Adversary dice animations
            botImg1.setAttribute(`src`, `./images/DiceSide${botDiceImg[0]}.png`);
            botImg1.addEventListener(`load`, () => {
                botImg1.style.animation = "roll-in 2s linear 1 forwards";
            });
            botImg2.setAttribute(`src`, `./images/DiceSide${botDiceImg[1]}.png`);
            botImg2.addEventListener(`load`, () => {
                botImg2.style.animation = "roll-in 2s linear 1 forwards";
            });
            botImg3.setAttribute(`src`, `./images/DiceSide${botDiceImg[2]}.png`);
            botImg3.addEventListener(`load`, () => {
                botImg3.style.animation = "roll-in 2s linear 1 forwards";
            });
            // add adversary rolls to round score
            adversaryDice.addDiceSet(...adversRolls);
            // update adversary round score
            botScore.textContent = `Your adversary's score is ${adversaryDice.roundScore}`;
            // show scores
            $(`#playerScore`).slideDown(4000);
            $(`#botScore`).slideDown(4000);
        }// end if
        if (num == 2) { // if rolling 2 dice
            let diceImg = []; // see above
            if (rolls[0] >= rolls[1]) {
                diceImg.push(rolls[0]);
                diceImg.push(rolls[1]);
            }
            else {
                diceImg.push(rolls[1]);
                diceImg.push(rolls[0]);

            }
            let botDiceImg = []; // see above
            if (adversRolls[0] >= adversRolls[1]) {
                botDiceImg.push(adversRolls[0]);
                botDiceImg.push(adversRolls[1]);
            }
            else {
                botDiceImg.push(adversRolls[1]);
                botDiceImg.push(adversRolls[0]);
            }
            // remove animations
            playerImg2.style.removeProperty(`animation`);
            playerImg3.style.removeProperty(`animation`);
            botImg2.style.removeProperty(`animation`);
            botImg3.style.removeProperty(`animation`);
            // Player dice animation
            playerImg2.setAttribute(`src`, `./images/DiceSide${diceImg[0]}.png`);
            playerImg2.addEventListener(`load`, () => {
                playerImg2.style.animation = `roll-in 2s linear 1 forwards`;
            });
            playerImg3.setAttribute(`src`, `./images/DiceSide${diceImg[1]}.png`);
            playerImg3.addEventListener(`load`, () => {
                playerImg3.style.animation = `roll-in 2s linear 1 forwards`;
            });
            // add dice rolls to player round score
            playerDice.addDiceSet(...rolls);
            // update player round score 
            playerScore.textContent = `Your score for the round is ${playerDice.roundScore}`;
            // Adversary dice animation
            botImg2.setAttribute(`src`, `./images/DiceSide${botDiceImg[0]}.png`);
            botImg2.addEventListener(`load`, () => {
                botImg2.style.animation = `roll-in 2s linear 1 forwards`;
            });
            botImg3.setAttribute(`src`, `./images/DiceSide${botDiceImg[1]}.png`);
            botImg3.addEventListener(`load`, () => {
                botImg3.style.animation = `roll-in 2s linear 1 forwards`;
            });
            // add dice set to round score
            adversaryDice.addDiceSet(...adversRolls);
            // update bot score
            botScore.textContent = `Your adversary's score is ${adversaryDice.roundScore}`;
        } // end if
        if (num == 1) { // if rolling 1 dice
            // remove animations
            playerImg3.style.removeProperty(`animation`);
            botImg3.style.removeProperty(`animation`);
            // Player dice animations
            playerImg3.setAttribute(`src`, `./images/DiceSide${rolls[0]}.png`);
            playerImg3.addEventListener(`load`, () => {
                playerImg3.style.animation = `roll-in 2s linear 1 forwards`;
            });
            // add dice to round score
            playerDice.addDiceSet(...rolls);
            // update round score
            playerScore.textContent = `Your score for the round is ${playerDice.roundScore}`;
            // Adversary dice animations
            botImg3.setAttribute(`src`, `./images/DiceSide${adversRolls[0]}.png`);
            botImg3.addEventListener(`load`, () => {
                botImg3.style.animation = `roll-in 2s linear 1 forwards`;
            });
            // add dice to bot score
            adversaryDice.addDiceSet(...adversRolls);
            // update bot score
            botScore.textContent = `Your adversary's score is ${adversaryDice.roundScore}`;
            $(`#btnRollDice`).attr(`disabled`, ``);
            $(`#btnEndRound`).removeAttr(`disabled`);
        } // end if
    } // roll(number)

    /**
     * When a round is over
     */
    function endTheRound() {
        game.endRound(playerDice.roundScore, adversaryDice.roundScore); // end the round with both players' scores
        // updatefinal scores
        playerFScore.textContent = `Your final score is ${game.player1.score}`;
        botFScore.textContent = `Your adversary's final score is ${game.player2.score}`;
        // display final scores
        $(`#playerFScore`).slideDown(`fast`);
        $(`#botFScore`).slideDown(`fast`);
        // return to play game
        playGame();
    } // endTheRound()

    /**
     * Displays the game ending dialog
     */
    function endGame() {
        // display end game information
        $(`p#p1`).text(`${game.player1.username}'s score is: ${game.player1.score}`);
        $(`p#p2`).text(`Adversary's score is: ${game.player2.score}`);
        $(`p#p3`).text(`${game.getWinner()}`);
        // display final results div
        $(`div#finalResults`).slideDown(`slow`);
        // set storage items to scores
        localStorage.setItem(`playerScore`, game.player1.score);
        localStorage.setItem(`botScore`, game.player2.score);
        // add event listeners to 'new game' and 'leave game'
        $(`button#newGame`).on(`click`, () => location.reload());
        $(`button#leaveGame`).on(`click`, actionPerformed_btnLeaveGame);
    } // endGame()

    /**
     * action performed when a leave button is clicked
     */
    function actionPerformed_btnLeaveGame() {
        location.href = "./goodbye.html"; // change location
    } // actionPerformed_btnLeaveGame()
}); // end on load function

/**
 * Displays the player info
 */
function displayInfo() {
    // get localStorage items
    let fname = localStorage.getItem(`fname`);
    let lname = localStorage.getItem(`lname`);
    let username = localStorage.getItem(`username`);
    let phone = localStorage.getItem(`phone`);
    let city = localStorage.getItem(`city`);
    let email = localStorage.getItem(`email`);
    let newDate = localStorage.getItem(`newDate`);
    // if information is null
    if (fname == null || fname == null || username == null || phone == null || city == null || email == null || newDate == null)
        throw "Player information incorrectly registered";
    // check for for last visit
    let localLastVisit = localStorage.getItem(`lastVisit`);
    // create and append player info
    let name = node(`p`)
    name.appendChild(textNode(`Name: ${fname + " " + lname}`));
    section.appendChild(name);
    let uname = node(`p`);
    uname.appendChild(textNode(`Username: ${username}`));
    section.appendChild(uname);
    let pNum = node(`p`);
    pNum.appendChild(textNode(`Phone number: ${phone}`));
    section.appendChild(pNum);
    let cit = node(`p`);
    cit.appendChild(textNode(`City: ${city}`));
    section.appendChild(cit);
    let mail = node(`p`);
    mail.appendChild(textNode(`Email: ${email}`));
    section.appendChild(mail);
    // set these 2 buttons to disabled
    btnRollDice.setAttribute(`disabled`, "")
    btnEndRound.setAttribute(`disabled`, "")
    // player's name's dice
    $$(`#playerName`).textContent = username + `'s dice:`;

    if (!(localLastVisit == null || localLastVisit == "null")) { // if lastVisit is not null
        let lastVisit = new Date(localStorage.getItem(`lastVisit`)); // create new date with lastVisit
        let lastScore = Number(localStorage.getItem(`playerScore`)); // store last score
        let month = ""; // empty month string
        switch (lastVisit.getMonth()) { // switch getMonth
            case 0:
                month = "January";
                break;
            case 1:
                month = "February";
                break;
            case 2:
                month = "March";
                break;
            case 3:
                month = "April";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "June";
                break;
            case 6:
                month = "July";
                break;
            case 7:
                month = "August";
                break;
            case 8:
                month = "September";
                break;
            case 9:
                month = "October";
                break;
            case 10:
                month = "November";
                break;
            case 11:
                month = "December";
                break;
            default: // unknown date
                throw "An unknown date was entered";
        } // end swicth
        let hour = ""; // hour string
        let amPm = ""; // am or pm
        if (lastVisit.getHours() - 12 > 0) { // if pm
            hour = lastVisit.getHours() - 12;
            amPm = `p.m.`
        } // end if
        else { // else am
            hour = lastVisit.getHours();
            amPm = `a.m.`
        } // end else
        if (!(lastScore == null || lastScore == 'null')) { // if last score is not null
            // display last logged score
            let scoreTag = node(`p`);
            scoreTag.appendChild(textNode(`Your score from your last game was: ${lastScore}`));
            section.appendChild(scoreTag);
        } //end else
        // display last login time
        let dateString = `Your last login was: ${month} ${lastVisit.getDay()}, ${lastVisit.getFullYear()} at ${hour}:${lastVisit.getMinutes()} ${amPm}`;
        let lastLogin = node(`p`);
        lastLogin.appendChild(textNode(dateString));
        section.appendChild(lastLogin);
        // display change player options
        let instruct = node(`p`);
        let div = node(`div`);
        div.setAttribute(`id`, `previousPlayer`);
        instruct.appendChild(textNode(`Not you? Click the button to change players:`))
        let btnChange = node(`button`);
        btnChange.textContent = "Change Player";
        div.appendChild(instruct);
        div.appendChild(btnChange);
        section.appendChild(div);
        btnChange.onclick = newPlayer; // newPlayer action
    }
    localStorage.setItem(`lastVisit`, newDate) // store new lastVisit
} // displayInfo()

/**
 * Enables a new player to be registered
 */
function newPlayer() {
    // remove all localSorage items
    localStorage.removeItem(`fname`);
    localStorage.removeItem(`lname`);
    localStorage.removeItem(`username`);
    localStorage.removeItem(`phone`);
    localStorage.removeItem(`city`);
    localStorage.removeItem(`email`);
    localStorage.removeItem(`lastVisit`);
    localStorage.removeItem(`newDate`);
    localStorage.removeItem(`playerScore`);
    localStorage.removeItem(`botScore`);
    // change location
    location.href = "./intro.html";
} // newPlayer()
