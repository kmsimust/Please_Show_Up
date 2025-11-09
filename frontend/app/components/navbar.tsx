import logo from "../assets/images/logo.png";
import { getUser } from "../utils/auth-me";
import "./navbar.css"

const NavBar = () => {
	// const [userProfile, setUserProfile] = useState<UserType | null>(null);
	const user = getUser();
	// const user_pfp = user?.profile_image;
	// if (user_pfp == "defualt"){
	//   user_pfp = "../public/user.png"
	// }
	
	// console.log("user: ", user);

	// useEffect(() => {
	//   if (user) {
	//     setUserProfile(user);
	//   }
	// }, [user]);

	return (
		<nav className="navbar navbar-expand-lg app-container-color">
			<div className="container-fluid d-flex navbar-height px-4">
				{/*Left side*/}
				<ul className="navbar-nav">
					{/*Toggle button (doesnt work)*/}
					<button type="button">
						<i className="bi bi-list fs-5"></i>
					</button>

					{/*Please show up*/}
					<a href="/" className="navbar-brand">
						<b className="ml-20" 
						style={{fontSize: "1.75rem"}}>
							PLease show up!
						</b>
					</a>
				</ul>

				{/*Right side*/}
				<ul className="navbar-nav navbar-height">
					<li className="navbar-item">
						<a href="#" className="navbar-link p-3">
							<i className="bi bi-envelope"></i>
						</a>
					</li>

					<li className="navbar-item">
						<a href="/friend" className="navbar-link p-3">
							<i className="bi bi-people"></i>
						</a>
					</li>

					<li className="navbar-item">
						<a href="#" className="navbar-link p-3">
							<i className="bi bi-bell"></i>
						</a>
					</li>

					{/*User dropdown*/}
					<li className="navbar-item">
						<div className="dropdown">
							<a href="/profile" className="navbar-link p-1">
								{/*Replace icon*/}
								<img className="user-icon"></img>
							</a>
							<div className="dropdown-content">
								<a href="/profile" className="dropdown-userbox">
									{/*Replace icon*/}
									<img className="user-icon"></img>

									<div>
										<div className="dropdown-username">
											user
										</div>
										<div className="dropdown-username">
											@user
										</div>
									</div>
								</a>

								<div className="dropdown-divider"></div>

								<a href="#" className="dropdown-option">
									Notification
									<i className="bi bi-bell"></i>
								</a>
								<a href="/friend" className="dropdown-option">
									Friends
									<i className="bi bi-people"></i>
								</a>
								<a href="#" className="dropdown-option">
									Messages
									<i className="bi bi-envelope"></i>
								</a>

								<div className="dropdown-divider"></div>

								<a href="/login" className="dropdown-option">
									Log out
									<i className="bi bi-box-arrow-right"></i>
								</a>
							</div>
						</div> 
					</li>
				</ul>

					{/* Profile 
					<div className="d-flex align-items-center">
						<span className="fw-semibold fontGeorgia fs-6 me-2">{user && <div>{user?.username}</div>}</span>
						

						<a href="/profile">
							<img
							src={
								user?.profile_image == "default"
								? userProfile
								: user?.profile_image
							}
							alt="profile"
							className="rounded-circle"
							style={{ width: "50px", height: "50px" }}
							/>
						</a>
					</div>
					*/}
			</div>
		</nav>
	);
};

export default NavBar;
