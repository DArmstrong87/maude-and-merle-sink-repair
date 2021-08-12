import { getRequests, getPlumbers, saveCompletion, getcompletions } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            const completedTicketToAPI = {
                id: parseInt(requestId),
                plumber: parseInt(plumberId),
                date_completed: Date.now()
            }
            saveCompletion(completedTicketToAPI)
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)

const listRequests = (request) => {
    const plumbers = getPlumbers()
    const completedAssignments = getcompletions()
    const foundCompletedRequest = completedAssignments.filter(
        (completed) => {
            return request.id === completed.id
        }
    )
    let html = ''
    if (foundCompletedRequest) {
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