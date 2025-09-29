import { useState } from "react";
import NameAndLogo from "./Header";
import { gql, useMutation } from "@apollo/client";

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

function Login () {
        const [ formData, setFormData ] = useState({
        email:"",
        password:""
    });

    const [ error, setError ] = useState({});
    const [ user ] = useMutation(USER);

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

           console.log(data.login.token);

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
            alert("Login Successful!")
        }catch(err){
            console.error(err)
        }
    }

    return (
        <div>
            <NameAndLogo showCartButton={false} />
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input name="email" value={formData.email} onChange={handleChange}></input>
                        {error.email && <p>{error.email}</p>}
                    </div>
                    <div>
                        <label>Password</label>
                        <input name="password" value={formData.password} onChange={handleChange} />
                        {error.password && <p>{error.password}</p>}
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;