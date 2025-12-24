
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Force light theme on initial load
if (typeof window !== 'undefined') {
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.add('light');
  localStorage.removeItem('theme'); // Clear any saved theme preference
}

createRoot(document.getElementById("root")!).render(<App />);
