import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import './styles/main.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="app">
            <Navbar />
            <main>
                <Home />
            </main>
        </div>
    )
}

export default App