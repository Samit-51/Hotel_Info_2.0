import SignIn from './components/SignIn';
import LogIn from './components/LogIn';
import './App.css'
import {Routes, Route} from 'react-router-dom';
const App = ()=> {
  return(
    <Routes>
      <Route path='/' element={<SignIn/>} />
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/login' element={<LogIn/>} />
    </Routes>
  )
}

export default App;