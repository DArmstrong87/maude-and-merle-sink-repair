import { getRequests, getPlumbers, saveCompletion, applicationState, getCompletions } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

const completeTicket = () => {
    const requests = getRequests()
    const completions = getCompletions()

    completions.forEach(
        (completed) => {
            for (const request of requests) {
                return completed.id === request.id
            }
        }
    )
    requests.forEach(
        (request) => {
            for (const completed of completions) {
                if (completed.id === request.id) {
                    request.isComplete = true
                }
            }
        }
    )
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
    let html = ''
    if (request.isComplete === false) {
        html += `<section class="eachLine">
        <li class="request__list__li">🛠 ${request.description}</li>
            <select class="plumbers" id="plumbers">
                <option value="" class="plumber-option">Complete</option>
                    ${plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
            }
            </select>
            
            <button class="request__delete" id="request--${request.id}">
            Delete</button></section>`
    } else {
        html += `<section class="request__completed">
            <li class="request__list__li">🛠 ${request.description} -- Completed
            </li><button class="request__delete" id="request--${request.id}">
            Delete</button></section>`
    }

    return html
}

export const Requests = () => {
    const requests = getRequests()

    let html = '<ul class="request__list">'
    const requestList = requests.map(listRequests)

    html += requestList.join("")
    html += '</ul>'

    return html
}