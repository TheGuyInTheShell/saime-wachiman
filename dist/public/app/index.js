window.$ = q => document.querySelector(q)
import eventSub from "./events/btnSub.js";
import eventUnsub from "./events/btnUnsub.js"
import changeStatus from "./socketsEvents/changeStatus.js";

window.addEventListener("DOMContentLoaded", ()=>{
    const socket = io()
    const btnSub = $('#btnSub')
    const btnUnsub = $('#btnUnsub')
    eventSub(btnSub, btnUnsub)
    eventUnsub(btnSub, btnUnsub)
    socket.on('sv:currentstatus', changeStatus)
    socket.on('sv:changestatus', changeStatus)
})