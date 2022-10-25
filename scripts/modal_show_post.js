import { transformDate } from "./card_post.js"

const createModalPost = (e) => {
  const modal = document.createElement("div")
  modal.classList.add("modal")

  const modalWrapper = document.createElement("div")
  modalWrapper.className = "modal-wrapper container"

  const cardHeader = document.createElement("div")
  cardHeader.classList.add("card-header")

  cardHeader.insertAdjacentHTML("afterbegin", 
  `
  <div class="card-header-info">

    <div class="card-header-info-name">

      <div class="card-header-info-avatar">
        <img src="${e.user.avatar}" alt="${e.user.username}">
      </div>
      <h4 class="text-4 gray-1"> 
        ${e.user.username}
      </h4>

    </div>

    <span class="text-4 gray-4">
      ${transformDate(e.createdAt)}
    </span>

    </div>
    `
  )

  const btnsHeader = document.createElement("div")
  btnsHeader.classList.add("btns-header")

  const btnCloseModal = document.createElement("button")
  btnCloseModal.classList.add("btn-close-modal")
  btnCloseModal.innerText = "X"  
  btnCloseModal.addEventListener("click", () => {
    modal.remove()
  })

  btnsHeader.append(btnCloseModal)

  cardHeader.appendChild(btnsHeader)

  const h3 = document.createElement("h3")
  h3.className = "title-2 gray-1"
  h3.innerText = e.title

  const p = document.createElement("p")
  p.className = "text-3 gray-3"  
  p.innerText = e.content    

  modalWrapper.append(cardHeader, h3, p)
  modal.appendChild(modalWrapper)

  return modal
}

const renderModal = (post) => {
  const body = document.querySelector("body")

  body.appendChild(createModalPost(post))
}

export const controlModal = (posts) => {

  const btnsControlModal = [...document.querySelectorAll("[data-control-modal]")]

  btnsControlModal.forEach((btn) => {
    const btnId = btn.getAttribute("data-control-modal")

    const post = posts.find(post => post.id == btnId)

    btn.addEventListener("click", () => {
      renderModal(post)
    })
  })
}