import "@testing-library/jest-dom/extend-expect"
import { JSDOM } from "jsdom"
import fs from "fs"
import path from "path"

const html = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8")

let dom
global.container = null

global.beforeEach(() => {
  dom = new JSDOM(html, { runScripts: "dangerously" })
  global.container = dom.window.document.body
})
