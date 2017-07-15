function saveOptions(e) {
    browser.storage.local.set({
        tracker_url: document.querySelector("#tracker_url").value
    });
    e.preventDefault();
}

function restoreOptions() {
    var gettingItem = browser.storage.local.get('tracker_url');
    gettingItem.then((res) => {
        document.querySelector("#tracker_url").value = res.tracker_url || 'http://127.0.0.1:8000/tracker/{window}/{tab}/{action}/{timestamp}/{url}';
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
