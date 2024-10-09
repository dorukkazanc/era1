import {useAuth} from "../contexts/AuthContext";

const HomePage = () => {
    const { loggedInUser, logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    // Giriş yapan kullanıcı context'te tutuluyor (useAuth)
    // Ayrıca token bilgileri session'a eklendi eğer session silinirse otomatik login'e yönlendirilir.
    return (
        <div>
            <h1>Home Page</h1>
            {
                loggedInUser && (
                    <div>
                        <h2>Giriş yapan kullanıcı {loggedInUser.email}</h2>
                        <h2>Token: {loggedInUser.token}</h2>
                    </div>
                )
            }
            <button onClick={handleLogout}>
                Çıkış Yap
            </button>
        </div>
    )
}

export default HomePage;