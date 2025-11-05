import * as ingredient from "../components/styles/unauth_nav.css"

export function UnAuthNavBar() {
  return (

<body>
    <nav>
        <div className="links-container">
            <a className="home-link" href="/">Home</a>
            <a href="/aboutus">About Us</a>
            <a href="/signup">Sign UP</a>
            <a href="/login">Login</a>           
        </div>
    </nav>
</body>

  )
}
