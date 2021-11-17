import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from 'react-google-login';

function App() {
  const handleLogin = async googleData => {
    const res = await fetch("/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    // store returned user somehow
  }
  return (
    <div className="App">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        responseType={'token'}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default App;
