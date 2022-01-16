const isProd = false

const timerNode = document.querySelector("#timer")
const startBtn = document.querySelector("#start")
const stopBtn = document.querySelector("#stop")
const resetBtn = document.querySelector("#reset")

const INTERVAL = isProd ? 1000 : 0.001

let initialTime = 25 * 60
let timeLeft = initialTime
let state = "stopped"

startBtn.addEventListener("click", onStart)
stopBtn.addEventListener("click", onStop)
resetBtn.addEventListener("click", onReset)

let timeoutId = null

function onStart() {
  if (state === "running") {
    return
  }
  state = "running"
  tick()
}

function stopTimer() {
  state = "stopped"
  clearTimeout(timeoutId)
}

function onStop() {
  if (state === "stopped") {
    return
  }
  stopTimer()
}

function onReset() {
  state = "stopped"
  clearTimeout(timeoutId)
  timeLeft = initialTime
  updateTimer(initialTime)
}

function tick() {
  if (timeLeft === 0) {
    return stopTimer()
  }
  if (state === "running") {
    timeoutId = setTimeout(() => {
      timeLeft--
      updateTimer(timeLeft)
      tick()
    }, INTERVAL)
  }
}

function updateTimer(timeLeft) {
  let minutes = Math.floor(timeLeft / 60)
  let seconds = timeLeft % 60

  let time = [minutes, seconds].map(n => String(n).padStart(2, "0")).join(":")
  timerNode.textContent = time
}
