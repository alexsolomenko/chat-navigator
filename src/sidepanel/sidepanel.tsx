import React, { useState, useEffect } from 'react';
import { DOMData } from '../types/chrome';
import { createRoot } from 'react-dom/client';
import './sidepanel.css';

const SidePanel: React.FC = () => {
  const [domData, setDomData] = useState<DOMData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDOMData = async () => {
    setLoading(true);
    setError(null);
    
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      try {
        const response = await chrome.tabs.sendMessage(tab.id, { type: 'EXTRACT_DOM_DATA' });
        setDomData(response);
      }
      catch (err) {
        setError('Failed to fetch DOM data');
        console.error('Error fetching DOM data:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchDOMData();      
    });
  }, []);

  if (loading) {
    return <div className="loading">Loading DOM data...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={fetchDOMData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="side-panel">
      <header className="panel-header">
        <h1>DOM Inspector</h1>
        <button onClick={fetchDOMData} className="refresh-btn">
          Refresh
        </button>
      </header>

      {domData && (
        <div className="dom-data">
          <section className="data-section">
            <h2>Page Info</h2>
            <p><strong>Title:</strong> {domData.title}</p>
            <p><strong>URL:</strong> {domData.url}</p>
          </section>

          <section className="data-section">
            <h2>Headings ({domData.headings.length})</h2>
            <ul>
              {domData.headings.map((heading, index) => (
                <li key={index}>{heading}</li>
              ))}
            </ul>
          </section>

          <section className="data-section">
            <h2>Links ({domData.links.length})</h2>
            <ul>
              {domData.links.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="data-section">
            <h2>Content Preview</h2>
            <p className="text-preview">
              {domData.textContent}...
            </p>
          </section>
        </div>
      )}
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
      <SidePanel />
  );
}

export default SidePanel;