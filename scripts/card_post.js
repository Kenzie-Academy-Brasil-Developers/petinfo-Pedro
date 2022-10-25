import { renderCreatePost } from "./modal_create_post.js";
import { controlModal } from "./modal_show_post.js"
import { editModalControl } from "./modal_edit_post.js";
import { deleteModalControl } from "./modal_delete_post.js";
import { getAllPosts } from "./api.js";
import { security } from "./security.js";


export const transformDate = (date) => { 
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

  let dateObj = new Date(date)

  let month = months[dateObj.getUTCMonth()]

  let year = dateObj.getUTCFullYear()

  return `${month} de ${year}`
}

export const createCard = (e, user) => {
  const card = document.createElement("li")
  card.classList.add("card")

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

  if (user.email == e.user.email){

    const btnEdit = document.createElement("button")
    btnEdit.classList.add("btn-card")
    btnEdit.setAttribute("data-control-edit", `${e.id}`)
    btnEdit.innerText = "Editar"
  
    const btnDelete = document.createElement("button")
    btnDelete.classList.add("btn-card")
    btnDelete.setAttribute("data-control-remove", `${e.id}`)
    btnDelete.innerText = "Excluir"
  
    btnsHeader.append(btnEdit, btnDelete)
  }  

  cardHeader.appendChild(btnsHeader)

  const h3 = document.createElement("h3")
  h3.className = "title-2 gray-1"
  h3.innerText = e.title

  const p = document.createElement("p")
  p.className = "text-3 gray-3"
  if (e.content.length <= 145){
    p.innerText = e.content
  }else {
    p.innerText = `${e.content.substring(0, 145)}...`
  }

  const btnAccessPost = document.createElement("button")
  btnAccessPost.classList.add("access-post")
  btnAccessPost.setAttribute("data-control-modal", `${e.id}`)
  btnAccessPost.innerText = "Acessar publicação"

  card.append(cardHeader, h3, p, btnAccessPost)

  return card
}

export const renderCards = async (posts, user, token) => {
  security()

  const ul = document.querySelector(".cards-wrapper")
  ul.innerHTML = ""
  
  posts.forEach(post => ul.appendChild(createCard(post, user)))

  await controlModal(await getAllPosts(token))

  await editModalControl(await getAllPosts(token))

  await deleteModalControl(await getAllPosts(token))
}