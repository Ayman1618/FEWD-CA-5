import { useState } from 'react'
import './App.css'
import MainPage from './components/MainPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <MainPage />
    </div>
  )
}

export default App
