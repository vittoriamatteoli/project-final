import styled from "styled-components"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Container = styled.div`
display: flex;
width: 100vw;
background-color: #fff;
`;

const LeftColumn = styled.div`
flex: 1;
display: flex;
justify-content: center;
align-items: center;
padding: 20px;
box-sizing: border-box;
background-color: #d9d9d9;
border-radius: 20px;
`;

const RightColumn = styled.div`
flex: 1;
padding: 20px;
box-sizing: border-box;
display: flex;
flex-direction: column;
justify-content: center;
background-color: #ffffff;
`;

const ImageContainer = styled.div`
width: 80%;
text-align: center;
`;

const StyledImage = styled.img`
max-width: 100%;
height: auto;
`;

const FormContainer = styled.div`
width: 100%;
max-width: 400px;
margin: 0 auto;
h2 {
  text-align: center;
}
`;

const FormGroup = styled.div`
margin-bottom: 15px;
`;

const Input = styled.input`
outline: none;
border: none;
width: 100%;
padding: 10px;
color: black;
box-sizing: border-box;
background-color: #d9d9d9;
border-radius: 10px; //adjust once design is done

&:focus {
  background-color: #fff;
  border: 1px solid black;
}
`;

const Button = styled.button`
width: 100%;
padding: 10px;
background-color: #88a183;
border: none;
border-radius: 20px; //adjust once design is done
color: black; //  white or black?
cursor: pointer;
&:hover {
  background-color: #88a183b7;
}
`;

const ForgotPassword = styled.a`
display: block;
margin-top: 10px;
text-align: right;
font-size: 0.6em;
color: black;
text-decoration: none;
font-weight: bold;
&:hover {
  //some effects
}
`;

const BottomText = styled.div`
margin-top: 20px;
font-size: 0.6em;
color: black;
p {
text-align: center;
margin: 5px 0;
}
a {
font-weight: bold;
color: black;
text-decoration: none;

&:hover {
  //some effects
}
}
`
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const apikey = import.meta.env.VITE_API_KEY;
  const API = `${apikey}/sessions`;
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    fetch(API, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid login");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMessage("Login successful");
        sessionStorage.setItem("accessToken", data.accessToken);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Failed to login");
      });
  };




  return (
    <Container>
      <LeftColumn>
        <ImageContainer>
          <StyledImage src="world.png" alt="World" />
        </ImageContainer>
      </LeftColumn>
      <RightColumn>
        <FormContainer>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <FormGroup>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </FormGroup>
            <Button type="submit">Sign In</Button>
            <ForgotPassword href="#">Forgot password?</ForgotPassword>
          </form>
          <BottomText>
            {message && (
              <div>
                <p>{message}</p>
              </div>
            )}
            <p>
              Don't have an account yet? <Link to="/register">Register</Link>
            </p>
            <p>By clicking the button above, you agree to Terms and Privacy</p>
          </BottomText>
        </FormContainer>
      </RightColumn>
    </Container>
  )
}


