document.addEventListener('DOMContentLoaded', function () {
    restore_options();

    loadLangs();

    document.getElementById('save').addEventListener('click', save_options);
});


// Saves options to chrome.storage
function save_options() {
    var url = document.getElementById('url').value;
    var ssl = document.getElementById('ssl').checked;
    chrome.storage.sync.set({
        mediawiki_url: url,
        use_ssl: ssl
    }, function() {
        var status = document.getElementById('status');
        status.textContent = chrome.i18n.getMessage("opt_saved");
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        mediawiki_url: "",
        use_ssl: true
    }, function(items) {
        if(items.mediawiki_url){
            document.getElementById('url').value = items.mediawiki_url;
            document.getElementById('url-wrap').classList.add('is-dirty');
        }

        document.getElementById('ssl').checked = items.use_ssl;
        if(items.use_ssl){
            document.getElementById('ssl-wrap').classList.add('is-checked');
        }
    });
}

function loadLangs(){
    document.title = getLocMsg("opt_title");
    document.getElementsByTagName("html")[0].setAttribute('lang', getLocMsg("lang"));

    setLocale(getEl("opt_title"), "opt_title");
    setLocale(getEl("opt_ssl"), "opt_ssl");
    setLocale(getEl("save"), "opt_save");
}