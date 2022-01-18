import { getByText } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"

describe("index.html", () => {
  it("should have a header", () => {
    let { container } = global
    expect(getByText(container, "pomodoro.js 🍅")).toBeInTheDocument()
  })
})
