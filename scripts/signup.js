const validateSignupEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


const signUp = async () => {
    let first_name = document.getElementById('FN').value
    let last_name = document.getElementById('LN').value
    let email = document.getElementById('signupEmail').value
    let pass = document.getElementById('signupPassword').value
    let is_email_valid = validateSignupEmail(email)
    let notify = document.querySelector('.modal-footer .status')
    //validate input
    if (!email || !pass || !is_email_valid || !first_name || !last_name || pass.length < 6 ) {
        notify.textContent = "Please enter the above correctly"
        notify.style.color = "red"
        return;
    }

    let request = {
        "email": email,
        "name": `${first_name} ${last_name}`,
        "password": pass
    }
    // api call
    let res = await axios.post('http://localhost/facebook-api/api/signup.php', request)
    if (res.message) {
        document.querySelector('.modal-footer .status').textContent = res.message
        document.getElementById('FN').value = ''
        document.getElementById('LN').value = ''
        document.getElementById('signupEmail').value = ''
        document.getElementById('signupPassword').value = ''

        notify.style.color = "green"
    }
}

document.querySelector('.CreateButton button').addEventListener('click', signUp)