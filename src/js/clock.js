
export function startClock() {
    const clockElement = document.getElementById('clock')
    if (!clockElement) {
        console.log('Элемент для часов не найден')
        return
    }

    const update = () => {
        clockElement.textContent = new Date().toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        })
    }
    update()
    setInterval(update, 1000)
}