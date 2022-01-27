export function TimerView({ timeLeft, onStart, onStop, onReset }) {
  const view = document.createElement("div")
  view.id = "timer-view"
  view.innerHTML = `
    <h2 id="time-left" class="display">${timeLeft}</h2>
    <button id="start-btn">start</button>
    <button id="stop-btn">stop</button>
    <button id="reset-btn">reset</button>
  `
  const timer = view.querySelector("#time-left")
  function setTimerText(text) {
    timer.textContent = text
  }

  const buttons = [
    ["#start-btn", onStart],
    ["#stop-btn", onStop],
    ["#reset-btn", onReset],
  ]
  for (const [selector, handler] of buttons) {
    const button = view.querySelector(selector)
    button.addEventListener("click", handler)
  }

  return Object.assign(view, {
    setTimerText,
  })
}
