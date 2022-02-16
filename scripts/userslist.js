const base_url = "http://localhost/facebook-api/api";

const AllUsers = async () => {
  let users = document.querySelector("#users-container");
  let request = {
    token: localStorage.getItem("token"),
  };

  let res = await axios.post(`${base_url}/users/get_all.php`, request);

  res.forEach((user) => {
    users.innerHTML += `
        <img class="who-to-add__author-logo" src="${user.profile}" alt="profile" />
        <div class="who-to-add__content">
          <div>
            <div class="who-to-add__author-name">${user.name}</div>
            <div class="who-to-add__author-slug">${user.email}</div>
          </div>
          <div class="who-to-add__button">Add</div>
        </div>
        `;
  });
};

const main = async () => {
    await AllUsers()
    // document
    //   .querySelector(".search-sidebar-Button")
    //   .addEventListener("click", AllUsers);
}

window.onload = main

