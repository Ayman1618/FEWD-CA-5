import './App.css'
import MainPage from './components/MainPage'
import RegisterForm from './components/RegisterForm'
import { Routes ,Route } from 'react-router-dom'


function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/Register" element={<RegisterForm />} />
    </Routes>
  )
}

export default App
