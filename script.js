////////////////////////////////////////////////////////////////////////////////
// CONSTANTS AND ENUMS
////////////////////////////////////////////////////////////////////////////////
const IS_PROD = false

const ROOT = document.querySelector("#root")

const POMODOROS_UNTIL_LONG_BREAK = 4
const INITIAL_COMPLETED_PHASES = 0
const INTERVAL = IS_PROD ? 1000 : 0.001
const INITIAL_WORK_TIME = 25 * 60
const INITIAL_BREAK_TIME = 5 * 60

// ENUMS
const State = {
  Stopped: "stopped",
  Running: "running",
}

const Phase = {
  Work: "work",
  AfterWork: "after-work",
  Break: "break",
  AfterBreak: "after-break",
}

////////////////////////////////////////////////////////////////////////////////
// APP STATE
////////////////////////////////////////////////////////////////////////////////
let timeLeft = INITIAL_WORK_TIME
let timerState = State.Stopped
let currentPhase = Phase.Work
let completedPhases = INITIAL_COMPLETED_PHASES
let timeoutId = null

// Initial render
render()

////////////////////////////////////////////////////////////////////////////////
// POMODORO TIMER
////////////////////////////////////////////////////////////////////////////////
function tick() {
  if (timeLeft === 0) {
    stopTimer()

    completedPhases++

    currentPhase = getNextPhase(currentPhase)
    timeLeft = getTimeLeft(currentPhase)

    render()
  }

  if (timerState === State.Running) {
    timeoutId = setTimeout(() => {
      timeLeft--
      updateTimer(timeLeft)
      tick()
    }, INTERVAL)
  }
}

function startTimer() {
  if (timerState === State.Running) {
    return
  }
  timerState = State.Running
  tick()
}

function stopTimer() {
  timerState = State.Stopped
  clearTimeout(timeoutId)
}

function resetTimer() {
  stopTimer()
  timeLeft = getTimeLeft(currentPhase)
  updateTimer(timeLeft)
}

function startNextPhase() {
  currentPhase = getNextPhase(currentPhase)
  render()
  resetTimer()
  startTimer()
}

////////////////////////////////////////////////////////////////////////////////
// VIEWS
////////////////////////////////////////////////////////////////////////////////
function render() {
  ROOT.innerHTML = getView(currentPhase)
}

function updateTimer() {
  const timer = document.querySelector("#timer")
  timer.textContent = formatTimeLeft(timeLeft)
}

function getView(phase) {
  switch (phase) {
    case Phase.Work:
      return getTimerView({ timeLeft: getTimeLeft(phase) })

    case Phase.AfterWork:
      return getIntermediateView({
        title: "Break?",
        buttonText: "Start Break",
        pomodorosCompletedToday: completedPhases,
        pomodorosUntilLongBreak: getPomodorosUntilLongBreak(completedPhases),
      })

    case Phase.Break:
      return getTimerView({ timeLeft: getTimeLeft(phase) })

    case Phase.AfterBreak:
      return getIntermediateView({
        title: "Back To Work?",
        buttonText: "Start Work",
        pomodorosCompletedToday: completedPhases,
        pomodorosUntilLongBreak: getPomodorosUntilLongBreak(completedPhases),
      })
  }
}

function getTimerView({ timeLeft }) {
  return `
    <div>
      <div id="timer" class="display">${formatTimeLeft(timeLeft)}</div>
      <button onclick="startTimer()">start</button>
      <button onclick="stopTimer()">stop</button>
      <button onclick="resetTimer()">reset</button>
    </div>
  `
}

function getIntermediateView({
  title,
  buttonText,
  pomodorosUntilLongBreak,
  pomodorosCompletedToday,
}) {
  return `
    <div class="between-session-screen">
      <div class="display">${title}</div>
      <button onclick="startNextPhase()">${buttonText}</button>
      <hr />
      <div>${pomodorosUntilLongBreak} 🍅 until long break</div>
      <div>Completed today: ${pomodorosCompletedToday}</div>
    </div>
  `
}

////////////////////////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////////////////////////

// E.g. 25 minutes for WORK, 5 minutes for BREAK, 0 otherwise
function getTimeLeft(phase) {
  switch (phase) {
    case Phase.Work:
      return INITIAL_WORK_TIME

    case Phase.Break:
      return INITIAL_BREAK_TIME

    default:
      return 0
  }
}

// WORK -> AFTER-WORK -> BREAK -> AFTER-BREAK -> WORK -> ...
function getNextPhase(phase) {
  switch (phase) {
    case Phase.Work:
      return Phase.AfterWork

    case Phase.AfterWork:
      return Phase.Break

    case Phase.Break:
      return Phase.AfterBreak

    case Phase.AfterBreak:
      return Phase.Work
  }
}

// 1500 -> 25:00
function formatTimeLeft(timeLeft) {
  let minutes = Math.floor(timeLeft / 60)
  let seconds = timeLeft % 60

  let time = [minutes, seconds].map(n => String(n).padStart(2, "0")).join(":")
  return time
}

function getPomodorosUntilLongBreak(completed) {
  return POMODOROS_UNTIL_LONG_BREAK - (completed % 4)
}
