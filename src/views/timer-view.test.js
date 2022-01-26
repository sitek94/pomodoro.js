import { render, userEvent } from "test-utils"
import { createTimerView } from "views/timer-view"

const createTimerViewMock = props => {
  const onStart = jest.fn()
  const onStop = jest.fn()
  const onReset = jest.fn()

  const mock = createTimerView({
    onStart,
    onStop,
    onReset,
    ...props,
  })

  return {
    ...mock,
    onStart,
    onStop,
    onReset,
  }
}

describe("Timer View", () => {
  it(`renders initial view with "time left" set to 300`, () => {
    const { view } = createTimerViewMock({
      timeLeft: 300,
    })
    const { getByText } = render(view)

    for (let text of ["300", "start", "stop", "reset"]) {
      expect(getByText(text)).toBeInTheDocument()
    }
  })

  it("calls onStart, onStop and onReset", () => {
    const { view, onStart, onStop, onReset } = createTimerViewMock({
      timeLeft: 300,
    })
    const { getByText } = render(view)

    const startButton = getByText("start")
    userEvent.click(startButton)
    expect(onStart).toHaveBeenCalled()

    const stopButton = getByText("stop")
    userEvent.click(stopButton)
    expect(onStop).toHaveBeenCalled()

    const resetButton = getByText("reset")
    userEvent.click(resetButton)
    expect(onReset).toHaveBeenCalled()
  })

  it(`updates "timeLeft" using "updateTimeLeft" method`, () => {
    const { view, updateTimeLeft } = createTimerViewMock({
      timeLeft: 300,
    })
    const { getByText } = render(view)

    updateTimeLeft(100)
    expect(getByText("100")).toBeInTheDocument()

    updateTimeLeft(200)
    expect(getByText("200")).toBeInTheDocument()
  })
})
