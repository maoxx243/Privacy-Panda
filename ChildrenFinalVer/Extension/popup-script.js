/* 
Source from: https://github.com/an-object-is-a/google-openid-connect-chrome-extension/
Author: an-object-is-a
*/
/*
The code below send a message "login" to background, 
if the background response is "success", the popup window
will close.
*/
document.querySelector('#sign-in').addEventListener('click', function () {
    chrome.runtime.sendMessage({ message: 'login' }, function (response) {
        if (response === 'success') window.close();
    });
});

