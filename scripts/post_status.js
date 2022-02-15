const postStatus = async () => {
    let status = document.querySelector('.layout__main-postBox-input input').value
    let notify = document.querySelector('.post-response')
    //validate input
    if (!status) {
        notify.textContent = "Please fill the status"
        notify.style.color = "rgb(192, 4, 4)"
        return;
    }

    let request = {
        token: localStorage.getItem('token'),
        content: status
    }
    
    let res = await axios.post('http://localhost/facebook-api/api/statuses/post_status.php', request)
    if (res.message) {
        notify.textContent = res.message
        notify.style.color = "rgb(0, 216, 29)"
    }
}


document.querySelector('.layout__main-postBox-PostButton').addEventListener('click', postStatus)