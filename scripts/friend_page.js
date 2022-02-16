const base_url = 'http://localhost/facebook-api/api'

const setProfile = async () => {
    let request = {
        token: localStorage.getItem('token'),
        friend_id: localStorage.getItem('friend_id')
    }
    let res = await axios.post(`${base_url}/users/get_one.php`, request)

    document.getElementById('user_name').textContent = res.name
    localStorage.setItem('friend_name', res.name)
    document.getElementById('user_email').textContent = res.email
    localStorage.setItem('friend_email', res.email)
    document.getElementById('user_date').textContent = res.created_at
}

const getFriendsPosts = async () => {
    let posts = document.querySelector('.posts-container')
    let notify = document.querySelector('.posts-notification')
    let request = {
        token: localStorage.getItem('token'),
        friend_id: parseInt(localStorage.getItem('friend_id'))
    }
    console.log(request)

    let res = await axios.post(`${base_url}/statuses/get_friends_statuses.php`, request)
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
        <img src="${post.image}" alt="picture" class="posts__author-logo" onerror="this.onerror=null;this.src='../assets/placeholder.png';"/>
        <div class="posts__main">
          <div class="posts__header">
            <div class="posts__author-name">${localStorage.getItem('friend_name')}</div>
            <div class="posts__author-username">${localStorage.getItem('friend_email')}</div>
            <div class="posts__publish-time">${post.created_at}</div>
          </div>
          <div class="posts__content">${post.content}</div>
          <div class="posts__post__footer">
            <a  id="${post.id}" class="like-toggler"><span id="${post.is_liked}" class="${post.is_liked ? 'fas' : 'far'} fa-heart" style="${post.is_liked ? 'color:red' : ''}"></span><span>${post.likes_count}</span></a>
          </div>
        </div>
      </div>
        `
    });
}

const toggleLikeStatus = async (e) => {
    // change like with api call and icon on the posts id in html and likes count
    let status = e.target.id == "true"
    console.log(status)
    let post_id = parseInt(e.target.parentNode.id)
    
    let request = {
        token: localStorage.getItem('token'),
        status_id: post_id,
        is_liked: !status
    }
    
    let res = await axios.post(`${base_url}/statuses/like_unlike_status.php`, request)
    if(res.message != "Done"){
        console.log(res)
    }
    // update ids and styles in the likes footer
    let footer = document.getElementById(`${post_id}`)
    footer.lastChild.textContent =  request.is_liked ? parseInt(footer.textContent)+1 : parseInt(footer.textContent)-1

    let span = footer.firstChild
    span.id = request.is_liked
    span.style.color = !status ? 'red' : 'black'

}

const main = async () => {
    await setProfile()
    await getFriendsPosts()
    
    document.querySelectorAll('.like-toggler .fa-heart').forEach(button => button.addEventListener('click', toggleLikeStatus) )
}

window.onload = main