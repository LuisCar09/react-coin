import { Link } from "react-router-dom"
import '../styles/Header.css'
const Navbar = ({elements}) => {
    return(
        <nav className="navbar">
            <ul>
                {elements.map((elem,index) => <Link to={elem.path} key={index}> <li  > {elem.name} </li> </Link> )}
            </ul>
        </nav>
    )
}

export default Navbar