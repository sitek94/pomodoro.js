import { createApp } from "./app.js"

const props = {
  timeLeft: 5 * 60,
  interval: 1,
}
const app = createApp(props)

const root = document.querySelector("#root")
root.appendChild(app)