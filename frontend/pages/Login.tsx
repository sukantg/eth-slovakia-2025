import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      axios.get(`/auth/login?token=${token}`).then(res => {
        localStorage.setItem('jwt', res.data.token);
        navigate('/dashboard');
      });
    }
  }, []);

  return <div>Logging in...</div>;
};

export default Login;
