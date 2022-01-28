import { Message } from "./components/message"
import { Timer } from "./components/timer"
import gongMP3 from "./assets/gong-1.mp3"

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

function getProps(state) {
  switch (state) {
    case WORK:
      return {
        type: TIMER,
        timeLeft: 25 * 60,
        onEnd: () => {
          playSound()
          setState(AFTER_WORK)
        },
      }

    case AFTER_WORK:
      return {
        type: MESSAGE,
        message: "Easy now!",
        buttonText: "Let's chill a bit",
        onClick: () => setState(BREAK),
      }

    case BREAK:
      return {
        type: TIMER,
        timeLeft: 5 * 60,
        onEnd: () => {
          playSound()
          setState(AFTER_BREAK)
        },
      }

    case AFTER_BREAK:
      return {
        type: MESSAGE,
        message: "Ready to work?",
        buttonText: "Let's go",
        onClick: () => setState(WORK),
      }
  }
}

const audio = new Audio(gongMP3)
function playSound() {
  if (!audio.paused) {
    audio.pause()
    audio.currentTime = 0
  }
  audio.play()
}
