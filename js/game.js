"use strict";
class Player {

    #lastName;
    #firstName;
    #username;
    #email;
    #phoneNumber;
    #score;

    /**
     * Creates a player object
     * @param {string} lastName
     * @param {string} firstName 
     * @param {string} username 
     * @param {number} [playerScore=0] default 0
     * @param {string} [email="n/a"] default n/a
     * @param {string} [phoneNumber="n/a"] default n/a
     */
    constructor(lastName, firstName, username, email = "n/a", phoneNumber = "n/a", score = 0) {
        this.#lastName = lastName;
        this.#firstName = firstName;
        this.#username = username;
        this.#email = email;
        this.#phoneNumber = phoneNumber;
        this.#score = score;
    } // Player(string, number)

    /**
     * @param {string} name
     */
    set lastName(name) {
        this.#lastName = name;
    } // set lastName(string)

    get lastName() {
        return this.#lastName
    } // get lastName()

    /**
     * @param {string} name
     */
    set firstName(name) {
        this.#firstName = name;
    } // set firstName(name)

    get firstName() {
        return this.#firstName;
    } // get firstName()

    /**
     * @param {string} username
     */
    set username(username) {
        this.#username = username;
    } // set username(string)

    get username() {
        return this.#username;
    } // get username()

    /**
     * @param {string} email
     */
    set email(email) {
        this.#email = email;
    } // set email(string)

    get email() {
        return this.#email;
    } // get email()

    /**
     * @param {string} number
     */
    set phoneNumber(number) {
        this.#phoneNumber = number;
    } // set phoneNumber(string)

    get phoneNumber() {
        return this.#phoneNumber;
    }

    /**
     * @param {number} score
     */
    set score(score) {
        this.#score = score;
    } // set score(number)

    get score() {
        return this.#score;
    }

    get fullName() {
        return `${this.#firstName} ${this.#lastName}`;
    } // get fullName()

    gameScore() {
        return `${this.#username}'s total score is ${this.#score}`;
    }

    toString() {
        return `Name: ${this.fullName}
            \nUsername: ${this.#username}
            \nEmail: ${this.#email}
            \nPhone number: ${this.#phoneNumber}
            \nScore: ${this.#score}`;
    } // toString()
} // Player class

/**
 * 
 */
class GoingToTown {

    #numRounds;
    #currentRound;
    #player1;
    #player2;
    #isGameFinished = false;

    /**
     * Creates a "Going to Town" game.
     * @param {Player} player1
     * @param {Player} player2
     * @param {number} [numRounds=1] default 1
     * @param {number} [currentRound=1] default 1
     */
    constructor(player1, player2, numRounds = 1, currentRound = 1) {
        this.#numRounds = numRounds;
        this.#currentRound = currentRound;
        this.#player1 = player1;
        this.#player2 = player2;
    } // GoingToTown(String, String, number, number)

    /**
     * Sets the number of rounds of the game.
     * @param {number} numRounds 
     */
    set numRounds(numRounds) {
        this.#numRounds = numRounds;
    } // set numRounds(Number)

    get numRounds() {
        return this.#numRounds;
    } // get numRounds()

    /**
     * @param {Player} player
     */
    set player1(player) {
        this.#player1 = player;
    } // set player1Name(String)

    get player1() {
        return this.#player1;
    } // get player1Name()

    /**
     * @param {Player} player
     */
    set player2(player) {
        this.#player2 = player;
    }

    get player2() {
        return this.#player2;
    } // get player2Name()

    /**
     * @param {number} currentRound
     */
    set currentRound(currentRound) {
        this.#currentRound = currentRound;
    } // set currentRound(number)

    get currentRound() {
        return this.#currentRound
    } // get currentRound()

    /**
     * Gets if the game is finished or not.
     * @returns isGameFinished boolean
     */
    get isGameFinished(){
        return this.#isGameFinished;
    }

    /**
     * Gets the winner of the game
     * @returns a message saying which player won.
     */
    #getWinner() {
        if (this.#player1.score > this.#player2.score) {
            return `${this.#player1.username} wins!!`
        } // if player 1 wins
        else if (this.#player1.score < this.#player2.score) {
            return `${this.#player2.username} wins!!`
        } // if player 2 wins
        else {
            return `Both players are tied. It's a draw!!`
        } // if players are tied
    } // getWinner()

    /**
     * Ends the current round of "Going to Town"
     * @param {number} player1Score 
     * @param {number} player2Score
     * @returns a message for end of the round.
     */
    endRound(player1Score, player2Score) {
        if (!this.#isGameFinished) {
            this.#player1.score += player1Score;
            this.#player2.score += player2Score;
            if (this.#currentRound == this.#numRounds) {
                this.#isGameFinished = true;
                return `${this.#getWinner()}
                \n${this.#player1.gameScore()}
                \n${this.#player2.gameScore()}`;
            } // if the current round matches
            else {
                this.#currentRound++;
                return `Round ${this.#currentRound - 1} ended:
                \n${this.#player1.gameScore()}
                \n${this.#player2.gameScore()}`
            } // if the current round is less than number of rounds
        } // if currentRound <= numRounds
        else {
            return `Game has ended. Please start a new game to continue.`
        } // if currentRound > numRounds
    } // endRound(number, number)

    toString() {
        if (this.#currentRound < this.#numRounds) {
            return `This is round ${this.#currentRound}:
            \n${this.#player1.gameScore()},
            \n${this.#player2.gameScore()}.`;
        } // if current round is less than number of rounds
        else if (this.#currentRound == this.#numRounds && !this.#isGameFinished) {
            return `This is the final round:
            \n${this.#player1.gameScore()},
            \n${this.#player2.gameScore()}.`;
        } // if current round is equal to number of rounds
        else {
            return `The game has ended: 
            \n${this.#player1.gameScore()},
            \n${this.#player2.gameScore()}.
            \n${this.#getWinner()}`;
        } // if current round is greater than number of rounds
    } // toString()

} // GoingToTown class

class DiceRolls {

    #roundScore;
    #player;

    /**
     * Creates a DiceRolls object
     * @param {Player} player 
     * @param {number} [roundScore=0] default 0
     */
    constructor(player, roundScore = 0) {
        this.#roundScore = roundScore;
        this.#player = player;
    } // DiceRolls(Player, number)

    /**
     * @param {number} score
     */
    set roundScore(score) {
        this.#roundScore = score;
    } // set roundScore(number)

    get roundScore() {
        return this.#roundScore;
    } // get roundScore()

    /**
     * @param {Player} player 
     */
    set player(player) {
        this.#player = player;
    } // set player(Player)

    get player() {
        return this.#player;
    } // get player()

    /**
     * Rolls an array of dice of the specified amount.
     * @param {number} [numDice=1] The number of dice to be rolled
     * @returns dice, an array of dice
     */
    static rollDice(numDice = 1) {
        const dice = new Array();
        for (let indx = 0; indx < numDice; indx++) {
            dice.push(Math.floor(Math.random() * 6) + 1);
        } // for each die, roll a number between 1 and 6
        return dice;
    } // rollDice

    /**
     * Adds a set of rolled dice
     * @param  {...number} dice 1 to 3 dice
     * @returns 0 if valid,
     * @returns -1 if isNaN,
     * @returns -2 if invalid dice number,
     * @returns -3 if no dice,
     * @returns -4 if too many dice
     */
    addDiceSet(...dice) {
        if (dice.length == 1) {
            if (isNaN(dice[0])) {
                return -1;
            } // if dice[0] is NaN
            else if (dice[0] < 1) {
                return -2;
            } // if dice[0] < 1
            else {
                this.#roundScore += dice[0];
                return 0;
            } // else
        } // if 1 dice rolled
        else if (dice.length == 2) {
            if (isNaN(dice[0]) || isNaN(dice[1])) {
                return -1
            } // if dice are not numbers
            else if (dice[0] < 1 || dice[1] < 1) {
                return -2
            } // if dice[] < 1
            else {
                this.#roundScore += this.#rollSet(dice[0], dice[1])
                return 0;
            } // else
        } // if 2 dice rolled
        else if (dice.length == 3) {
            if (isNaN(dice[0]) || isNaN(dice[1]) || isNaN(dice[2])) {
                return -1
            } // if dice are not numbers
            else if (dice[0] < 1 || dice[1] < 1 || dice[2] < 1) {
                return -2
            } // if dice[] < 1
            else {
                this.#roundScore += this.#rollSet(dice[0], dice[1], dice[2])
                return 0;
            } // else
        } // if 3 dice rolled
        else if (dice.length < 1) {
            return -3;
        } // if dice rolled < 1
        else {
            return -4;
        } // too many dice rolled
    } // addDiceSet(...number)

    /**
     * Clears this round's score
     */
    clearRound() {
        this.#roundScore = 0;
    } // clearRound()

    /**
     * The first dice roll of the round
     * @param {number} dice1 
     * @param {number} dice2 
     * @param {number} dice3 
     * @returns the larges of the 3 dice.
     */
    #rollSet(dice1, dice2, dice3 = 0) {
        if (dice1 >= dice2 && dice1 >= dice3) {
            return dice1
        } // if dice 1 is the largest
        else if (dice2 >= dice1 && dice2 >= dice3) {
            return dice2;
        } // if dice 2 is the largest
        else {
            return dice3;
        } // if dice 3 is the largest
    } // rollFirstSet(number, number, number)

    toString() {
        return `${this.#player.username}'s score for this round is ${this.#roundScore}.`
    } // toString()

} // DiceRolls class