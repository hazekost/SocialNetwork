import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginTC} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {rootStateType} from "../../Redux/reduxStore";
import s from "../common/FormsControls/FormsControls.module.css"

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Login"} validate={[required]} name={"email"} component={Input}/>
            </div>
            <div>
                <Field placeholder={"Password"} validate={[required]} type={"password"} name={"password"}
                       component={Input}/>
            </div>
            <div>
                <Field component={"input"} name={"rememberMe"} type={"checkbox"}/> remember me
            </div>
            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>LogIn</button>
            </div>
        </form>
    )
}

const ReduxLoginForm = reduxForm<FormDataType>({form: "Login"})(LoginForm)

type LoginPropsType = {
    isAuth: boolean
    login: (email: string, password: string, rememberMe: boolean) => void
}

const Login: React.FC<LoginPropsType> = ({isAuth, login}) => {

    const onSubmit = (formData: FormDataType) => {
        let {email, password, rememberMe} = formData
        login(email, password, rememberMe)
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state: rootStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login: loginTC})(Login)
