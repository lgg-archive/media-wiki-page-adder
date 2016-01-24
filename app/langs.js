function getEl(id){
    return document.getElementById(id);
}

function setLocale(el, msg){
    el.textContent = chrome.i18n.getMessage(msg);
}

function getLocMsg(msg){
    return chrome.i18n.getMessage(msg);
}