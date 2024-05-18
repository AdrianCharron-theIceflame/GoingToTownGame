`use strict`;
$(function () { // on load
    let playerScore = localStorage.getItem(`playerScore`); // get player score
    let botScore = localStorage.getItem(`botScore`); // get bot score
    $(`p#playerScore`).text(`Your final score was: ${playerScore}`); // display player score
    $(`p#botScore`).text(`Adversary's final score was: ${botScore}`); // display bot score
    $(`button`).on(`click`, () => { location.href = "./index.html"; }); // if button is clicked, return to index.html
}); // end on load