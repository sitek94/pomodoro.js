export const createApp = props => {
  const {
    timeLeft: initialTimeLeft,
    interval,
    onEnd = () => {},
    startTimerOnRender = false,
  } = props

  let timeLeft = initialTimeLeft
  let phase = "idle"
  let timeoutId = null

  const root = document.createElement("div")
  root.innerHTML = `
    <div id="timer-view">
      <div id="timer" class="display">${timeLeft}</div>
      <button id="start-btn">start</button>
      <button id="stop-btn">stop</button>
      <button id="reset-btn">reset</button>
    </div>
  `

  const timerView = root.querySelector("#timer-view")
  const timer = timerView.querySelector("#timer")

  if (startTimerOnRender) {
    startTimer()
  }

  function tick() {
    timer.textContent = timeLeft
    if (timeLeft === 0) {
      clearTimeout(timeoutId)
      onEnd()
    } else {
      timeoutId = setTimeout(() => {
        timeLeft--
        tick()
      }, interval)
    }
  }

  function startTimer() {
    if (phase === "running") {
      return
    }
    phase = "running"
    tick()
  }

  function stopTimer() {
    phase = "idle"
    clearTimeout(timeoutId)
  }

  function resetTimer() {
    phase = "idle"
    clearTimeout(timeoutId)

    timeLeft = initialTimeLeft
    timer.textContent = timeLeft
  }

  const buttons = [
    ["#start-btn", startTimer],
    ["#stop-btn", stopTimer],
    ["#reset-btn", resetTimer],
  ]

  for (const [selector, handler] of buttons) {
    const button = timerView.querySelector(selector)
    button.addEventListener("click", handler)
  }

  return root
}
