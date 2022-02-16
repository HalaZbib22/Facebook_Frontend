// const switchNavBar = e => {

//     let nav_id = e.target.id
//     console.log(nav_id)

//     // topmenu switch
//     // document.querySelectorAll('.navbar-item').forEach(p => p.classList.remove('navbar-item--active'))
//     // document.getElementById(nav_id).classList.add('navbar-item--active')

//     // sidemenu switch
//     document.querySelectorAll('.sidebar-menu__item').forEach(p => p.classList.remove('sidebar-menu__item--active'))
//     document.getElementById(nav_id).classList.add('sidebar-menu__item--active')

//     // redirect
//     if ( nav_id.includes("home") ) {



//         location.href = "http://localhost/Facebook_frontEnd/pages/home.html"
//     } else if ( nav_id.includes("profile") ) {
//         location.href = "http://localhost/Facebook_frontEnd/pages/profile.html"
//     }
// }

// document.querySelectorAll('.navbar-item').forEach(p => p.addEventListener('click', switchNavBar))
// document.querySelectorAll('.sidebar-menu__item').forEach(p => p.addEventListener('click', switchNavBar))