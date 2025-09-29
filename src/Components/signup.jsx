import { useState } from "react";
import NameAndLogo from "./Header";
import { gql, useMutation } from "@apollo/client";

const NEW_USER = gql`
mutation Signup($email: String!, $password: String!) {
  signup(email: $email, password: $password) {
    code
    success
    message {
      email
      password
    }
    user {
      email
      password
    }
  }
}
`

function Signup () {
    const [ formData, setFormData ] = useState({
        email:"",
        password:""
    });

    const [ error, setError ] = useState({});
    const [ newUser ] = useMutation(NEW_USER);

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
           const { data } = await newUser({ variables: { email: formData.email, password: formData.password } });

            if(!data.signup.success){
                setError(data.signup.message);
                return;
            }
            alert("Sign Up Successful!")
        }catch(err){
            console.error(err)
        }
    }

    return (
        <div>
            <NameAndLogo showCartButton={false} />
            <div>
                <h2>Sign Up</h2>
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
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;