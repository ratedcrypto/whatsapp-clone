import { Button } from '@material-ui/core';
import Head from 'next/head';
import styled from 'styled-components';
import { auth, provider } from '../firebase';

function Login() {
  const singIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>Login</Head>

      <LoginContainer>
        <Logo src="https://cdn4.iconfinder.com/data/icons/social-media-2210/24/Whatsapp-512.png" />
        <Button variant="outlined" onClick={singIn}>
          Sign in with Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
