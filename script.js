// On start click the timer should go down

const timerNode = document.querySelector("#timer")
const startBtn = document.querySelector("#start")
const stopBtn = document.querySelector("#stop")
const resetBtn = document.querySelector("#reset")

let initialTime = 25 * 60
let timeLeft = initialTime
let state = "running"

startBtn.addEventListener("click", onStart)
stopBtn.addEventListener("click", onStop)
resetBtn.addEventListener("click", onReset)

let timeoutId = null

function onStart() {
  state = "running"
  tick()
}

function onStop() {
  state = "stopped"
  clearTimeout(timeoutId)
}

function onReset() {
  state = "stopped"
  clearTimeout(timeoutId)
  timeLeft = initialTime
  timerNode.textContent = timeLeft
}

function tick() {
  if (state === "running") {
    timeoutId = setTimeout(() => {
      timeLeft--
      timerNode.textContent = timeLeft
      tick()
    }, 1000)
  }
}
