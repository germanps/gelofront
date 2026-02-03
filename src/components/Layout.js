import "./Layout.css";
import bg from "../assets/background2.png";

export default function Layout({ children }) {
  return (
    <div
      className="layout"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="overlay">
        {children}
      </div>
    </div>
  );
}
