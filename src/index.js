import { createApp } from "./app.js"

const root = document.querySelector("#root")

const props = {
  workTime: 5 * 60,
  breakTime: 3 * 60,
  interval: 1,
}

createApp(props, root)
