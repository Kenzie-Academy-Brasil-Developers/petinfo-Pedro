import { login } from "./api.js"

export const loginForm = () => {

  const form = document.getElementById("login-form")
  const formElements = [...form.elements]

  const inputs = formElements.filter(e => e.name)
  const btnAccess = document.getElementById("btn-access")
  
  inputs.forEach((e) => {
    e.addEventListener("input", () => {

      btnAccess.disabled = false
      btnAccess.classList.remove("btn-disabled")

      inputs.forEach((elem) => {       

        if (elem.value == ""){
          btnAccess.disabled = true
          btnAccess.classList.add("btn-disabled")
        }
      })
    })
  })

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const userData = {}    
    
    formElements.forEach((elem) => {
      if (elem.name) {
        userData[elem.name] = elem.value
      }
    })

    await login(userData)
  })
}