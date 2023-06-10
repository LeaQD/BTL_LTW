import React, { useState } from 'react'
import isEmpty from "validator/lib/isEmpty"
import { useNavigate } from 'react-router-dom';
import isEmail from "validator/lib/isEmail"
import './Register.css'
function Register(props) {
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [numberphone, setNumberphone] = useState('');
    const [validationMsg, setValidationMsg] = useState({})
    // const [message, setMessage] = useState("")
    const [user, setUser] = useState('')
    const onChangeEmail = (event) => {
        const value = event.target.value
        const lowercaseValue = value.toLowerCase();
        setEmail(lowercaseValue)
        setUser({ ...user, email: lowercaseValue })
        console.log(user.id)

    }

    const onChangePassword = (event) => {
        const value = event.target.value
        setPassword(value)
        setUser({ ...user, password: value })
    }
    const onChangeUsername = (event) => {
        const value = event.target.value
        setUsername(value)
        setUser({ ...user, username: value })
    }
    const onChangeNumberphone = (event) => {
        const value = event.target.value
        setNumberphone(value)
        setUser({ ...user, numberphone: value })
    }
    const validateAll = () => {
        const msg = {}
        if (isEmpty(username)) {
            msg.username = "Vui lòng nhập họ và tên"
        }
        if (isEmpty(email)) {
            msg.email = "Vui lòng nhập email"
        } else if (!isEmail(email)) {
            msg.email = "Email sai định dạng"
        }
        if (isEmpty(numberphone)) {
            msg.numberphone = "Vui lòng nhập số điện thoại"
        }
        if (isEmpty(password)) {
            msg.password = "Vui lòng nhập mật khẩu"
        }
        if (isEmpty(confirmPassword)) {
            msg.confirmPassword = "Vui lòng nhập lại mật khẩu";
        } else if (confirmPassword !== password) {
            msg.confirmPassword = "Mật khẩu không khớp";
        }
        setUser((prevUser) => ({ ...prevUser, role: false, id: 19 }));
        console.log(user)
        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true


    }
    const onChangeConfirmPassword = (event) => {
        const value = event.target.value;
        setConfirmPassword(value);
    };

    const onSubmitRegister = async (event) => {
        const msg = {}
        event.preventDefault();
        // setUser((prevUser) => ({ ...prevUser, role: false, id: 19 }));
        console.log(user)
        const isValid = validateAll()
        if (!isValid) return false
        try {
            const response = await fetch(`http://localhost:8080/users/check/${email}`);
            const userData = await response.json();
            // console.log("1")
            // console.log(userData);
            // console.log("2")
            if (userData != null) {
                msg.email = "Email đã tồn tại";
                setValidationMsg(msg)
                return false
            }
        } catch (error) {
            console.log(error)
        }
        if (window.confirm("Bạn muốn tạo tài khoản ?"))
            try {
                const response = await fetch('http://localhost:8080/users/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify(user),
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err))

                navigate('/login')
            } catch (error) {
                console.log(error)
                // Xử lý lỗi
            }
        else {
            window.location.reload()
        }

    }

    return (
        <div className="form">
            <div className="text-login">Register</div>
            <form>
                <div className="input-container">
                    <label htmlFor="username" className="block mb-2 text-sm text-gray-800">Họ và tên</label>
                    <input
                        name="username"
                        id="username"
                        placeholder="Nguyen Van A"
                        className="input-user"
                        autoComplete="username"
                        onChange={onChangeUsername}
                    />
                    <p className="text-noti">{validationMsg.username}</p>
                </div>
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
                    <label htmlFor="username" className="block mb-2 text-sm text-gray-800">Số Điện Thoại</label>
                    <input
                        name="numberphone"
                        id="numberphone"
                        placeholder="09xxxxxxx"
                        className="input-user"
                        autoComplete="numberphone"
                        onChange={onChangeNumberphone}
                    />
                    <p className="text-noti">{validationMsg.numberphone}</p>
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
                <div className="input-container">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm text-gray-800">Nhập lại mật khẩu</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="*************"
                        className="input-user"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                    />
                    <p className="text-noti">{validationMsg.confirmPassword}</p>
                </div>
                <div className="block md:flex items-center justify-between">
                    <button
                        className="btn btn-success"
                        onClick={onSubmitRegister}
                    >
                        ĐĂNG KÍ
                    </button>

                    <a className="text-gray-600 hover:text-gray-700 no-underline block mt-3" href="/password/reset">
                        Quên mật khẩu
                    </a>
                </div>
            </form>
        </div>
    )
}

export default Register