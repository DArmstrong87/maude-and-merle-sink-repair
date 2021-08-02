import { getRequests } from "./dataAccess.js";


const listRequests = (request) => {
    let html = `<li>
            ${request.description}
            </li>`

    return html
}

export const Requests = () => {
    const requests = getRequests()

    let html = '<ul>'
    const requestList = requests.map(listRequests)

    html += requestList.join("")
    html += '</ul>'

    return html
}