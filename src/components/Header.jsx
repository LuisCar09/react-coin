import Navbar from "./Navbar"
import '../styles/Header.css'
const Header = () => {
    const links = [
        {name:'Home',path:'/'},
        {name:'Favorites',path:'/favorites'}
    ]
    return(
        <header className="header">
            <Navbar elements={links} />
        </header>
    )
}

export default Header