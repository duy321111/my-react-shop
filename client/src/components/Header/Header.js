import Navbar from "./Navbar.js";
import SearchArea from "./SearchArea.js";
import Menu from "./Menu";

export default function Header() {
  return(
    <header className="header">
            <div className="grid">
                <Navbar/>
                <SearchArea/>
                <Menu/>
            </div>
        </header>
  )
}