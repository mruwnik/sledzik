chrome.storage.local.get('tracker_url',
   (settings) => {
       if (!settings.tracker_url) {
           chrome.storage.local.set({
               tracker_url: 'http://127.0.0.1:8000/tracker/{window}/{tab}/{action}/{timestamp}/{url}'
           });
       }
   }
);


function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200 && callback) {
            callback(xmlHttp);
        }
    };
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}


function formatUrl(tracker_url, window, tab, action, url) {
    return tracker_url.replace(/\{window\}/, window)
                .replace(/\{tab\}/, tab)
                .replace(/\{action\}/, action)
                .replace(/\{timestamp\}/, Date.now())
                .replace(/\{url\}/, encodeURIComponent(url));
}

function printPos(tabInfo, action){
    chrome.storage.local.get('tracker_url',
        (settings) => {
            httpGetAsync(formatUrl(
                settings.tracker_url, tabInfo.windowId, tabInfo.id, action, tabInfo.url
            ));
        }
    );
}

function logAction(action) {
    chrome.tabs.query(
        { currentWindow: true, active: true },
        (tabsInfo) => {printPos(tabsInfo[0], action);}
    );
};

chrome.windows.onFocusChanged.addListener((info) => {logAction(info == -1 ? 'window_out' : 'window_in');});
chrome.tabs.onActivated.addListener(() => {logAction('tab_switched');});


function handleUpdated(tabId, changeInfo, tabInfo) {
    if(changeInfo.status == 'complete'){
        printPos(tabInfo, 'url_loaded');
    }
}

chrome.tabs.onUpdated.addListener(handleUpdated);
