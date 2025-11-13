chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch(error => console.error(error));

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_DOM_DATA') {
    chrome.tabs.getCurrent(tab => {
      if (tab?.id) {
        chrome.tabs.sendMessage(tab.id, { type: 'EXTRACT_DOM_DATA' }, response => {
          sendResponse(response);
        });
      }
    });
    return true;
  }
});