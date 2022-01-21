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
})
