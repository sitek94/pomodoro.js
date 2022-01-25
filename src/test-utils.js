import { getQueriesForElement } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"

/**
 * Simplified version of render function from @testing-library/react
 * https://github.com/testing-library/react-testing-library/blob/main/src/pure.js#L31
 */
export function render(ui) {
  let container = document.body.appendChild(document.createElement("div"))
  container.appendChild(ui)
  return {
    container,
    ...getQueriesForElement(container),
  }
}
// Re-export userEvent for convenience
export { userEvent }
