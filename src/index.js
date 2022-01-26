import { createApp } from "./app"
import { createMessageView } from "./views/message-view"

const props = {
  timeLeft: 5 * 60,
  interval: 1,
  startTimerOnRender: true,
}
const app = createApp(props)

const root = document.querySelector("#root")
root.appendChild(app)

const { view: messageView } = createMessageView({
  message: "Hello World",
  buttonText: "continue",
  onClick: () => alert("clicked"),
})

root.appendChild(messageView)
