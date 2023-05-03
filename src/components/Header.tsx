import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const page = location.pathname.split("/", 2)[1];

  return (
    <header className="container">
      <div>
        <a href={process.env.PUBLIC_URL}>
          <img
            alt="IMPC logo"
            className="img-fluid mx-auto d-block py-4"
            style={{height: "10rem"}}
            src={process.env.PUBLIC_URL + "/impc_logo.svg"}
          />
        </a>
      </div>
      <nav className="mb-4">
        <ul className="nav nav-underline flex-row justify-content-center">
          <li className="nav-item">
            <Link
              to="/home"
              className={`nav-link ${
                page === "" || page === "home" ? "active" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/heatmap"
              className={`nav-link ${page === "heatmap" ? "active" : ""}`}
            >
              Heatmap
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/vignettes"
              className={`nav-link ${page === "vignettes" ? "active" : ""}`}
            >
              Vignettes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
