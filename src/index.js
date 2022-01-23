import { createApp, createMessageView } from "./app.js"

const props = {
  timeLeft: 5 * 60,
  interval: 1,
  startTimerOnRender: true,
}
const app = createApp(props)

const root = document.querySelector("#root")
root.appendChild(app)

const messageView = createMessageView({
  message: "Hello World",
  buttonText: "continue",
  onClick: () => alert("clicked"),
})

root.appendChild(messageView)
