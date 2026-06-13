import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// No StrictMode: double-mounted effects re-create Lenis + pinned
// ScrollTriggers in dev and cause visible scroll jumps.
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
