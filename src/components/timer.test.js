import { Timer } from "./timer"
import { getQueriesForElement, fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom"

describe("App", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it("should render timer with timeLeft set to 300, start, stop and reset buttons", () => {
    const { getByText, getByRole } = render(Timer({ timeLeft: 300 }))

    expect(getByText("300")).toBeInTheDocument()
    expect(getByRole("button", { name: "start" })).toBeInTheDocument()
    expect(getByRole("button", { name: "stop" })).toBeInTheDocument()
    expect(getByRole("button", { name: "reset" })).toBeInTheDocument()
  })

  it("starts timer when start button is clicked", () => {
    const { getByText, getByRole } = render(Timer({ timeLeft: 300 }))

    fireEvent.click(getByRole("button", { name: "start" }))

    jest.advanceTimersToNextTimer()
    expect(getByText("299")).toBeInTheDocument()
  })

  it("stops timer when stop button is clicked", () => {
    const { getByText, getByRole } = render(Timer({ timeLeft: 300 }))

    fireEvent.click(getByRole("button", { name: "start" }))

    // Advance the timer 3 times
    jest.advanceTimersToNextTimer()
    jest.advanceTimersToNextTimer()
    jest.advanceTimersToNextTimer()

    fireEvent.click(getByRole("button", { name: "stop" }))

    expect(getByText("297")).toBeInTheDocument()

    // These ticks should be ignored, because the timer should be already stopped
    jest.advanceTimersToNextTimer()
    jest.advanceTimersToNextTimer()
    jest.advanceTimersToNextTimer()

    expect(getByText("297")).toBeInTheDocument()
  })

  it("resets timer when reset button is clicked", () => {
    const { getByRole, getByText } = render(Timer({ timeLeft: 300 }))

    fireEvent.click(getByRole("button", { name: "start" }))

    // Advance the timer 3 times
    jest.advanceTimersToNextTimer()
    jest.advanceTimersToNextTimer()
    jest.advanceTimersToNextTimer()

    expect(getByText("297")).toBeInTheDocument()

    fireEvent.click(getByRole("button", { name: "reset" }))

    expect(getByText("300")).toBeInTheDocument()
  })

  it("updates timer when interval is changed", () => {
    const { getByText, getByRole } = render(Timer({ timeLeft: 300 }))

    fireEvent.click(getByRole("button", { name: "start" }))

    jest.advanceTimersToNextTimer()
    expect(getByText("299")).toBeInTheDocument()

    jest.advanceTimersToNextTimer()
    expect(getByText("298")).toBeInTheDocument()

    jest.advanceTimersToNextTimer()
    expect(getByText("297")).toBeInTheDocument()
  })

  it("should show 0 when timer has finished", () => {
    const { getByText, getByRole } = render(Timer({ timeLeft: 300 }))

    fireEvent.click(getByRole("button", { name: "start" }))

    jest.runAllTimers()

    expect(getByText("0")).toBeInTheDocument()
  })

  it("calls onEnd handler when the timer ends", () => {
    const onEnd = jest.fn()
    const { getByRole } = render(Timer({ timeLeft: 300, onEnd }))

    fireEvent.click(getByRole("button", { name: "start" }))

    jest.runAllTimers()

    expect(onEnd).toHaveBeenCalled()
  })

  // I might want to implement this later on, so I'm leaving this test here
  it.skip('should start the timer automatically, when "startTimerOnRender" prop is passed', () => {
    const { getByText } = render(Timer({ timeLeft: 300 }))

    jest.runAllTimers()

    expect(getByText("0")).toBeInTheDocument()
  })
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
