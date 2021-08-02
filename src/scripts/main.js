import { SinkRepair } from "./SinkRepair.js"
import { applicationState } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    mainContainer.innerHTML = SinkRepair()
}

render()

