
import style from './forgot-password.module.css';
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { setForgotPasswordFormValue, forgotPassword } from "../../services/actions/userAction";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

export default function ForgottenPasswordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { forgotPasswordForm } = useSelector((store) => store.userReducer);

    function formOnChange(e) {
        dispatch(setForgotPasswordFormValue(e.target.name, e.target.value));
    }

    function forgottenPasswordFormSubmit(e) {
        e.preventDefault();
        dispatch(forgotPassword(forgotPasswordForm,() => navigate('/reset-password')))
    };

    return (
        <>
        <section className={style.section}>
            <div className={style.container}>
              <p className='text text_type_main-medium mb-6'>Восстановление пароля</p>
              <form className={style.form} onSubmit={forgottenPasswordFormSubmit}>
                <EmailInput
                  placeholder="Укажите e-mail"
                  value={forgotPasswordForm.email}
                  name='email'
                  onChange={formOnChange}
                />
                <Button htmlType="submit" type='primary' size="medium">Восстановить</Button>
              </form>
              <p className="text text_type_main-default">
              Вспомнили пароль?
              <Link to='/login' className={style.link}>
              Войти
              </Link>
              </p>
            </div>
        </section>
        </>
    )
}