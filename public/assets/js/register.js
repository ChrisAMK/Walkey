// const { use } = require("passport");

$(document).ready(function () {
  // Getting references to our form and input
  var registerForm = $("form.register");
  var firstNameInput = $("input#firstName-input");
  var lastNameInput = $("input#lastName-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var genderInput = $("input#gender-input");

  // When the register button is clicked, we validate the email and password are not blank
  registerForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      gender: genderInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the registerUser function
    registerUser(userData.firstName, userData.lastName, userData.email, userData.password, userData.gender);
    firstNameInput.val("");
    lastNameInput.val("");
    emailInput.val("");
    passwordInput.val("");
    genderInput.val("");
    console.log(firstNameInput, lastNameInput, emailInput, passwordInput, genderInput)
  });

  // Does a post to the register route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function registerUser(firstName, lastName, email, password, gender) {
    $.post("/api/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      gender: gender
    })
      .then(function (data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
