async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        if (String(response.status).startsWith(4) || String(response.status).startsWith(5)) {
            throw new Error(`Error ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        return []
    }
}

export {
    fetchUsers,
}