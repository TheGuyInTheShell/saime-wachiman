const changeStatus = (statusCheck)=> {
    const statusArea = $("#status")
    statusArea.textContent = statusCheck.status
    if (statusCheck.status === 'online') {
        statusArea.classList.remove('text-red')
        statusArea.classList.add('text-green')
    }else{
        statusArea.classList.remove('text-green')
        statusArea.classList.add('text-red')
    }
}
export default changeStatus