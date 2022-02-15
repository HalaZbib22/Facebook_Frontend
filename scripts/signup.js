const validateEmail = (email) => {
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
    //validate input
    if (!email || !pass || !validateEmail(email) || !first_name || !last_name) { // add || pass.length < 6 
        document.querySelector('.modal-footer .status').textContent = "Please enter the above correctly"
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
    }
}

document.querySelector('.CreateButton button').addEventListener('click', signUp)