import * as ingredient from "../components/styles/unauth_nav.css"

export function UnAuthNavBar() {
  return (

<body>
    <div className="top-nav-bar">
        <div className="links-container">
            <a className="home-link active" href="/group">Home</a>
            <a href="/">About Us</a>
            <a href="/signup">Sign UP</a>
            <a href="/login">Login</a>           
        </div>
    </div>
</body>

  )
}
