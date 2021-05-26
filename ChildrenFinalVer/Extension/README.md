# Consent-Extension
EPS Project to allow parents more control over their children's information online.

manifest.json defines the extension as well as its permissions.

background.js runs automatically as soon as the extension is loaded. It defines
chrome listeners that perform events when the user takes specific actions on 
their browser.

foreground.js has an example of injecting css into the foreground for reference,
but it is not currently needed for the extension.

index.html is the main html file for the dashboard. It has a browsing history table.
index.js is the javascript file that interfaces between the background js file, 
the chrome storage, and the index html page.

popup.html defines the popup when you click on the extension icon.

icon.png is just the panda's face.

full_icon.png includes the brand name.


This extension should not be installed and used for any purpose besides protecting
children's privacy online. 