import { DOMData } from '../types/chrome';

console.log('🎯 DOM Inspector content script LOADED on:', window.location.href);

function extractDOMData(): DOMData {
  const title = document.title;
  const url = window.location.href;
  
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    .map(h => h.textContent?.trim() || '')
    .filter(Boolean);

  console.log('---', headings);

  const links = Array.from(document.querySelectorAll('a'))
    .map(a => a.href)
    .filter(href => href && !href.startsWith('javascript:'));

  const textContent = document.body.textContent?.substring(0, 1000) || '';

  return {
    title,
    url,
    headings,
    links: links.slice(0, 10), // restrict links count
    textContent
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'EXTRACT_DOM_DATA') {
    const domData = extractDOMData();
    sendResponse(domData);
  }
  return true;
});