# sledzik
Track how long a user spends on each website

# Browser plugins
This project consists of two parts - the tracker, and browser plugins that send users stats. The browser plugin works by sending a request to the tracker every time that a user changes a tab, browser window or url. The url that the request is sent to can be changed in the plugin settings.

## Firefox
* Go to [about:debugging](about:debugging)
* Add the ff folder from the project as a temporary plugin

## Chrome
* Go to [chrome://extensions/](chrome://extensions/)
* Enable the developer mode (the checkbox in the top right corner)
* Add the chrome folder from the project as an unpacked extension

# Tracker
The tracker receives requests and generates reports based on user activity.

## Dummy tracker
* Make sure you have [python](https://www.python.org/downloads/) installed

## Python 2
execute `python -m SimpleHTTPServer`

## Python 3
execute `python3 -m http.server`



# TODO
* unique brower/user id in tracking request
* unify brower plugins
* whole tracker
