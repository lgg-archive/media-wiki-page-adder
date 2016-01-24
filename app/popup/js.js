var title, btn,
    mw_add = "/index.php?action=edit&title=";

document.addEventListener('DOMContentLoaded', function () {
    title = document.getElementById("title");
    btn = document.getElementById("btn");

    title.focus();

    loadLangs();

    btn.addEventListener("click", go);
    title.addEventListener("keypress", goEnter);
    document.getElementById("icon-options").addEventListener("click", open_options);
});

function go(){
    getOptions(createUrl);
}

function goEnter(event){
    if(event.which === 13){
        go();
    }
}

function createUrl(url, ssl){
    if(!url){
        open_options();
        return;
    }

    var scheme = "http://";
    if(ssl){
        scheme = "https://";
    }

    url = scheme+ url + mw_add + title.value;
    chrome.tabs.create({ 'url': url });
    //window.open(url);
}

function getOptions(func){
    chrome.storage.sync.get({
        mediawiki_url: "",
        use_ssl: true
    }, function(items) {
        var url = items.mediawiki_url;
        var ssl = items.use_ssl;
        func(url, ssl);
    });
}

function open_options(){
    chrome.tabs.create({ 'url': 'chrome-extension://' + chrome.runtime.id + '/options/options.html' });
}

function loadLangs(){
    document.getElementsByTagName("html")[0].setAttribute('lang', getLocMsg("lang"));

    setLocale(getEl("popup-header"), "popup_header");
    setLocale(getEl("popup-input"), "popup_input");
    setLocale(btn, "popup_add");
}