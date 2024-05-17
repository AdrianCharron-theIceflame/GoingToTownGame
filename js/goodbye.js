`use strict`;
$(function () {
    let playerScore = localStorage.getItem(`playerScore`);
    let botScore = localStorage.getItem(`botScore`);
    $(`p#playerScore`).text(`Your final score was: ${playerScore}`);
    $(`p#botScore`).text(`Adversary's final score was: ${botScore}`);
    $(`button`).on(`click`, () => { location.href = "./index.html"; });
});