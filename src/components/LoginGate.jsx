import { useState } from 'react';
import './LoginGate.css';

const CREDENTIALS = { username: 'admin', password: 'password' };

export default function LoginGate({ children }) {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('jl_auth') === 'true'
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (authenticated) return children;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      username === CREDENTIALS.username &&
      password === CREDENTIALS.password
    ) {
      sessionStorage.setItem('jl_auth', 'true');
      setAuthenticated(true);
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-gate">
      <div className="login-gate__card">
        <h1 className="login-gate__brand">Jus Lawns</h1>
        <p className="login-gate__tagline">Site preview — authorized access only</p>
        <form className="login-gate__form" onSubmit={handleSubmit}>
          {error && <div className="login-gate__error">{error}</div>}
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => { setError(''); setUsername(e.target.value); }}
              autoComplete="username"
              autoFocus
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => { setError(''); setPassword(e.target.value); }}
              autoComplete="current-password"
            />
          </label>
          <button type="submit" className="login-gate__submit">
            Enter Site
          </button>
        </form>
      </div>
    </div>
  );
}
