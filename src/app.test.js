import { createApp } from "./app.js"
import { getByRole, getByText } from "@testing-library/dom"
import "@testing-library/jest-dom"

describe("App", () => {
  it("should render timer (set to 300), start, stop and reset buttons", () => {
    const container = createApp({ workTime: 300, interval: 1 })

    getByText(container, "300")
    getByRole(container, "button", { name: "start" })
    getByRole(container, "button", { name: "stop" })
    getByRole(container, "button", { name: "reset" })
  })

  it.todo("starts timer when start button is clicked")
  it.todo("stops timer when stop button is clicked")
  it.todo("resets timer when reset button is clicked")
  it.todo("updates timer when interval is changed")
  it.todo("should show 0 when timer has finished")
})
