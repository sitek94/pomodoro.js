import * as tl from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"

describe("index.html", () => {
  it("should have a header", () => {
    const { getByText } = setup()
    expect(getByText("pomodoro.js 🍅")).toBeInTheDocument()
  })
})

function setup() {
  const { container } = global

  return {
    getByText: text => tl.getByText(container, text),
  }
}
