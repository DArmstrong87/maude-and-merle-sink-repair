import { getRequests, getPlumbers, saveCompletion, applicationState, fetchCompletions } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

const completeTicket = () => {
    const requests = getRequests()
    applicationState.completions.forEach(
        (completed) => {
            for(const request of requests){
                return completed.id === request.id
            }
        }
    ).isComplete = true
}

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            const completedTicketToAPI = {
                id: requestId,
                plumber: plumberId,
                date_created: Date.now()
            }
            saveCompletion(completedTicketToAPI)
            completeTicket()
        }
    }
)

const listRequests = (request) => {
    const plumbers = getPlumbers()
    return `
    <li class="request__list__li">
        🛠 ${request.description}
        <select class="plumbers" id="plumbers">
            <option value="" class="plumber-option">Choose</option>
            ${plumbers.map(
        plumber => {
            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
        }
    ).join("")
        }
            </select>
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li >
    `
}

export const Requests = () => {
    const requests = getRequests()

    let html = '<ul class="request__list">'
    const requestList = requests.map(listRequests)

    html += requestList.join("")
    html += '</ul>'

    return html
}