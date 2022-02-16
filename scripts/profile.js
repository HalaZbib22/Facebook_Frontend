const base_url = 'http://localhost/facebook-api/api'

const setProfile = () => {

    document.getElementById('user_name').textContent = localStorage.getItem('name')
    document.getElementById('user_email').textContent = localStorage.getItem('email')
    document.getElementById('user_date').textContent = 'Joined At: '+localStorage.getItem('created_at')
}


const changeMainDiv = e => {
    let nav_id = e.target.id

    // change nav bar style class
    document.querySelectorAll('.topnav a').forEach(p => p.classList.remove('active'))
    document.querySelector(`#${nav_id}`).classList.add('active')

    // show-hide main divs
    document.querySelectorAll('.main div').forEach(p => p.classList.remove('active'))
    document.querySelector(`.${nav_id}`).classList.add('active')
}

const getPosts = async () => {
    let posts = document.querySelector('#posts-container')
    let notify = document.querySelector('.posts-notification')
    let request = {
        token: localStorage.getItem('token')
    }

    let res = await axios.post(`${base_url}/statuses/get_user_statuses.php`, request)
    if (res.message) {
        notify.textContent = res.message
        notify.style.display = "block"
        return;
    } else if (res.length === 0) {
        notify.textContent = "No Posts Found"
        notify.style.display = "block"
    }

    //adding posts to html NEED TO FIX image src from api
    res.forEach(post => {
        posts.innerHTML += `
      <div  class="posts">
        <div class="posts__main">
          <div class="posts__header">
            <div class="posts__publish-time">${post.created_at}</div>
          </div>
          <div class="posts__content"id="content${post.id}" contenteditable="true">${post.content}</div>
          <div class="posts__post__footer">
            <span class="far fa-heart" ></span><span>${post.likes_count}</span>
            <div id="${post.id}" class="action-buttons">
                <a class="delete-button">Delete</a>
                <a class="edit-button">Edit</a>
            </div>
          </div>
        </div>
      </div>
        `
    });
}

const deletePost = async (e) => {
    let post = parseInt(e.target.parentNode.id)
    let notify = document.querySelector('.posts-notification')
    let request = {
        token: localStorage.getItem('token'),
        status_id: post
    }
    let res = await axios.post(`${base_url}/statuses/delete_status.php`, request)
    if (res.message === "Status Deleted") {
        notify.textContent = res.message
        e.target.parentNode.parentNode.parentNode.style.display = "none"
        notify.style.display = "block"
        notify.style.color = "green"
        return;
    } else {
        notify.textContent = res.message
        notify.style.display = "block"
        notify.style.color = "red"
    }
}

const editPost = async (e) => {
    let post = parseInt(e.target.parentNode.id)
    let notify = document.querySelector('.posts-notification')
    let text = document.getElementById(`content${post}`).textContent
    console.log(text)
    let request = {
        token: localStorage.getItem('token'),
        status_id: post,
        content: text
    }
    let res = await axios.post(`${base_url}/statuses/edit_status.php`, request)
    if (res.message === "Status Updated") {
        notify.textContent = res.message
        notify.style.display = "block"
        notify.style.color = "green"
        return;
    } else {
        notify.textContent = res.message
        notify.style.display = "block"
        notify.style.color = "red"
    }
}

const getFriends = async () => {
}

const getBlocks = async () => {
}

setProfile()
document.querySelectorAll('.topnav a').forEach(e => e.addEventListener('click', changeMainDiv))

const main = async () => {
    setProfile()
    await getPosts()
    await getFriends()
    await getBlocks()
    document.querySelectorAll('.topnav a').forEach(e => e.addEventListener('click', changeMainDiv))
    document.querySelectorAll('.action-buttons .delete-button').forEach(button => button.addEventListener('click', deletePost))
    document.querySelectorAll('.action-buttons .edit-button').forEach(button => button.addEventListener('click', editPost))
}

window.onload = main