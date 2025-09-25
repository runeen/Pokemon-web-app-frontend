import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter} from 'react-router-dom';


console.log("eu sunt cel care scrie");

createRoot(document.getElementById('root')).render(
  <HashRouter className={"h-full w-full"}>
    <App />
  </HashRouter>,
);
