import { createMessageView } from "./message-view"
import { render, userEvent } from "test-utils"

const createMessageViewMock = props => {
  const onClick = jest.fn()

  const mock = createMessageView({
    onClick,
    ...props,
  })

  return {
    ...mock,
    onClick,
  }
}

describe("Message View", () => {
  it(`renders initial view with "Hello, world!" message`, () => {
    const message = "Hello, world!"
    const { view } = createMessageViewMock({
      message,
    })
    const { getByText } = render(view)

    expect(getByText(message)).toBeInTheDocument()
  })

  it(`renders button and handles click event`, () => {
    const buttonText = "click me"
    const { view, onClick } = createMessageViewMock({ buttonText })
    const { getByText, getByRole } = render(view)

    expect(getByText(buttonText)).toBeInTheDocument()

    userEvent.click(getByRole("button", { name: buttonText }))

    expect(onClick).toHaveBeenCalled()
  })
})
