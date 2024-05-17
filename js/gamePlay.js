"use strict";
const adversary = new Player(`theAI`, `John`, `Jaix1`);
$(function () {
    $(`#bot`).hide();
    $(`#player`).hide();
    $(`#buttonGroup`).hide();
    const userPlayer = new Player(localStorage.getItem(`fname`), localStorage.getItem(`lname`), localStorage.getItem(`username`), localStorage.getItem(`email`), localStorage.getItem(`phone`));
    displayInfo();
    let game = new GoingToTown(userPlayer, adversary);
    // create dice rollers
    const playerDice = new DiceRolls(game.player1);
    const adversaryDice = new DiceRolls(game.player2);
    // start the game
    const errorLabel = node(`label`);
    errorLabel.setAttribute(`class`, `error`)
    const setup = $$(`#setUp`);
    setup.appendChild(errorLabel);
    btnStart.setAttribute(`disabled`, ``);
    if (fldNumRounds.value >= 1 && fldNumRounds.value <= 11) {
        btnStart.removeAttribute(`disabled`);
        $(`label.error`).hide();
    }
    else {
        btnStart.setAttribute(`disabled`, ``);
        $(`label.error`).show();
        errorLabel.textContent = `Number must be between 1 and 11.`
    }
    fldNumRounds.addEventListener(`input`, () => {
        if (fldNumRounds.value >= 1 && fldNumRounds.value <= 11) {
            btnStart.removeAttribute(`disabled`);
            $(`label.error`).hide();
            errorLabel.textContent = ``;
        }
        else {
            btnStart.setAttribute(`disabled`, ``);
            $(`label.error`).show();
            errorLabel.textContent = `Number must be between 1 and 11.`
        }
    })

    btnStart.addEventListener(`click`, playGame);
    /**
     * The gameplay flow
     */
    function playGame() {
        $(`#bot`).slideToggle();
        $(`#player`).slideToggle();
        $(`#buttonGroup`).slideToggle();
        btnEndRound.setAttribute(`disabled`, ``)
        if (!game.isGameFinished) {
            btnStart.setAttribute(`disabled`, ``);
            fldNumRounds.setAttribute(`disabled`, ``);
            btnRollDice.removeAttribute(`disabled`);
            game.numRounds = Math.floor(Number(fldNumRounds.value));
            let numDice = 3;
            btnRollDice.addEventListener(`click`, () => {
                roll(numDice--)
            });
            btnEndRound.addEventListener(`click`, endTheRound);
        }
        else {
            endGame();
        }
    } // playGame()
    /**
     * Rolls how many dice are passed
     * @param {Number} num the number of dice
     */
    function roll(num) {
        let rolls = DiceRolls.rollDice(num);
        let adversRolls = DiceRolls.rollDice(num);
        let playerImg1 = document.querySelector(`#playerDice1`)
        let playerImg2 = document.querySelector(`#playerDice2`)
        let playerImg3 = document.querySelector(`#playerDice3`)
        let botImg1 = document.querySelector(`#botDice1`)
        let botImg2 = document.querySelector(`#botDice2`)
        let botImg3 = document.querySelector(`#botDice3`)
        let img1 = new Image();
        let img2 = new Image();
        let img3 = new Image();
        let img4 = new Image();
        let img5 = new Image();
        let img6 = new Image();
        if (num == 3) {
            playerDice.clearRound();
            adversaryDice.clearRound();
            // User Player
            img1.src = `./images/DiceSide${rolls[0]}.png`;
            playerImg1.setAttribute(`src`, img1.src);
            playerImg1.addEventListener(`load`, () => {
                playerImg1.style.animation = "roll-in 2s linear 1 forwards"
            })
            img2.src = `./images/DiceSide${rolls[1]}.png`;
            playerImg2.setAttribute(`src`, img2.src);
            playerImg2.addEventListener(`load`, () => {
                playerImg2.style.animation = "roll-in 2s linear 1 forwards"
            })
            img3.src = `./images/DiceSide${rolls[2]}.png`;
            playerImg3.setAttribute(`src`, img3.src);
            playerImg3.addEventListener(`load`, () => {
                playerImg3.style.animation = "roll-in 2s linear 1 forwards"
            })
            playerDice.addDiceSet(...rolls);
            playerScore.textContent = `Your score for the round is ${playerDice.roundScore}`
            // Adversary
            img4.src = `./images/DiceSide${adversRolls[0]}.png`;
            botImg1.setAttribute(`src`, img4.src);
            botImg1.addEventListener(`load`, () => {
                botImg1.style.animation = "roll-in 2s linear 1 forwards"
            })
            img5.src = `./images/DiceSide${adversRolls[1]}.png`;
            botImg2.setAttribute(`src`, img5.src);
            botImg2.addEventListener(`load`, () => {
                botImg2.style.animation = "roll-in 2s linear 1 forwards"
            })
            img6.src = `./images/DiceSide${adversRolls[2]}.png`;
            botImg3.setAttribute(`src`, img6.src);
            botImg3.addEventListener(`load`, () => {
                botImg3.style.animation = "roll-in 2s linear 1 forwards"
            })
            adversaryDice.addDiceSet(...adversRolls);
            botScore.textContent = `Your adversary's score is ${adversaryDice.roundScore}`
        }
        if (num == 2) {
            playerImg2.style.removeProperty(`animation`);
            playerImg3.style.removeProperty(`animation`);
            botImg2.style.removeProperty(`animation`);
            botImg3.style.removeProperty(`animation`);
            // User Player
            img2.src = `./images/DiceSide${rolls[0]}.png`;
            playerImg2.setAttribute(`src`, img2.src);
            playerImg2.addEventListener(`load`, () => {
                playerImg2.style.animation = `roll-in 2s linear 1 forwards`
            })
            img3.src = `./images/DiceSide${rolls[1]}.png`;
            playerImg3.setAttribute(`src`, img3.src);
            playerImg3.addEventListener(`load`, () => {
                playerImg3.style.animation = `roll-in 2s linear 1 forwards`
            })
            playerDice.addDiceSet(...rolls);
            playerScore.textContent = `Your score for the round is ${playerDice.roundScore}`
            // Adversary
            img5.src = `./images/DiceSide${adversRolls[0]}.png`;
            botImg2.setAttribute(`src`, img5.src);
            botImg2.addEventListener(`load`, () => {
                botImg2.style.animation = `roll-in 2s linear 1 forwards`
            })
            img6.src = `./images/DiceSide${adversRolls[1]}.png`;
            botImg3.setAttribute(`src`, img6.src);
            botImg3.addEventListener(`load`, () => {
                botImg3.style.animation = `roll-in 2s linear 1 forwards`
            })
            adversaryDice.addDiceSet(...adversRolls);
            botScore.textContent = `Your adversary's score is ${adversaryDice.roundScore}`
        }
        if (num == 1) {
            playerImg3.style.removeProperty(`animation`);
            botImg3.style.removeProperty(`animation`);
            img3.src = `./images/DiceSide${rolls[0]}.png`;
            playerImg3.setAttribute(`src`, img3.src);
            playerImg3.addEventListener(`load`, () => {
                playerImg3.style.animation = `roll-in 2s linear 1 forwards`
            })
            playerDice.addDiceSet(...rolls);
            playerScore.textContent = `Your score for the round is ${playerDice.roundScore}`
            // Adversary
            img6.src = `./images/DiceSide${adversRolls[0]}.png`;
            botImg3.setAttribute(`src`, img6.src);
            botImg3.addEventListener(`load`, () => {
                botImg3.style.animation = `roll-in 2s linear 1 forwards`
            })
            adversaryDice.addDiceSet(...adversRolls);
            botScore.textContent = `Your adversary's score is ${adversaryDice.roundScore}`
        }
    } // roll(number)
});
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
const playerDiceArea = $$(`#playerDiceArea`);

const botDiceArea = $$(`#botDiceArea`);
const playerScore = $$(`#playerScore`);
const playerFScore = $$(`#playerFScore`);
const botScore = $$(`#botScore`);
const botFScore = $$(`#botFScore`);
const finalResults = $$(`#finalResults`);
const finalSection = node(`section`)

// // computer player
// // display the info
// window.onload = displayInfo;
// // create a game
// const game = createGame();
// start the game


/**
 * Displays the player info
 */
function displayInfo() {
    let fname = localStorage.getItem(`fname`);
    let lname = localStorage.getItem(`lname`);
    let username = localStorage.getItem(`username`);
    let phone = localStorage.getItem(`phone`);
    let city = localStorage.getItem(`city`);
    let email = localStorage.getItem(`email`);
    let lastVisit = localStorage.getItem(`lastVisit`);
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
    btnRollDice.setAttribute(`disabled`, "")
    btnEndRound.setAttribute(`disabled`, "")
    $$(`#playerName`).textContent = username + `'s dice:`;
    $$(`#botName`).textContent = adversary.username + `'s dice:`;
    if (!(lastVisit == null)) {
        let lastLogin = node(`p`);
        lastLogin.appendChild(textNode(`Your last login was: ${lastVisit}`));
        section.appendChild(lastLogin);
        let instruct = node(`p`);
        let div = node(`div`);
        div.setAttribute(`id`, `previousPlayer`);
        instruct.appendChild(textNode(`Not you? Click the button to change players:`))
        let btnChange = node(`button`);
        btnChange.textContent = "Change Player";
        div.appendChild(instruct);
        div.appendChild(btnChange);
        section.appendChild(div);
        btnChange.onclick = newPlayer;
    }
    localStorage.setItem(`lastVisit`, localStorage.getItem(`newDate`))
} // displayInfo()

function newPlayer() {
    localStorage.removeItem(`fname`);
    localStorage.removeItem(`lname`);
    localStorage.removeItem(`username`);
    localStorage.removeItem(`phone`);
    localStorage.removeItem(`city`);
    localStorage.removeItem(`email`);
    localStorage.removeItem(`lastVisit`);
    localStorage.removeItem(`newDate`);
    location.href = "./intro.html";
} // newPlayer()




// /**
//  * When a round is over
//  */
// function endTheRound() {
//     game.endRound(playerDice.roundScore, adversaryDice.roundScore);
//     playerFScore.textContent = `Your final score is ${game.player1.score}`;
//     botFScore.textContent = `Your adversary's final score is ${game.player2.score}`;
//     // console.log(`${game}`)
//     playGame();
// } // endTheRound()

// /**
//  * Displays the game ending dialog
//  */
// function endGame() {
//     fldNumRounds.removeAttribute(`disabled`);
//     let h2 = node(`h2`)
//     h2.appendChild(textNode(`The game has ended:`));
//     finalSection.appendChild(h2);
//     let p1 = node(`p`);
//     p1.appendChild(textNode(`${game.player1.username}'s score is: ${game.player1.score}`));
//     finalSection.appendChild(p1);
//     let p2 = node(`p`);
//     p2.appendChild(textNode(`${game.player2.username}'s score is: ${game.player2.score}`));
//     finalSection.appendChild(p2);
//     let p3 = node(`p`);
//     p3.appendChild(textNode(`${game.getWinner()}`));
//     finalSection.appendChild(p3);
//     let btnNewGame = node(`button`);
//     btnNewGame.textContent = `New Game`;
//     finalSection.appendChild(btnNewGame);
//     finalResults.appendChild(finalSection)
//     btnNewGame.addEventListener(`click`, () => location.reload());
//     let btnLeaveGame = node(`button`);
//     btnLeaveGame.textContent = `Leave Game`;
//     finalSection.appendChild(btnLeaveGame);
//     btnLeaveGame.onclick = () => location.href = "./goodbye.html";
//     console.log(`${game}`);
// } // endGame()

