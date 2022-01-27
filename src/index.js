import { Message } from "./components/message"
import { Timer } from "./components/timer"

const WORK = "WORK"
const AFTER_WORK = "AFTER_WORK"
const BREAK = "BREAK"
const AFTER_BREAK = "AFTER_BREAK"
const TIMER = "TIMER"
const MESSAGE = "MESSAGE"

const INITIAL_STATE = WORK

let state = INITIAL_STATE
function setState(newState) {
  state = newState
  render(state)
}
const next = state => () => setState(state)

function getProps(state) {
  switch (state) {
    case WORK:
      return {
        type: TIMER,
        timeLeft: 25 * 60,
        onStart: next(AFTER_WORK),
      }

    case AFTER_WORK:
      return {
        type: MESSAGE,
        message: "Easy now!",
        buttonText: "Let's chill a bit",
        onClick: next(BREAK),
      }

    case BREAK:
      return {
        type: TIMER,
        timeLeft: 5 * 60,
        onStart: next(AFTER_BREAK),
      }

    case AFTER_BREAK:
      return {
        type: MESSAGE,
        message: "Ready to work?",
        buttonText: "Let's go",
        onClick: next(WORK),
      }
  }
}

function render(state) {
  const props = getProps(state)
  const Component = props.type === TIMER ? Timer : Message
  const view = Component(props)

  const root = document.querySelector("#root")
  root.innerHTML = ""
  root.appendChild(view)
}

render(state)
