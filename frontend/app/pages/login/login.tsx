import bgImg from '~/images/login-background.png'

export function Login() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('"+bgImg+"')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          background: "#e0e0e0",
          border: "3px solid #9c27b0",
          textAlign: "center",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          Login
        </h2>
        <form>
          <input
            type="text"
            placeholder="Enter your username or Email"
            required
            style={{
              width: "100%",
              padding: "14px",
              margin: "10px 0",
              border: "none",
              background: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            placeholder="Enter your Password"
            required
            style={{
              width: "100%",
              padding: "14px",
              margin: "10px 0",
              border: "none",
              background: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
          <div
            style={{
              textAlign: "left",
              fontSize: "14px",
              fontWeight: "bold",
              margin: "5px 0 15px 5px",
            }}
          >
            <a href="#" style={{ color: "#000", textDecoration: "none" }}>
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#00c853",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          >
            Login
          </button>
        </form>
        <div
          style={{
            marginTop: "18px",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "#00a843", textDecoration: "none" }}>
            sign up
          </a>
        </div>
      </div>
    </div>
  );
}
