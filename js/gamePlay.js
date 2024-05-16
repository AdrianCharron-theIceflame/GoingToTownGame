"use strict";
const adversary = new Player(`theAI`, `John`, `Jaix1`);
$(function () {
    const userPlayer = new Player(localStorage.getItem(`fname`), localStorage.getItem(`lname`), localStorage.getItem(`username`), localStorage.getItem(`email`), localStorage.getItem(`phone`));
    displayInfo();
    let game = new GoingToTown(userPlayer, adversary);
    // create dice rollers
    const playerDice = new DiceRolls(game.player1);
    const adversaryDice = new DiceRolls(game.player2);
});
// // functions that I will use
const $$ = sel => document.querySelector(sel);
const textNode = text => document.createTextNode(text);
const node = nodeType => document.createElement(nodeType);

// // declare DOM objects
const section = $$(`#playerInformation`);
// const btnStart = $$(`#btnStart`);
// const btnRollDice = $$(`#btnRollDice`);
// const btnEndRound = $$(`#btnEndRound`);
// const fldNumRounds = $$(`#fldNumRounds`);
const playerDiceArea1 = $$(`#playerDiceArea`);

const botDiceArea1 = $$(`#botDiceArea`);
// const playerScore = $$(`#playerScore`);
// const playerFScore = $$(`#playerFScore`);
// const botScore = $$(`#botScore`);
// const botFScore = $$(`#botFScore`);
// const finalResults = $$(`#finalResults`);
// const finalSection = node(`section`)

// // computer player
// // display the info
// window.onload = displayInfo;
// // create a game
// const game = createGame();
// // start the game
// const span = node(`span`);
// const setup = $$(`#setUp`);
// setup.appendChild(span);
// btnStart.setAttribute(`disabled`, ``);
// if (fldNumRounds.value >= 1 && fldNumRounds.value <= 11) {
//     btnStart.removeAttribute(`disabled`);
//     span.textContent = ``;
// }
// else {
//     btnStart.setAttribute(`disabled`, ``);
//     span.textContent = `** Number must be between 1 and 11.`
// }
// fldNumRounds.addEventListener(`blur`, () => {
//     if (fldNumRounds.value >= 1 && fldNumRounds.value <= 11) {
//         btnStart.removeAttribute(`disabled`);
//         span.textContent = ``;
//     }
//     else {
//         btnStart.setAttribute(`disabled`, ``);
//         span.textContent = `** Number must be between 1 and 11.`
//     }
// })

// btnStart.addEventListener(`click`, playGame);


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
    if (!(lastVisit == null)){
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

function newPlayer(){
    localStorage.removeItem(`fname`);
    localStorage.removeItem(`lname`);
    localStorage.removeItem(`username`);
    localStorage.removeItem(`phone`);
    localStorage.removeItem(`city`);
    localStorage.removeItem(`email`);
    localStorage.removeItem(`lastVisit`);
    location.href = "./intro.html";
}


// /**
//  * The gameplay flow
//  */
// function playGame() {
//     btnEndRound.setAttribute(`disabled`, ``)
//     if (!game.isGameFinished) {
//         btnStart.setAttribute(`disabled`, ``);
//         fldNumRounds.setAttribute(`disabled`, ``);
//         btnRollDice.removeAttribute(`disabled`);
//         game.numRounds = Math.floor(Number(fldNumRounds.value));
//         let numDice = 3;
//         btnRollDice.addEventListener(`click`, () => {
//             roll(numDice--)
//         });
//         btnEndRound.addEventListener(`click`, endTheRound);
//     }
//     else {
//         endGame();
//     }
// } // playGame()

// /**
//  * Rolls how many dice are passed
//  * @param {Number} num the number of dice
//  */
// function roll(num) {
//     let rolls = DiceRolls.rollDice(num);
//     let adversRolls = DiceRolls.rollDice(num);
//     if (num == 3) {
//         playerScore.textContent = ``;
//         botScore.textContent = ``;
//         playerDiceArea1.innerHTML = ``;
//         playerDiceArea2.innerHTML = ``;
//         playerDiceArea3.innerHTML = ``;
//         botDiceArea1.innerHTML = ``;
//         botDiceArea2.innerHTML = ``;
//         botDiceArea3.innerHTML = ``;
//         playerDice.clearRound();
//         adversaryDice.clearRound();
//         // User Player
//         let img1 = new Image();
//         img1.src = `./images/DiceSide${rolls[0]}.png`;
//         let img2 = new Image();
//         img2.src = `./images/DiceSide${rolls[1]}.png`;
//         let img3 = new Image();
//         img3.src = `./images/DiceSide${rolls[2]}.png`;
//         let p = node(`p`);
//         p.appendChild(textNode(`Rolls 1: `));
//         playerDiceArea1.appendChild(p);
//         playerDiceArea1.appendChild(img1);
//         playerDiceArea1.appendChild(img2);
//         playerDiceArea1.appendChild(img3);
//         // console.table(rolls)
//         playerDice.addDiceSet(...rolls);
//         playerScore.textContent = `Your score for the round is ${playerDice.roundScore}`
//         // Adversary
//         let img4 = new Image();
//         img4.src = `./images/DiceSide${adversRolls[0]}.png`;
//         let img5 = new Image();
//         img5.src = `./images/DiceSide${adversRolls[1]}.png`;
//         let img6 = new Image();
//         img6.src = `./images/DiceSide${adversRolls[2]}.png`;
//         p = node(`p`);
//         p.appendChild(textNode(`Rolls 1: `));
//         botDiceArea1.appendChild(p);
//         botDiceArea1.appendChild(img4);
//         botDiceArea1.appendChild(img5);
//         botDiceArea1.appendChild(img6);
//         // console.table(adversRolls)
//         adversaryDice.addDiceSet(...adversRolls);
//         botScore.textContent = `Your adversary's score is ${adversaryDice.roundScore}`
//     }
//     if (num == 2) {
//         // User Player
//         let img1 = new Image();
//         img1.src = `./images/DiceSide${rolls[0]}.png`;
//         let img2 = new Image();
//         img2.src = `./images/DiceSide${rolls[1]}.png`;
//         let p = node(`p`);
//         p.appendChild(textNode(`Rolls 2: `));
//         playerDiceArea2.appendChild(p);
//         playerDiceArea2.appendChild(img1);
//         playerDiceArea2.appendChild(img2);
//         // console.table(rolls)
//         playerDice.addDiceSet(...rolls);
//         playerScore.textContent = `Your score for the round is ${playerDice.roundScore}`
//         // Adversary
//         let img3 = new Image();
//         img3.src = `./images/DiceSide${adversRolls[0]}.png`;
//         let img4 = new Image();
//         img4.src = `./images/DiceSide${adversRolls[1]}.png`;
//         p = node(`p`);
//         p.appendChild(textNode(`Rolls 2: `));
//         botDiceArea2.appendChild(p);
//         botDiceArea2.appendChild(img3);
//         botDiceArea2.appendChild(img4);
//         // console.table(adversRolls)
//         adversaryDice.addDiceSet(...adversRolls);
//         botScore.textContent = `Your adversary's score is ${adversaryDice.roundScore}`
//     }
//     if (num == 1) {
//         // User Player
//         let img1 = new Image();
//         img1.src = `./images/DiceSide${rolls[0]}.png`;
//         let p = node(`p`);
//         p.appendChild(textNode(`Rolls 3: `));
//         playerDiceArea3.appendChild(p);
//         playerDiceArea3.appendChild(img1);
//         btnEndRound.removeAttribute(`disabled`);
//         btnRollDice.setAttribute(`disabled`, "");
//         // console.table(rolls)
//         playerDice.addDiceSet(...rolls);
//         playerScore.textContent = `Your score for the round is ${playerDice.roundScore}`
//         // Adversary
//         let img2 = new Image();
//         img2.src = `./images/DiceSide${adversRolls[0]}.png`;
//         p = node(`p`);
//         p.appendChild(textNode(`Rolls 3: `));
//         botDiceArea3.appendChild(p);
//         botDiceArea3.appendChild(img2);
//         // console.table(adversRolls)
//         adversaryDice.addDiceSet(...adversRolls);
//         botScore.textContent = `Your adversary's score is ${adversaryDice.roundScore}`
//     }
// } // roll(number)

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
