import { createApp } from "./app.js"
import { getQueriesForElement, fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom"

describe("App", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it("should render timer (set to 300), start, stop and reset buttons", () => {
    const { getByText, getByRole } = render(createApp({ timeLeft: 300, interval: 1 }))

    expect(getByText("300")).toBeInTheDocument()
    expect(getByRole("button", { name: "start" })).toBeInTheDocument()
    expect(getByRole("button", { name: "stop" })).toBeInTheDocument()
    expect(getByRole("button", { name: "reset" })).toBeInTheDocument()
  })

  it("calls onEnd handler when the timer ends", () => {
    const onEnd = jest.fn()
    const { getByRole } = render(createApp({ timeLeft: 300, interval: 1, onEnd }))

    fireEvent.click(getByRole("button", { name: "start" }))

    jest.runAllTimers()

    expect(onEnd).toHaveBeenCalled()
  })

  it.todo("starts timer when start button is clicked")
  it.todo("stops timer when stop button is clicked")
  it.todo("resets timer when reset button is clicked")
  it.todo("updates timer when interval is changed")
  it.todo("should show 0 when timer has finished")
})

/**
 * Simplified version of render function from @testing-library/react
 * https://github.com/testing-library/react-testing-library/blob/main/src/pure.js#L31
 */
function render(ui) {
  let container = document.body.appendChild(document.createElement("div"))
  container.appendChild(ui)
  return {
    container,
    ...getQueriesForElement(container),
  }
}
