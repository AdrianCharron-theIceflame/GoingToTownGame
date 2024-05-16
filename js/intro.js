"use strict";

$(function () { // onload
    let storedFName = localStorage.getItem(`fname`);
    let storedLName = localStorage.getItem(`lname`);
    let storedUsername = localStorage.getItem(`username`);
    let storedPhone = localStorage.getItem(`phone`);
    let storedCity = localStorage.getItem(`city`);
    let storedEmail = localStorage.getItem(`email`);
    let storedLogin = localStorage.getItem(`lastVisit`);
    if (storedFName == null
        && storedLName == null
        && storedUsername == null
        && storedUsername == null
        && storedPhone == null
        && storedCity == null
        && storedEmail == null
        && storedLogin == null) { // if all are null
        $(`form`).validate({ // form validation
            rules: { // rules for inputs
                fname: { // first name
                    required: true,
                    maxlength: 20,
                    pattern: /^([A-Z]|\s|'|`|-){0,19}([^`]|[A-Z]|-|')$/i
                }, // end fname
                lname: { // last name
                    required: true,
                    maxlength: 30,
                    pattern: /^([A-Z]|\s|'|`|-){0,29}([^`]|[A-Z]|-|')$/i
                }, // end lname
                username: { // username
                    required: true,
                    pattern: /^[A-Z][a-z]{3}[1-5]$/
                }, // end username
                number: { // phone number
                    required: true,
                    pattern: /^\(\d{3}\)\s\d{3}-\d{4}$/
                }, // end number
                city: { // city
                    required: true,
                    maxlength: 42,
                    pattern: /^[A-Z]{1,42}$/i
                }, // end city
                email: { // email
                    required: true,
                    email: true
                    // pattern: /^([A-Z]|-|\.|\d|_)+@([a-z]|\d|_)+(.ca|.org)$/i
                } // end email
            }, // end rules
            messages: { // error messages
                fname: { // first name
                    required: "* Please enter your first name.",
                    maxlength: "* Maximum name length of 20 characters.",
                    pattern: "* Special characters: ` ' -<br>Cannot end with: `"
                }, // end fname
                lname: { // last name
                    required: "* Please enter your last name.",
                    maxlength: "* Maximum last name length of 30 characters.",
                    pattern: "* Special characters: ` ' -<br>Cannot end with: `"
                }, // end last name
                username: { // username
                    required: "* Please enter a username",
                    pattern: "* A username is an uppercase letter, followed by 3 lowercase letters, followed by a number from 1 to 5."
                }, // end username
                number: { // phone number
                    required: "* Please enter a phone number.",
                    pattern: "* Pattern must be (###) ###-####. Each # is a number."
                }, // end number
                city: { // city
                    required: "* Please enter your current city.",
                    maxlength: "* A city's name can only contain a maximum of 42 letters.",
                    pattern: "* Invalid letters were entered."
                }, // end city
                email: { // email
                    required: "* Please enter your email",
                    email: `* Please enter a valid email.`
                } // end email
            }, // end messages
            submitHandler: submitForm // submit handler
        }); // end form validation
    } // end if
    else { // else redirect to game
        let lastLogin = new Date();
        localStorage.setItem(`newDate`, lastLogin.toUTCString())
        location.href = "./game.html";
    } // end else
}); // end onload


/**
 * Upon a valid form.
 * @param {HTMLFormElement} form 
 */
function submitForm(form) {
    localStorage.setItem(`fname`, $(`#fname`).val());
    localStorage.setItem(`lname`, $(`#lname`).val());
    localStorage.setItem(`username`, $(`#username`).val());
    localStorage.setItem(`phone`, $(`#number`).val());
    localStorage.setItem(`city`, $(`#city`).val());
    localStorage.setItem(`email`, $(`#email`).val());
    let lastLogin = new Date();
    localStorage.setItem(`newDate`, lastLogin.toUTCString())
    form.submit();
} // submitForm()
