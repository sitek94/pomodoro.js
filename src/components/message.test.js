import { Message } from "./message"
import { render, userEvent } from "test-utils"

describe("Message View", () => {
  it(`renders initial view with "Hello, world!" message`, () => {
    const message = "Hello, world!"
    const { getByText } = render(Message({ message }))

    expect(getByText(message)).toBeInTheDocument()
  })

  it(`renders button and handles click event`, () => {
    const onClick = jest.fn()
    const buttonText = "click me"
    const { getByText, getByRole } = render(Message({ buttonText, onClick }))

    expect(getByText(buttonText)).toBeInTheDocument()

    userEvent.click(getByRole("button", { name: buttonText }))

    expect(onClick).toHaveBeenCalled()
  })
})
