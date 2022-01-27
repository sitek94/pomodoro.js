import { TimerView } from "./timer-view"

const INTERVAL = 1

const RUNNING = "RUNNING"
const IDLE = "IDLE"

export function Timer({ timeLeft: initialTimeLeft, onEnd }) {
  let timeLeft = initialTimeLeft
  let timeoutId
  let phase = IDLE

  const view = TimerView({
    timeLeft,
    onStart: startTimer,
    onStop: stopTimer,
    onReset: resetTimer,
  })

  function tick() {
    view.setTimerText(timeLeft)
    if (timeLeft === 0) {
      clearTimeout(timeoutId)
      onEnd?.()
    } else {
      timeoutId = setTimeout(() => {
        timeLeft--
        tick()
      }, INTERVAL)
    }
  }

  function startTimer() {
    if (phase === RUNNING) {
      return
    }
    phase = RUNNING
    tick()
  }

  function stopTimer() {
    phase = IDLE
    clearTimeout(timeoutId)
  }

  function resetTimer() {
    phase = IDLE
    clearTimeout(timeoutId)

    timeLeft = initialTimeLeft
    view.setTimerText(initialTimeLeft)
  }

  return view
}
