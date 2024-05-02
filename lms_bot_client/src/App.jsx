import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import LmsBot from './pages/LmsBot';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path='/login' />
        <Route element={<LmsBot />} path='/' />
      </Routes>
    </BrowserRouter>
  )
}


export default App;