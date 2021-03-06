import { mainContainer } from "./main.js"

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (plumber) => {
                // Store the external state in application state
                applicationState.plumbers = plumber
            }
        )
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completed) => {
                // Store the external state in application state
                applicationState.completions = completed
            }
        )
}

export const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
}

export const getRequests = () => {
    const requests = applicationState.requests
    const completions = applicationState.completions
    for (const request of requests){
        for (const complete of completions){
            if (request.id === complete.id){
                request.isComplete = true
            }
        }
    }
    requests.sort((request) => {
        if(request.isComplete === true){
            return 1
        } else {
            return -1
        }
    })
    return requests.map(request => ({ ...request }))
}
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({ ...plumber }))
}
export const getCompletions = () => {
    return applicationState.completions.map(completed => ({ ...completed }))
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}


export const saveCompletion = (userCompletedTicket) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userCompletedTicket)
    }

    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}