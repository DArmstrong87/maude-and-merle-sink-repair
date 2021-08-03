import { getRequests } from "./dataAccess.js";


const listRequests = (request) => {
    return `
    <li>
        ${request.description}
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>
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