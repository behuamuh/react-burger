import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/AppHeader/AppHeader";
import style from './reset-password-page.module.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { setResetPasswordFormValue, resetPassword } from "../services/actions/userAction";


export default function ResetPasswordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { resetPasswordForm } = useSelector((store) => store.userReducer);

    function formOnChange(e) {
        dispatch(setResetPasswordFormValue(e.target.name, e.target.value));
    }

    function resetFormSubmit(e) {
        e.preventDefault();
        dispatch(resetPassword(resetPasswordForm, () => navigate('/login')));
    }

    return (
        <>
        <AppHeader/>
        <section className={style.section}>
            <div className={style.container}>
                <p className='text text_type_main-medium mb-6'>Восстановление пароля</p>
            
            <form className={style.form} onSubmit={resetFormSubmit}>
                <PasswordInput
                  placeholder='Введите новый пароль'
                  value={resetPasswordForm.password}
                  name='password'
                  onChange={formOnChange}
                />
                <Input
                 placeholder="Введите код из письма"
                 value={resetPasswordForm.token}
                 name='token'
                 type='text'
                 onChange={formOnChange}
                />
                <Button htmlType="submit" type="primary" size='medium'>Сохранить</Button>
            </form>
            <p className='text text_type_main-default'>Вспомнили пароль?
            <Link to='/login' className={style.link}>Войти</Link>
            </p>
            </div>
        </section>
        </>
    )
}