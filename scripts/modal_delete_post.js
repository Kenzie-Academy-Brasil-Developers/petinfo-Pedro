import { deletePost, getAllPosts, getUserData } from "./api.js"
import { renderCards } from "./card_post.js"

const modalDeletePost = (id) => {
  const modal = document.createElement("div")
  modal.classList.add("modal")

  const modalWrapper = document.createElement("div")
  modalWrapper.className = "modal-wrapper container"

  const cardHeader = document.createElement("div")
  cardHeader.classList.add("card-header")

  cardHeader.insertAdjacentHTML("afterbegin", 
    `
      <h2 class="text-1 gray-1">
          Confirmação de exclusão
      </h2>
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
  h3.innerText = "Tem certeza que deseja excluir este post?"

  const p = document.createElement("p")
  p.className = "text-3 gray-3"  
  p.innerText = "Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir"     

  const divBtns = document.createElement("div")
  divBtns.classList.add("div-btns-remove-post")

  const btnCancel = document.createElement("button")
  btnCancel.classList.add("close-modal-post")
  btnCancel.innerText = "Cancelar"
  btnCancel.addEventListener("click", () => {
    modal.remove()
  })

  const btnDelete = document.createElement("button")
  btnDelete.classList.add("delete-post")
  btnDelete.innerText = "Sim, excluir este post"  
  btnDelete.addEventListener("click", async () => {
    await deletePost(id, JSON.parse(localStorage.getItem("token")))

    modal.remove()

    await renderCards(await getAllPosts(JSON.parse(localStorage.getItem("token"))), await getUserData(JSON.parse(localStorage.getItem("token"))), JSON.parse(localStorage.getItem("token")))

  })

  divBtns.append(btnCancel, btnDelete) 

  modalWrapper.append(cardHeader, h3, p, divBtns)

  modal.appendChild(modalWrapper)  

  return modal  
}

export const deleteModalControl = (posts) => {
  const body = document.querySelector("body")

  const deleteBtns = [...document.querySelectorAll("[data-control-remove]")]  

  deleteBtns.forEach((btn) => {

    const postId = btn.getAttribute("data-control-remove")

    btn.addEventListener("click", () => {

      body.appendChild(modalDeletePost(postId))
      
    })
  })
}