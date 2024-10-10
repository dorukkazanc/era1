import {useState} from "react";
import ParticleComponent from "../components/ParticleComponent";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useAuth()
    const navigate = useNavigate()

    const handleLogin = async () => {
        login(email, password)
            .then((success) => {
                if (success) {
                    navigate('/');
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }

    return (
        <>
            <ParticleComponent/>
            <div className="login-card-container">
                <div className="login-card">
                    <h2>LOGIN</h2>
                    <section className="group">
                        <input
                            type="text"
                            size="30"
                            className="input"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email" className="label">
                            Email
                        </label>
                    </section>
                    <section className="group">
                        <input
                            type="password"
                            minLength="8"
                            className="input"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password" className="label">
                            Password
                        </label>
                    </section>
                    <button
                        type="button"
                        className="btn"
                        onClick={handleLogin}
                    >
                        LOGIN
                    </button>
                    <span className="footer"></span>
                </div>
            </div>
        </>
    )
}

export default LoginPage;