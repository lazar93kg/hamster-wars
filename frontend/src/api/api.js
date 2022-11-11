
const baseURL = "http://localhost:4000/";

export const fetchHamster = async () => {
    const responce = await fetch(`${baseURL}api/hamsters`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    const getHamser = await responce.json()

    if (responce.ok) {
        return getHamser
    } else {
        console.log("Error")
    }
}

export const fetchOneHamster = async (_id) => {
    const responce = await fetch(`${baseURL}api/hamsters/` + _id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    const getHamser = await responce.json()

    if (responce.ok) {
        return getHamser
    } else {
        console.log("Error")
    }
}
export const deleteHamster = async (_id) => {
    const responce = await fetch(`${baseURL}api/hamsters/` + _id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })

    const getHamser = await responce.json()

    if (responce.ok) {
        return getHamser
    } else {
        console.log("Error")
    }
}
export const fetchRandomHamsters = async () => {
    const responce = await fetch(`${baseURL}api/hamsters/random`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const randomHamsters = await responce.json()
    if (responce.ok) {
        return randomHamsters
    } else {
        console.log('Error')
    }
}
export const createHamster = async (newHamster) => {
    const responce = await fetch(`${baseURL}api/hamsters/`, {
        body: JSON.stringify(newHamster),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const matchCreated = await responce.json();
    if (responce.ok) {
        return matchCreated
    } else {
        console.log('Error')
    }
}
export const updateWinnerAndLoser = async (_id, losers) => {
    const responce = await fetch(`${baseURL}api/hamsters/` + _id, {
        body: JSON.stringify(losers),
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const matchResult = await responce.json();

    if (responce.ok) {
        return matchResult
    } else {
        console.log("Error")
    }
}



export const createMatch = async (match) => {
    const responce = await fetch(`${baseURL}api/matches`, {
        body: JSON.stringify(match),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const matchCreated = await responce.json();
    if (responce.ok) {
        return matchCreated
    } else {
        console.log("Error")
    }
}

export const fetchWinners = async () => {
    const responce = await fetch(`${baseURL}api/matches/winners`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const getWinners = await responce.json()

    if (responce.ok) {
        return getWinners
    } else {
        console.log("Error")
    }
}

export const fetchLosers = async () => {
    const responce = await fetch(`${baseURL}api/matches/losers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const getWinners = await responce.json()

    if (responce.ok) {
        return getWinners
    } else {
        console.log("Error")
    }
}
export const fetchMatches = async () => {
    const responce = await fetch(`${baseURL}api/matches`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const getMatches = await responce.json()

    if (responce.ok) {
        return getMatches

    } else {
        console.log("Error")
    }
}
export const deleteMatch = async (_id) => {
    const responce = await fetch(`${baseURL}api/matches/` + _id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const deleteMatch = await responce.json()
    if (responce.ok) {
        return deleteMatch
    } else {
        console.log("Error")
    }

}

export const fetchMatchWinner = async (_id) => {
    const responce = await fetch(`${baseURL}api//matchWinners/` + _id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    const getMatchWinner = await responce.json()

    if (responce.ok) {
        return getMatchWinner
    } else {
        console.log("Error")
    }
}