export function createMessageView({ message, buttonText, onClick }) {
  const view = document.createElement("div")
  view.id = "message-view"
  view.innerHTML = `
    <h2 id="message" class="display">${message}</h2>
    <button>${buttonText}</button>
  `

  const button = view.querySelector("button")
  button.addEventListener("click", onClick)

  return view
}
