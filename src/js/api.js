async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        if (!response.ok) {
            console.error(`Ошибка загрузки пользователей: ${response.status} ${response.statusText}`)
            return []
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Не удалось загрузить пользователей:', error)
        return []
    }
}

export {
    fetchUsers,
}