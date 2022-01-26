export function createMessageView({ message, buttonText, onClick }) {
  const view = document.createElement("div")
  view.id = "message-view"
  view.innerHTML = `
    <div id="message" class="display">${message}</div>
    <button>${buttonText}</button>
  `

  const button = view.querySelector("button")
  button.addEventListener("click", onClick)

  return {
    view,
  }
}
