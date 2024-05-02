"use strict";
// query selector function
const $$ = sel => document.querySelector(sel);
// errorClass function
const errorClass = node => node.setAttribute(`class`, `errorClass`);
// noClass function
const noClass = node => node.removeAttribute(`class`);

// declare all nodes
const form = $$(`form`);
const fname = $$(`#fname`);
const fError = $$(`#fError`)
const lname = $$(`#lname`);
const lError = $$(`#lError`)
const username = $$(`#username`);
const userError = $$(`#userError`)
const phone = $$(`#number`);
const phoneError = $$(`#numError`)
const city = $$(`#city`);
const cityError = $$(`#cityError`)
const email = $$(`#email`);
const emailError = $$(`#emailError`)

// form submit
form.onsubmit = validateForm;

function validateForm() {
    let isValid = true;
    // check if all fields are true
    if (!validateFName()) isValid = false;
    if (!validateLName()) isValid = false;
    if (!validateUsername()) isValid = false;
    if (!validatePhone()) isValid = false;
    if (!validateCity()) isValid = false;
    if (!validateEmail()) isValid = false;
    // set values in localStorage
    if (isValid) { // if isValid is still true after validating.
        localStorage.setItem(`fname`, fname.value);
        localStorage.setItem(`lname`, lname.value);
        localStorage.setItem(`username`, username.value);
        localStorage.setItem(`phone`, phone.value);
        localStorage.setItem(`city`, city.value);
        localStorage.setItem(`email`, email.value);
    }
    return isValid;
} // validateForm()

// firstname event listener
fname.addEventListener(`change`, validateFName);

/**
 * Validates the first name field of a form
 * @returns true if pattern is ok, false if pattern does not pass.
 */
function validateFName() {
    let pattern = /^([A-Z]|\s|'|`|-){1,19}([A-Z]|'|-|[^`])?$/i; // The pattern to validate against
    let specialChars = /^([A-Z]|\s|'|`|-)+/i
    let backTick = /.*`$/;
    fError.textContent = "**";
    errorClass(fname); // give field error
    if (pattern.test(fname.value) && !backTick.test(fname.value)) { // if field is valid
        noClass(fname); // remove field error
        fError.textContent = " "; // remove text
        return true;
    }
    if (fname.value.length <= 0) // field is empty
        fError.textContent += ` Field is empty.`;
    if (fname.value.length > 20) // field is longer than 20 chars
        fError.textContent += ` First name length cannot be greater than 20 characters.`;
    if (backTick.test(fname.value)) // last character is a backtick
        fError.textContent += ` First name cannot end with \`.`;
    if (!specialChars.test(lname))// invalid character
        fError.textContent += ` Special characters only include: ', \`, and -.`;
    return false;
} // validateFName()

//lastname event listener
lname.addEventListener(`change`, validateLName);

/**
 * Validates the last name field of a form
 * @returns true if pattern is ok, false if pattern does not pass.
 */
function validateLName() {
    let pattern = /^([A-Z]|\s|'|`|-){1,29}([A-Z]|\s|'|-)?$/i; // The pattern to validate against
    let specialChars = /^([A-Z]|\s|'|`|-)+/i
    let backTick = /.*`$/;
    lError.textContent = "**"; // remove text
    errorClass(lname); // give field error
    if (pattern.test(lname.value) && !backTick.test(lname.value)) { // if field is valid
        noClass(lname); // remove field error
        lError.textContent = " "; // remove text
        return true;
    }
    if (lname.value.length <= 0) // field is empty
        lError.textContent += ` Field is empty.`;
    if (lname.value.length > 30) // field is longer than 20 chars
        lError.textContent += ` Last name length cannot be greater than 30 characters.`;
    if (backTick.test(lname.value)) // last character is a backtick
        lError.textContent += ` Last name cannot end with \`.`;
    if (!specialChars.test(lname))// invalid character
        lError.textContent += ` Special characters only include: ', \`, and -.`;
    return false;
} // validateLName()

// username event listener
username.addEventListener(`change`, validateUsername);

/**
 * Validates the username field of a form
 * @returns true if pattern is ok, false if pattern does not pass.
 */
function validateUsername() {
    let pattern = /^[A-Z][a-z]{3}[1-5]$/; // complete username pattern
    let middleLetter = /^.[a-z]{3}.$/
    let lowercase = /^[A-Z].*$/; // if the first letter is lowercase
    userError.textContent = "**"; // remove error message
    errorClass(username); // set class to error
    if (pattern.test(username.value)) { // if pattern returns true
        noClass(username); // remove error class
        userError.textContent = ""; // remove error message
        return true; // return true
    }
    if (username.value.length <= 0)
        userError.textContent += " Username is empty.";
    if (username.value.length != 5) // if username is too long or too short
        userError.textContent += " Username must be 5 characters long.";
    if (!lowercase.test(username.value)) // if first letter is lowercase
        userError.textContent += " Username must start with an upper-case letter.";
    if (!middleLetter.test(username.value))// 3 lowercase letters in the middle
        userError.textContent += " Between the username and the number, there must be 3 lowercase letters.";
    if (!(Number(username.value.charAt(4)) <= 5 && Number(username.value.charAt(4)) >= 1)) // if last character is not a number
        userError.textContent += " Username must end with a number between 1 and 5.";
    return false; // return false
} // validateUsername()

// phone event listener
phone.addEventListener(`change`, validatePhone)

/**
 * Validates the phone number field of a form
 * @returns true if pattern is ok, false if pattern does not pass.
 */
function validatePhone() {
    let pattern = /^\(\d{3}\)\s\d{3}-\d{4}$/; // phone number pattern
    errorClass(phone); // set class to error
    phoneError.textContent = "**"; // remove error message
    if (pattern.test(phone.value)) { // if pattern return true
        noClass(phone); // remove class
        phoneError.textContent = ""; // remove error message
        return true; // return true
    }
    if (phone.value.length <= 0) // field is empty
        phoneError.textContent += " Phone number is empty.";
    phoneError.textContent += " Pattern must be (###) ###-####. Each # is a number."; // very strict pattern
    return false; // return false
} // validatePhone()

// city event listener
city.addEventListener(`change`, validateCity)

/**
 * Validates the city field on a form
 * @returns true if pattern is ok, false if pattern does not pass.
 */
function validateCity() {
    let pattern = /^[A-Z]{1,42}$/i; // pattern for city name
    errorClass(city); // give error to city
    cityError.textContent = "**"; // remove message
    if (pattern.test(city.value)) { // if city valid
        noClass(city); // remove error
        cityError.textContent = ""; // remove message
        return true; // return true
    }
    if (city.value.length <= 0) // if field is empty
        cityError.textContent += " City is empty.";
    if (city.value.length > 42) // if String is too long
        cityError.textContent += " City can only have a maximum of 42 characters.";
    // Other errors
    cityError.textContent += " City can only contain letters."
    return false; // return false
} // validateCity()

// email event listener
email.addEventListener(`change`, validateEmail)

/**
 * Validates the email field on a form
 * @returns true if pattern is ok, false if pattern does not pass.
 */
function validateEmail() {
    let pattern = /^([A-Z]|-|\.|\d|_)+@([a-z]|\d|_)+(.ca|.org)$/i; // pattern for an email
    let emailEnd = /^.*(.ca|.org)$/i; // pattern for the end of an email
    emailError.textContent = "**"; // remove the meassge
    errorClass(email); // give error class
    if (pattern.test(email.value)) { // if email is valid
        noClass(email); // remove the error class
        emailError.textContent = ""; // remove the meassge
        return true; // return true
    }
    if (email.value.length <= 0) // if email is empty
        emailError.textContent += ` Empty Email.`;
    if (email.value.indexOf('@') == -1) // if '@' is missing
        emailError.textContent += ` Missing @ character in the email.`;
    if (!emailEnd.test(email.value)) // if the end of an email is wrong
        emailError.textContent += ` Email must end in '.ca' or '.org'.`;
    // any other error
    emailError.textContent += ` Email characters can only be letters, digits, '-', '_', or '.'`;
    return false; // return false
} // validateEmail()
