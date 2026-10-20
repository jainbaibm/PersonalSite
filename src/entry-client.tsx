import '@fontsource-variable/inter';
import '@fontsource-variable/source-serif-4';
import './styles/index.css';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Prerendered pages are hydrated; the dev server renders from scratch.
if (container.firstElementChild) {
  hydrateRoot(container, app, {
    onRecoverableError(error) {
      // Surfaced for debugging; React already recovered by re-rendering on the client.
      const w = window as unknown as { __hydrationErrors?: string[] };
      (w.__hydrationErrors ??= []).push(String(error));
      console.error(error);
    },
  });
}
else createRoot(container).render(app);
