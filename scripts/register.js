import { register } from "./api.js"

export const registerForm = () => {

  const form = document.getElementById("register-form")
  const formElements = [...form.elements]

  const inputs = formElements.filter(e => e.name)
  const btnRegister = document.getElementById("btn-register")

  inputs.forEach((e) => {
    e.addEventListener("input", () => {

      btnRegister.disabled = false
      btnRegister.classList.remove("btn-disabled")

      inputs.forEach((elem) => {       

        if (elem.value == ""){
          btnRegister.disabled = true
          btnRegister.classList.add("btn-disabled")
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

    await register(userData)
  })
}