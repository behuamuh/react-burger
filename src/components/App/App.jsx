import HomePage from '../../pages/main';
import LoginPage from '../../pages/login';
import { Routes, Route } from 'react-router-dom';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredient } from '../../services/actions/burgerIngredientsAction';
import { useEffect } from 'react';
import RegisterPage from '../../pages/register';
import ForgottenPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password-page';
import ProfilePage from '../../pages/profile';
import IngredientsPage from '../../pages/ingredients-page';
import ProtectedRoute from '../Protected-route/ProtectedRoute';
import { checkUserAccess } from '../../services/actions/userAction';


function App() {

const dispatch = useDispatch();

useEffect(() => {
  dispatch(getIngredient());
  dispatch(checkUserAccess());
}, [])

const { isAuth, resetEmailSent } = useSelector((store) => ({
  isAuth: store.userReducer.isAuth,
  resetEmailSent: store.userReducer.resetEmailSent,
}));


return (
   
    <Routes>
    <Route  path='/' element={<HomePage/>}/>
    <Route  path='/login' element={<ProtectedRoute isAuth={!isAuth} to='/'><LoginPage/></ProtectedRoute>}/>
    <Route path='/register' element={<ProtectedRoute isAuth={!isAuth} to='/'><RegisterPage/></ProtectedRoute>}/>
    <Route path='/forgot-password' element={<ProtectedRoute isAuth={!isAuth} to='/'><ForgottenPasswordPage/></ProtectedRoute>}/>
    <Route path='/reset-password' element={<ProtectedRoute isAuth={resetEmailSent} to="/login"><ResetPasswordPage/></ProtectedRoute>}/>
    <Route path='/profile' element={<ProtectedRoute isAuth={isAuth} to='/login'><ProfilePage/></ProtectedRoute>}/>
    <Route path='/ingredients/:id' element={<IngredientsPage/>}/>
    </Routes>
  
    
  );
}

export default App;

