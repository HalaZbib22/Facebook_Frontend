const friends = async () => {
    const users = async() => {

        let request = await axios.get('http://localhost/facebook-api/api/friends.php')

    }
    // api call
    let res = await axios.post('http://localhost/facebook-api/api/signup.php', request)
    if (res.message) {
        document.querySelector('.modal-footer .status').textContent = res.message
    }
}

document.querySelector('.CreateButton button').addEventListener('click', friends)