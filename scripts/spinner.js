export const createSpinner = () => {
  const div = document.createElement("div")
  div.classList.add("spinner")

  div.innerHTML = `🌀`

  return div
}