import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import "./index.css"
const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const res = await axios.post("https://job-final.onrender.com/login/", {
                username: username,  // TokenObtainPairView expects "username" field
                password: password,
            })
            const { access, refresh } = res.data
            localStorage.setItem("access", access)
            localStorage.setItem("refresh", refresh)
            setMsg("login Successful")
            navigate("/profile")
        }
        catch(error){
              setMsg("Something went wrong")
        }


    }
    return (
        <div className = "login-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>username*</label>
                    <input type="text" onChange={(event) => setUsername(event.target.value)}
                        value={username}
                    />
                </div>
                <div>
                    <label>Password*</label>
                    <input type="password" onChange={(event) => setPassword(event.target.value)}
                        value={password}


                    />
                    <button type="submit">Login</button>
                    <p>{msg}</p>
                </div>

            </form>
        </div>
    )
}
export default Login