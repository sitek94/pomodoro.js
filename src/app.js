export const createApp = (props, root) => {
  const { workTime, interval } = props

  let timeLeft = workTime
  let phase = "idle"
  let timeoutId = null

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

  function tick() {
    timer.textContent = timeLeft
    if (timeLeft === 0) {
      clearTimeout(timeoutId)
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

    timeLeft = workTime
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
}
