import api from "../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // On page load, check if already authenticated
        api.get("/auth/check")
            .then(res => {
                if (res.data.authenticated) {
                    navigate("/dashboard");
                }
            })
            .catch(err => {
                // Optionally handle error
                console.error(err);
            });
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/login", { username, password });
            if (res.data.success === true) {
                navigate("/dashboard");
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-[#2C2C2C] flex flex-col justify-center items-center rounded-2xl shadow-lg p-10 w-full max-w-sm">
                <h1 className="text-white text-4xl font-bold mb-8">Login</h1>
                <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col w-full">
                        <label htmlFor="username" className="text-white mb-2 text-sm font-semibold">Username</label>
                        <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} className="rounded px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#3C7A89]" placeholder="Enter your username" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="password" className="text-white mb-2 text-sm font-semibold">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="rounded px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#3C7A89]" placeholder="Enter your password" />
                    </div>
                    <button type="submit" className="w-full rounded-full text-xl bg-[#3C7A89] hover:bg-[#478B9B] text-white font-semibold py-3 mt-4 transition-colors duration-200">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;