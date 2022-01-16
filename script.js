const isProd = false

// DOM
const timerNode = document.querySelector("#timer")
const startBtn = document.querySelector("#start")
const stopBtn = document.querySelector("#stop")
const resetBtn = document.querySelector("#reset")

const INTERVAL = isProd ? 1000 : 0.001
const INITIAL_TIME = 25 * 60
// Opportunity to read from local storage later on
const INITIAL_COMPLETED_PHASES = 0

// ENUMS
const State = {
  Stopped: "stopped",
  Running: "running",
}
const Phase = {
  Work: "work",
  Break: "break",
}

// STATE
let timeLeft = INITIAL_TIME
let currentState = State.Stopped
let currentPhase = Phase.Work
let completedPhases = INITIAL_COMPLETED_PHASES

let timeoutId = null

// Attach event handlers
startBtn.addEventListener("click", onStart)
stopBtn.addEventListener("click", onStop)
resetBtn.addEventListener("click", onReset)

function onStart() {
  if (currentState === State.Running) {
    return
  }
  currentState = State.Running
  tick()
}

function stopTimer() {
  currentState = State.Stopped
  clearTimeout(timeoutId)
}

function onStop() {
  if (currentState === State.Stopped) {
    return
  }
  stopTimer()
}

function onReset() {
  currentState = State.Stopped
  clearTimeout(timeoutId)
  timeLeft = INITIAL_TIME
  updateTimer(INITIAL_TIME)
}

function tick() {
  if (timeLeft === 0) {
    completedPhases++
    return stopTimer()
  }
  if (currentState === State.Running) {
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
