import React from 'react';
import ReactDOM from 'react-dom';
import '../src/assets/general.scss';
import App from './App';
import { openDatabase } from './db';
(async function main() {
  let db = await openDatabase();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(
        function (registration) {
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope,
          );
        },
        function (err) {
          console.log('ServiceWorker registration failed: ', err);
        },
      )
      .catch((err) => {
        console.error('Service Worker failed:', err);
      });
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App db={db} />
    </React.StrictMode>,
  );
})();
