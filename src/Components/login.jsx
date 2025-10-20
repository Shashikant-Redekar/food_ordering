import { useState } from "react";
import NameAndLogo from "./Header";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import "../styling/signup.scss";

const USER = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    code
    success
    message
    token
  }
}
`

function Login ({ setToken }) {
        const [ formData, setFormData ] = useState({
        email:"",
        password:""
    });

    const [ error, setError ] = useState({});
    const [ user ] = useMutation(USER);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if(!formData.email) newErrors.email = "Email is required";
        if(!formData.password) newErrors.password = "Password cannot be empty";
        return newErrors;
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const validateErrors = validate();
        if (Object.keys(validateErrors).length > 0){
            setError(validateErrors);
            return;
        }
        try{
           const { data } = await user({ variables: { email: formData.email, password: formData.password } });

            if(!data.login.success){
                if(data.login.message === "User not found"){
                    const err = {
                        email: "User not found",
                        password: ""
                    }
                    setError(err);
                } else if (data.login.message === "Incorrect Password"){
                    const err = {
                        email: "",
                        password: "Incorrect Password"
                    }
                    setError(err)
                }
                return;
            }
            const token = data.login.token;
            localStorage.setItem("jwt", token);
            setToken(token)
            alert("Login Successful!")
            navigate("/")
            setTimeout(() => {navigate("/orders");}, 1000);
        }catch(err){
            console.error(err)
        }
    }

    return (
        <div>
            <NameAndLogo showCartButton={false} showSignupButton={true} />
            <div className="signUp">
                <h2 className="su">Login</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="emailf">
                        <label className="email">Email</label>
                        <input name="email" value={formData.email} onChange={handleChange}></input>
                        {error.email && <p className="error">{error.email}</p>}
                    </div>
                    <div className="passf">
                        <label className="pass">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        {error.password && <p className="error">{error.password}</p>}
                    </div>
                    <button type="submit" className="susubmit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;