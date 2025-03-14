import { useState } from "react"; // In React, useState is a Hook that allows functional components to have state. 
// It enables components to manage and update local state without needing a class component.
import api from "../api";
import { useNavigate } from "react-router-dom"; // useNavigate is a Hook for programmatic navigation.
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    // state: The current state value.  setState: A function that updates the state.  initialValue: The initial value of the state
    const [username, setUsername] = useState(""); // const [state, setState] = useState(initialValue);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            // Send a POST request to the specified route with the username and password.
            const res = await api.post(route, { username, password })
            // If the method is "login", store the tokens in localStorage and redirect to the home page.
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                // Update the username state on change.
                onChange={(e) => setUsername(e.target.value)} // when the value change, the username will be seted
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {/* Display the loading indicator if loading is true. */}
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export default Form