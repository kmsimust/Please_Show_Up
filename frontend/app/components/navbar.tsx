import { NavLink } from "react-router";

export default function NavbarUnauth() {
  return (
    <header className="w-full px-8 text-gray-700 bg-white shadow-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between py-5 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center">
          <NavLink to="/" className="flex items-center mb-5 md:mb-0">
            <span className="text-xl font-black text-gray-900 select-none">
              Please <span className="text-indigo-600">Show UP!</span>
            </span>
          </NavLink>
          <nav className="flex flex-wrap items-center ml-0 md:ml-8 md:border-l md:pl-8">
            <NavLink
              to="/"
              end
              className="mr-5 font-medium text-gray-600 hover:text-gray-900"
            >
              About Us
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
