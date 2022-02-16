const AllUsers = async () => {
    let payload = {
        token: localStorage.getItem("token")
    }
    // api call
    let res = await axios.get('http://localhost/facebook-api/api/friendlist.php',payload)
    if (res.message) {
        document.querySelector('.modal-footer .status').textContent = res.message
    }
}