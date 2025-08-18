import { BrowserRouter, Routes,Route,Navigate  } from 'react-router-dom';
import Login from "./pages/login";
import Verify from "./pages/verify";
import Boards from "./pages/boards";
import Cards from "./pages/cards";
import Tasks from "./pages/tasks";
function App() {
  return (
    <BrowserRouter> 
        <Routes>
            <Route path='/auth/signin' element={<Login />}/>
            <Route path='/auth/signup' element={<Verify />}/>
            <Route path='/boards' element={<Boards />}/>
            <Route path='/cards' element={<Cards />}/>
            <Route path='/tasks' element={<Tasks />}/>
            <Route path='*' element={<Navigate to ="/auth/signin" replace />}/>
        </Routes>
    
    </BrowserRouter>
  )
}

export default App
