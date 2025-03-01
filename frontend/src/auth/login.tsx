import { useState } from 'react';
import './login.css';
import { useAuth } from '../context/auth-context';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();
  const { login, error: authError, isLoading: authLoading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
      setSuccess(true);
      navigate('/dashboard');
    } catch (err) {
   
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please sign in to continue</p>
        
        {success && (
          <div className="success-message">
            Login successful! Redirecting...
          </div>
        )}
        
        {authError && (
          <div className="error-message">
            {authError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="form-action">
            <button 
              type="submit" 
              className="login-button"
              disabled={loading || authLoading}
            >
              {loading || authLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          
          <div className="form-footer">
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
