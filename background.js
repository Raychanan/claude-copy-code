// Listen for the command from the shortcut
chrome.commands.onCommand.addListener((command) => {
    console.log('Received command:', command);
    if (command === 'extract_and_copy') {
      console.log('Executing extract_and_copy');
      injectAndExecute();
    }
});

  
// Listen for the extension icon click
chrome.action.onClicked.addListener((tab) => {
injectAndExecute(tab.id);
});

// Function to inject and execute the script
function injectAndExecute(tabId) {
    // If no tabId is provided, find the active tab in the current window
    if (tabId === undefined) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
          executeScriptInTab(tabs[0].id);
        } else {
          console.error('No active tab found');
        }
      });
    } else {
      executeScriptInTab(tabId);
    }
  }
  
  function executeScriptInTab(tabId) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    }, (results) => {
      // Handle any post-injection logic or errors here
      if (chrome.runtime.lastError) {
        console.error('Error injecting script: ', chrome.runtime.lastError.message);
      }
    });
  }
  