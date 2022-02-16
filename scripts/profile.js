const base_url = 'http://localhost/facebook-api/api'

const setProfile = () => {

    document.getElementById('user_name').textContent = localStorage.getItem('name')
    document.getElementById('user_email').textContent = localStorage.getItem('email')
    document.getElementById('user_date').textContent = localStorage.getItem('created_at')
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
          <div class="posts__content">${post.content}</div>
          <div class="posts__post__footer">
            <a  id="${post.id}" ><span class="far fa-heart" ></span><span>${post.likes_count}</span></a>
          </div>
        </div>
      </div>
        `
    });
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
}

window.onload = main