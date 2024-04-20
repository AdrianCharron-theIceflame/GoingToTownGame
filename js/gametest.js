"use strict";

/* 
This is the scenario that was described in the document 'Going To Town.docx'
I have also described it in my breakdown.
Adrian is Player 1
John is player 2 
*/

console.log(`--------------------------------------------------------------------`);
console.log(`Example Scenario from 'Going to Town.docx'`);

// First, create the player objects.
const adrian = new Player(`Charron`, `Adrian`, `SpellBreaker3`, `a@a.a`, `111-111-1111`, 0);
const john = new Player(`Doe`, `John`, `JDWinner`);

// Test players' full names
console.log(`${adrian.fullName}\n${john.fullName}`);

// The players' information
console.log(`${adrian}`);
console.log(`${john}`);

/*
Second, crete the game.
Use the 2 player objects
*/
const game1 = new GoingToTown(adrian, john, 2);

/* 
Create 2 DiceRolls objects unique to each player
*/
const adrianRolls = new DiceRolls(adrian);
const johnRolls = new DiceRolls(john);

// test GoingToTown.toString()
console.log(`${game1}`);

// Set round 1 dice rolls for player 1
adrianRolls.addDiceSet(6, 4, 2);
adrianRolls.addDiceSet(3, 2);
adrianRolls.addDiceSet(5);

// Set round 1 dice rolls for player 2
johnRolls.addDiceSet(3, 5, 1);
johnRolls.addDiceSet(1, 1);
johnRolls.addDiceSet(1);

// See scores for the round
console.log(`${adrianRolls}\n${johnRolls}`);

// End the round with each player's score as parameters
console.log(game1.endRound(adrianRolls.roundScore, johnRolls.roundScore));

// See the status of the game
console.log(`${game1}`);

// Clear last round's the scores for both players
adrianRolls.clearRound();
johnRolls.clearRound();

// Set round 2 dice rolls for player 1
adrianRolls.addDiceSet(2, 1, 2);
adrianRolls.addDiceSet(1, 1);
adrianRolls.addDiceSet(2);

// Set round 2 dice rolls for player 2
johnRolls.addDiceSet(6, 5, 1);
johnRolls.addDiceSet(5, 1);
johnRolls.addDiceSet(6);

// See scores for the round
console.log(`${adrianRolls}\n${johnRolls}`);

/*
End the round with each player's score as parameters
Final round ends the game and displays the winner
*/
console.log(game1.endRound(adrianRolls.roundScore, johnRolls.roundScore));

// If the GoingToTown.endRound() is used again, the game will display that it is over. 
console.log(game1.endRound(adrianRolls.roundScore, johnRolls.roundScore));

// See the status of the game
console.log(`${game1}`);
console.log(`--------------------------------------------------------------------`);

/* Game 2 features random rolls */
console.log(`New game with random rolls`)
const adrian2 = new Player(`Charron`, `Adrian`, `theIceflameDagger`);
const john2 = new Player(`Doe`, `John`, `JDWinner`);

const game2 = new GoingToTown(adrian2, john2, 3);

const adrianRolls2 = new DiceRolls(adrian2);
const johnRolls2 = new DiceRolls(john2);

/* Rolling the dice: Round 1 */
let adrianDice = DiceRolls.rollDice(3);
adrianRolls2.addDiceSet(adrianDice[0], adrianDice[1], adrianDice[2]);
adrianDice = DiceRolls.rollDice(2);
adrianRolls2.addDiceSet(adrianDice[0], adrianDice[1]);
adrianDice = DiceRolls.rollDice();
adrianRolls2.addDiceSet(adrianDice[0]);

let johnDice = DiceRolls.rollDice(3);
johnRolls2.addDiceSet(johnDice[0], johnDice[1], johnDice[2]);
johnDice = DiceRolls.rollDice(2);
johnRolls2.addDiceSet(johnDice[0], johnDice[1]);
johnDice = DiceRolls.rollDice();
johnRolls2.addDiceSet(johnDice[0]);

/* Displaying the results */
console.log(`${adrianRolls2}\n${johnRolls2}`)
// Round 1 end
console.log(game2.endRound(adrianRolls2.roundScore, johnRolls2.roundScore));
// clear round scores
adrianRolls2.clearRound();
johnRolls2.clearRound();



/* Rolling the dice: Round 2 */
adrianDice = DiceRolls.rollDice(3);
adrianRolls2.addDiceSet(adrianDice[0], adrianDice[1], adrianDice[2]);
adrianDice = DiceRolls.rollDice(2);
adrianRolls2.addDiceSet(adrianDice[0], adrianDice[1]);
adrianDice = DiceRolls.rollDice();
adrianRolls2.addDiceSet(adrianDice[0]);

johnDice = DiceRolls.rollDice(3);
johnRolls2.addDiceSet(johnDice[0], johnDice[1], johnDice[2]);
johnDice = DiceRolls.rollDice(2);
johnRolls2.addDiceSet(johnDice[0], johnDice[1]);
johnDice = DiceRolls.rollDice();
johnRolls2.addDiceSet(johnDice[0]);

/* Displaying the results */
console.log(`${adrianRolls2}\n${johnRolls2}`)
// Round 2 end
console.log(game2.endRound(adrianRolls2.roundScore, johnRolls2.roundScore));
// clear round scores
adrianRolls2.clearRound();
johnRolls2.clearRound();

/* Rolling the dice: Round 3 */
adrianDice = DiceRolls.rollDice(3);
adrianRolls2.addDiceSet(adrianDice[0], adrianDice[1], adrianDice[2]);
adrianDice = DiceRolls.rollDice(2);
adrianRolls2.addDiceSet(adrianDice[0], adrianDice[1]);
adrianDice = DiceRolls.rollDice();
adrianRolls2.addDiceSet(adrianDice[0]);

johnDice = DiceRolls.rollDice(3);
johnRolls2.addDiceSet(johnDice[0], johnDice[1], johnDice[2]);
johnDice = DiceRolls.rollDice(2);
johnRolls2.addDiceSet(johnDice[0], johnDice[1]);
johnDice = DiceRolls.rollDice();
johnRolls2.addDiceSet(johnDice[0]);

/* Displaying the results */
console.log(`${adrianRolls2}\n${johnRolls2}`)
// Round 3 end
console.log(game2.endRound(adrianRolls2.roundScore, johnRolls2.roundScore));
// clear round scores
adrianRolls2.clearRound();
johnRolls2.clearRound();

console.log(`--------------------------------------------------------------------`);

/*
Testing the return value codes of DiceRolls.addDiceSet()
*/
console.log(`Testing DiceRolls.addDiceSet`)
console.log(`--------------------------------------------------------------------`);
function testAddDiceSet() {
    const diceTest = new DiceRolls();
    if (diceTest.addDiceSet(1) === 0) {
        console.log(`addDiceSet(1) works`);
        if (diceTest.addDiceSet(1, 1) === 0) {
            console.log(`addDiceSet(1,1) works`);
            if (diceTest.addDiceSet(1, 1, 1) === 0) {
                console.log(`addDiceSet(1,1,1) works`);
                if (diceTest.addDiceSet(`aa`, `aa`, `aa`) === -1) {
                    console.log(`adDiceSet(String,String,String) works`);
                    if (diceTest.addDiceSet(`aa`, `aa`) === -1) {
                        console.log(`addDiceSet(String,String) works`);
                        if (diceTest.addDiceSet(`aa`) === -1) {
                            console.log(`addDiceSet(String) works`);
                            if (diceTest.addDiceSet(0, 0, 0) === -2) {
                                console.log(`addDiceSet(0,0,0) works`);
                                if (diceTest.addDiceSet(0, 0) === -2) {
                                    console.log(`addDiceSet(0,0) works`);
                                    if (diceTest.addDiceSet(0) === -2) {
                                        console.log(`addDiceSet(0) works`);
                                        if (diceTest.addDiceSet() === -3) {
                                            console.log(`addDiceSet() works`);
                                            if (diceTest.addDiceSet(1, 1, 1, 1) === -4) {
                                                console.log(`addDiceSet(1,1,1,1) works`);
                                                console.log(`DiceRolls.addDiceSet() works`);
                                            } // if too many parameters return fail
                                            else
                                                console.error(`addDiceSet(1,1,1,1) did not work`);
                                        } // if no parameters returns fail
                                        else
                                            console.error(`addDiceSet() did not work`);
                                    } // if 1 invalid number returns fail
                                    else
                                        console.error(`addDiceSet(0) did not work`);
                                } // if 2 invalid numbers return fail
                                else
                                    console.error(`addDiceSet(0,0) did not work`);
                            } // if 3 invalid numbers return fail
                            else
                                console.error(`addDiceSet(0,0,0) did not work`);
                        } // if 1 string returns fail
                        else
                            console.error(`addDiceSet(String) did not work`);
                    } // if 2 strings return fail
                    else
                        console.error(`addDiceSet(String,String) did not work`);
                } // if 3 strings return fail
                else
                    console.error(`adDiceSet(String,String,String) did not work`);
            } // if 3 valid dice numbers work
            else
                console.error(`addDiceSet(1,1,1) did not work`);
        } // if 2 valid dice numbers work
        else
            console.error(`addDiceSet(1,1) did not work`);
    } // if 1 valid dice number works
    else
        console.error(`addDiceSet(1) did not work`);
} // testAddDiceSet()

// call the test
testAddDiceSet();
console.log(`--------------------------------------------------------------------\nEnd of gametest.js`);