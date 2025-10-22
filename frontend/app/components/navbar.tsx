import logo from "../assets/images/logo.png";
//import { getUser } from "../utils/auth-me";

const NavBar = () => {
  // const [userProfile, setUserProfile] = useState<UserType | null>(null);
  //const user = getUser();
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
    <nav className="navbar navbar-expand-lg bg-green-main">
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} style={{ width: 140 }} alt="logo" />
        </a>

        {/* Profile */}
        <div className="d-flex align-items-center">
          <span className="fw-semibold fontGeorgia fs-6 me-2">
            {/*user && <div>{user?.username}</div>*/}
          </span>

          <a href="/profile">
            <img
              src={
                "/user.png"
                /*user?.profile_image == "default"
                  ? userProfile
                  : user?.profile_image*/
              }
              alt="profile"
              className="rounded-circle"
              style={{ width: "50px", height: "50px" }}
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
