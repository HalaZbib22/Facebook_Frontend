const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


const login = async () => {
    let email = document.getElementById('email').value
    let pass = document.getElementById('password').value
    //validate input
    if (!email || !pass || !validateEmail(email) || pass.length < 6 ) {
        document.querySelector('.notification').textContent = "Please enter the above correctly"
        return;
    }

    let request = {
        "email": email,
        "password": pass
    }
    // api call
    let res = await axios.post('http://localhost/facebook-api/api/login.php', request)
    if (res.message) {
        document.querySelector('.notification').textContent = res.message
        return;
    }

    // store user data
    localStorage.setItem("token", res.token);
    localStorage.setItem("user_id", res.user_id);
    localStorage.setItem("name", res.name);
    localStorage.setItem("email", res.email);
    localStorage.setItem("created_at", res.created_at);

    // redirect to home page
    location.replace("http://localhost/Facebook_frontEnd/pages/home.html")

}

document.querySelector('.LoginButton button').addEventListener('click', login)