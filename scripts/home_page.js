const base_url = 'http://localhost/facebook-api/api'

const postStatus = async () => {
    let input = document.querySelector('.layout__main-postBox-input input')
    let status = input.value
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
    
    let res = await axios.post(`${base_url}/statuses/post_status.php`, request)
    if (res.message) {
        notify.textContent = res.message
        notify.style.color = "rgb(0, 216, 29)"
        input.value = ''
    }
}


const getFeed = async () => {
    let posts = document.querySelector('.posts-container')
    let notify = document.querySelector('.feed-notification')
    let request = {
        token: localStorage.getItem('token')
    }
    
    let res = await axios.post(`${base_url}/statuses/get_feed.php`, request)
    if (res.message) {
        notify.textContent = res.message
        notify.style.display = "block"
        return;
    } else if (res.length === 0) {
        notify.textContent = "Feed is empty"
        notify.style.display = "block"
    }

    //adding posts to html NEED TO FIX image src from api
    res.forEach(post => {
        posts.innerHTML += `
      <div  class="posts">
        <img src="${post.image}" alt="picture" class="posts__author-logo" onerror="this.onerror=null;this.src='../assets/placeholder.png';"/>
        <div class="posts__main">
          <div class="posts__header">
            <div class="posts__author-name">${post.name}</div>
            <div class="posts__author-username">${post.email}</div>
            <div class="posts__publish-time">${post.created_at}</div>
          </div>
          <div class="posts__content">${post.content}</div>
          <div class="posts__post__footer">
            <a  id="${post.id}" class="like-toggler"><span id="${post.is_liked}" class="${post.is_liked ? 'fas' : 'far'} fa-heart" style="${post.is_liked ? 'color:red' : ''}"></span><span>${post.likes_count}</span></a>
            <a id="${post.user_id}" class="profile-button">Profile</a>
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

const goToFriends = async e => {
    let friend_id = parseInt(e.target.id)
    await localStorage.setItem('friend_id', friend_id)
    location.href = "http://localhost/Facebook_frontEnd/pages/friend.html"
}

const getRequests = () => {
    let container = document.querySelector('.requests-container')

    let request = {
        token: localStorage.getItem('token')
        }
    
        let res = await axios.post('', request)
    if (res.message) {
        notify.textContent = res.message
        notify.style.display = "block"
        return;
    } else if (res.length === 0) {
        notify.textContent = "Notifications are empty"
        notify.style.display = "block"
    }

    res.forEach(friend => {
        container.innerHTML += `
        <div  class="posts">
        <img src="${friend.image}" alt="picture" class="posts__author-logo" onerror="this.onerror=null;this.src='../assets/placeholder.png';"/>
        <div class="posts__main">
          <div class="posts__header">
          <div class="posts__author-name">${friend.name}</div>
          <div class="posts__author-username">${friend.email}</div>
            <div class="posts__publish-time">Requested at ${friend.added_at}</div>
          </div>
          <div class="posts__post__footer">
            <div id="${friend.request_id}" class="action-buttons">
                <a class="accept-button">Accept</a>
                <a class="reject-button">Reject</a>
            </div>
          </div>
        </div>
      </div>
        `
    });

}

const acceptFriend = async (e) => {
    let record_id = parseInt(e.target.parentNode.id)
    let notify = document.querySelector('.requests-notf')
    let payload = {
        token: localStorage.getItem('token'),
        friend_id: record_id,
        request: "accepted"
    }
    let res = await axios.post(`${base_url}/users/accept_friend.php`, payload)
    if (res.message === "Accepted") {
        notify.textContent = res.message
        e.target.parentNode.parentNode.parentNode.parentNode.style.display = "none"
        notify.style.display = "block"
        notify.style.color = "green"
        return;
    } else {
        notify.textContent = res.message
        notify.style.display = "block"
        notify.style.color = "red"
    }
}

const rejectFriend = async (e) => {
    let record_id = parseInt(e.target.parentNode.id)
    let notify = document.querySelector('.requests-notf')
    let payload = {
        token: localStorage.getItem('token'),
        friend_id: record_id,
        request: "pending"
    }
    let res = await axios.post(`${base_url}/users/remove_friend.php`, payload)
    if (res.message === "Removed") {
        notify.textContent = res.message
        e.target.parentNode.parentNode.parentNode.parentNode.style.display = "none"
        notify.style.display = "block"
        notify.style.color = "green"
        return;
    } else {
        notify.textContent = res.message
        notify.style.display = "block"
        notify.style.color = "red"
    }
}


const main = async () => {
    await document.querySelector('.layout__main-postBox-PostButton').addEventListener('click', postStatus)

    await getFeed()

    document.querySelectorAll('.like-toggler .fa-heart').forEach(button => button.addEventListener('click', toggleLikeStatus) )
    document.querySelectorAll('.profile-button').forEach(button => button.addEventListener('click', goToFriends) )
}

window.onload = main