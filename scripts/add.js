const add = async () => {
    let user_id = document.getElementById('FN').value // get user_id
    let friend_id = document.getElementById('LN').value // get friend_id
    //validate input
    let request = {
        "user_id": user_id,
        "friend_id": friend_id
    }
    // api call
    let res = await axios.post('http://localhost/facebook-api/api/add.php', request)
    document.querySelector('.who-to-add__button').textContent = res.message
}

document.querySelector('.who-to-add__button').addEventListener('click', add)