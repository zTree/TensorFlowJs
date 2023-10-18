import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './root/index';
import './common/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
