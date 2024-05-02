import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', password: '' });
    const onSubmit = (e) => {
        e.preventDefault();
        if (user.username.trim().length === 0 || user.password.trim().length === 0) {
            return toast('Məlumatları daxil edin!', { type: "error" })
        }

        localStorage.setItem('username', user.username);
        localStorage.setItem('password', user.password);

        return navigate('/');
    }

    return (
        <>
            <div className="login_page">
                <div className="login_container">
                    <form onSubmit={onSubmit}>
                        <div className="input_element">
                            <label htmlFor="">İstifadəçi adı</label>
                            <input type="text" onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        </div>
                        <div className="input_element">
                            <label htmlFor="">Şifrə</label>
                            <input type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        </div>

                        <button type="submit">Daxil ol</button>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default Login