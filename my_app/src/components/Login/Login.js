import React, { useState, useEffect } from 'react'
import isEmpty from "validator/lib/isEmpty"
import { useNavigate } from 'react-router-dom';
import isEmail from "validator/lib/isEmail"
import './Login.css'
function Login(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validationMsg, setValidationMsg] = useState({})
    const [message, setMessage] = useState("")
    const [user, setUser] = useState('')
    useEffect(() => {
        let token = localStorage.getItem("token")
        let role = localStorage.getItem("role")
        if (token) {
            if (role === "admin") {
                navigate("/admin")
            } else {
                navigate("/")
            }
        }
    })
    const onChangeEmail = (event) => {
        const value = event.target.value
        const lowercaseValue = value.toLowerCase()
        setEmail(lowercaseValue)
        setUser({ ...user, email: lowercaseValue })
    }

    const onChangePassword = (event) => {
        const value = event.target.value
        setPassword(value)
        setUser({ ...user, password: value })
    }

    const validateAll = () => {
        const msg = {}
        if (isEmpty(email)) {
            msg.email = "Please input your Email"
        } else if (!isEmail(email)) {
            msg.email = "Your email is incorrect"
        }

        if (isEmpty(password)) {
            msg.password = "Please input your Password"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const onSubmitLogin = async (event) => {
        const msg = {}
        // event.preventDefault();
        console.log(user)
        const isValid = validateAll()
        if (!isValid) return false
        try {
            const response = await fetch(`http://localhost:8080/users/check/${email}`);
            const userData = await response.json();
            console.log(userData);
            console.log(userData.password)
            console.log(response)
            if (userData == null) {
                console.log("null")
            }
            if (userData && userData.password === password) {
                // Mật khẩu đúng, chuyển hướng đến trang admin
                console.log(userData.role)
                localStorage.setItem("token", userData.role)
                // localStorage.setItem("token", userData.role)
                if (userData.role) {

                    // console.log(token)
                    localStorage.setItem("role", "admin");
                    // console.log(token)
                    navigate('/admin');
                }
                else {
                    localStorage.setItem("role", "user");
                    navigate('/');
                }

            } else {

                msg.password = "Sai mật khẩu"
                setValidationMsg(msg)

            }
        } catch (error) {
            console.log("ngu");
            msg.email = "Email không tồn tại"
            setValidationMsg(msg)
        }

    }

    return (
        <div className="form">
            <div className="text-login">LOGIN</div>
            <form>
                <div className="input-container">
                    <label htmlFor="email" className="block mb-2 text-sm text-gray-800">Email của bạn</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="your-email@mail.com"
                        className="input-user"
                        autoComplete="email"
                        onChange={onChangeEmail}
                    />
                    <p className="text-noti">{validationMsg.email}</p>
                </div>
                <div className="input-container">
                    <label htmlFor="password" className="block mb-2 text-sm text-gray-800">Mật khẩu của bạn</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="*************"
                        className="input-user"
                        autoComplete="current-password"
                        onChange={onChangePassword}
                    />
                    <p className="text-noti">{validationMsg.password}</p>
                </div>
                <label className="mb-4 flex items-center">
                    <input type="checkbox" className="form-checkbox" name="remeber" id="remeber" defaultChecked />
                    <span className="ml-2">Nhớ mật khẩu ?</span>
                </label>
                <div className="block md:flex items-center justify-between">
                    <button
                        className="btn btn-success"
                        onClick={onSubmitLogin}
                    >
                        LOGIN
                    </button>

                    <a className="text-gray-600 hover:text-gray-700 no-underline block mt-3" href="/password/reset">
                        Quên mật khẩu
                    </a>
                </div>
                <div className="text-center text-sm text-red-500 mt-2">{message}</div>
            </form>
        </div>
    )
}

export default Login