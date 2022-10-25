export const createLogout = (user) => {
  const div = document.createElement("div")
  div.className = "logout hidden"
  div.id = "logout"

  div.insertAdjacentHTML("afterbegin", `
  <div>
    <h3 class="text-2 gray-1">
      @${user.username}
    </h3>
  </div>
  `)

  const btnLogout = document.createElement("button")
  btnLogout.innerHTML = `
  <div>
    <img src="../../assets/img/sign-out-alt.png" alt="Logout">
  </div>
  <span class="text-4 gray-1">
    Sair da conta
  </span>
  `

  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("token")

    window.location.replace("../../index.html")
  })

  div.appendChild(btnLogout)

  return div
}

export const avatarAddLogout = (user) => {
  document.getElementById("avatar-header-img").src = user.avatar

  const avatar = document.querySelector(".div-header-wrapper")
  const showLogout = createLogout(user)
  avatar.appendChild(showLogout)

  const btnShowLogout = document.querySelector(".avatar-header")
  btnShowLogout.addEventListener("click", () => {
    showLogout.classList.toggle("hidden")
  })
  
}