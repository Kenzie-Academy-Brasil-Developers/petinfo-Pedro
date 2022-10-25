import { createSpinner } from "./spinner.js"
import { toltip } from "./toltip.js"

const baseUrl = "http://localhost:3333/"

export const register = async (body) => {

  const btnRegister = document.getElementById("btn-register")
  btnRegister.innerHTML = ""
  btnRegister.appendChild(createSpinner())
  document.getElementById("email-exists").classList.add("transparent")

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  }

  try {

    const responseJson = await fetch(`${baseUrl}users/create`, options)
    const response = await responseJson.json()

    if (responseJson.ok) {
      document.getElementById("email-exists").classList.add("transparent")

      document.querySelector("body").appendChild(toltip("register"))

      setTimeout(() => {
        window.location.replace("../../index.html")

        btnRegister.innerHTML = ""
        btnRegister.innerText = "Cadastrar"
      }, 4000);

    } else if (response.message.includes("Email já cadastrado")) {

      setTimeout(() => {
        document.getElementById("email-exists").innerText = "Usuário já cadastrado"
        document.getElementById("email-exists").classList.remove("transparent")

        btnRegister.innerHTML = ""
        btnRegister.innerText = "Cadastrar"
      }, 1000);
    } else {

      setTimeout(() => {
        document.getElementById("email-exists").innerText = "Algo deu errado"

        document.getElementById("email-exists").classList.remove("transparent")

        btnRegister.innerHTML = ""
        btnRegister.innerText = "Cadastrar"
      }, 1000);
    }

    return response

  } catch (err) {
    console.log(err)


    const toltipNew = toltip()
    document.querySelector("body").appendChild(toltipNew)

    setTimeout(() => {
      document.getElementById("email-exists").innerText = "Algo deu errado"

      document.getElementById("email-exists").classList.remove("transparent")
      btnRegister.innerHTML = ""
      btnRegister.innerText = "Cadastrar"

      toltipNew.remove()
    }, 4000);
  }
}

export const login = async (body) => {
  const btnLogin = document.getElementById("btn-access")
  btnLogin.innerHTML = ""
  btnLogin.appendChild(createSpinner())
  document.getElementById("wrong-password-span").classList.add("transparent")

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }

  try {
    const responseJson = await fetch(`${baseUrl}login`, options)
    const response = await responseJson.json()

    if (responseJson.ok) {
      localStorage.setItem("token", JSON.stringify(response.token))

      setTimeout(() => {

        window.location.replace("./pages/home/index.html")

        btnLogin.innerHTML = ""
        btnLogin.innerText = "Acessar"

      }, 1000);

    } else {

      setTimeout(() => {

        document.getElementById("wrong-password-span").classList.remove("transparent")

        btnLogin.innerHTML = ""
        btnLogin.innerText = "Acessar"

      }, 1000);
    }

    return response

  } catch (err) {
    console.log(err)

    const toltipNew = toltip()
    document.querySelector("body").appendChild(toltipNew)

    setTimeout(() => {

      btnLogin.innerHTML = ""
      btnLogin.innerText = "Acessar"

      toltipNew.remove()
    }, 4000);
  }
}

export const getUserData = async (token) => {

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  try {
    const responseJson = await fetch(`${baseUrl}users/profile`, options)
    const response = await responseJson.json()

    return response

  } catch (err) {
    console.log(err)

    const toltipNew = toltip()
    document.querySelector("body").appendChild(toltipNew)

    setTimeout(() => {
      toltipNew.remove()
    }, 4000);
  }
}

export const getAllPosts = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  try {
    const responseJson = await fetch(`${baseUrl}posts`, options)
    const response = await responseJson.json()

    return response
  } catch (err) {
    console.log(err)

    const toltipNew = toltip()
    document.querySelector("body").appendChild(toltipNew)

    setTimeout(() => {
      toltipNew.remove()
    }, 4000);
  }
}

export const editPost = async (id, token, body) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }

  try {
    const responseJson = await fetch(`${baseUrl}posts/${id}`, options)
    const response = await responseJson.json()

    if (responseJson.ok) {
      const toltipNew = toltip("edit")
      document.querySelector("body").appendChild(toltipNew)

      setTimeout(() => {
        toltipNew.remove()
      }, 4000);

    } else {
      const toltipNew = toltip()
      document.querySelector("body").appendChild(toltipNew)

      setTimeout(() => {
        toltipNew.remove()
      }, 4000);
    }

    return response
  } catch (err) {
    console.log(err)

    const toltipNew = toltip()
    document.querySelector("body").appendChild(toltipNew)

    setTimeout(() => {
      toltipNew.remove()
    }, 4000);
  }
}

export const createPost = async (token, body) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }

  try {

    const responseJson = await fetch(`${baseUrl}posts/create`, options)
    const response = await responseJson.json()

    if (responseJson.ok) {
      const toltipNew = toltip("create")
      document.querySelector("body").appendChild(toltipNew)

      setTimeout(() => {
        toltipNew.remove()
      }, 4000);
    } else {
      const toltipNew = toltip()
      document.querySelector("body").appendChild(toltipNew)

      setTimeout(() => {
        toltipNew.remove()
      }, 4000);
    }

    return response

  } catch (err) {
    console.log(err)

    const toltipNew = toltip()
    document.querySelector("body").appendChild(toltipNew)

    setTimeout(() => {
      toltipNew.remove()
    }, 4000);
  }
}

export const deletePost = async (id, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }

  try {

    const responseJson = await fetch(`${baseUrl}posts/${id}`, options)
    const response = await responseJson.json()

    if (responseJson.ok) {
      const toltipNew = toltip("delete")
      document.querySelector("body").appendChild(toltipNew)

      setTimeout(() => {
        toltipNew.remove()
      }, 4000);
    } else {
      const toltipNew = toltip()
      document.querySelector("body").appendChild(toltipNew)

      setTimeout(() => {
        toltipNew.remove()
      }, 4000);
    }

    return response

  } catch (err) {
    console.log(err)

    const toltipNew = toltip()
    document.querySelector("body").appendChild(toltipNew)

    setTimeout(() => {
      toltipNew.remove()
    }, 4000);
  }
}