import { createApp } from "./app.js"

const props = {
  workTime: 5 * 60,
  breakTime: 3 * 60,
  interval: 1,
}
const app = createApp(props)

const root = document.querySelector("#root")
root.appendChild(app)
