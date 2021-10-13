import { Link } from "react-router-dom";

const Menu = ({show}) =>{
 
    return(
        <div className={show ? 'sidenav active' : 'sidenav'}>

            <ul>
                <li>
                    <Link to="/">Productos</Link>             
                </li>
                <li><Link to="/oferta">Oferta</Link></li>
                <li><Link to="/damas">Damas</Link></li>
                <li><Link to="/caballeros">Caballeros</Link></li>
                <li><Link to="/childrens">Niños</Link></li>
                <li><Link to="/carrito">Carrito</Link></li>
            </ul>
        </div>
    )
} 
export default Menu;