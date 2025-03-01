

export function SecondLogin() {
  return (
    <div style={{
        maxWidth: "500px",
        margin: "auto",
        marginTop: "200px",
        padding: "20px",

        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    }}>
      <div className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
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
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="form-action">
          <button type="submit" className="login-button">Login</button>
        </div>

        <div className="form-footer">
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
