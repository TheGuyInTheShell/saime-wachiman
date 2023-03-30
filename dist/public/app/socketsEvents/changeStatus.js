const changeStatus = (statusCheck)=> {
    const statusArea = $("#status")
    statusArea.textContent = statusCheck.status
    if (statusCheck.status === 'online') {
        statusArea.classList.remove('text-red')
        statusArea.classList.add('text-green')
    } if(statusCheck.status === 'offline'){
        statusArea.classList.remove('text-green')
        statusArea.classList.add('text-red')
    }
}
export default changeStatus