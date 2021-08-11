import { getRequests, getPlumbers } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            
            const ticket = {
                request: requestId,
                plumber: plumberId,
                date_created: Date.now()
            }
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {ticket}
            


            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

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