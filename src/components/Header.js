import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import logo from './LOGO.jpg';
import {useStateValue, UserContext } from '../context/ContextProvider';
import Badge from 'react-bootstrap/Badge';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
const Header = () => {
    const [{basket}] = useStateValue();
    const user = useContext(UserContext);
    const handleLogout = () => {
        user.logout();
    }
    return (
        <Navbar className='header__navbar' collapseOnSelect expand='md'  variant="light">
            <Navbar.Brand href="#home"><img className='header__image' alt='' src={logo}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="header__navlink">
                    <Nav.Link><Link className='header__navlinks' to='/home'><span >Home</span></Link></Nav.Link>
                    <Nav.Link><Link className='header__navlinks' to='/products'><span >Products</span></Link></Nav.Link>
                    {user.token? (<Nav.Link><Link className='header__navlinks' to='/home'><span onClick={handleLogout}>Logout</span></Link></Nav.Link>)
                     : 
                    (<Nav.Link><Link className='header__navlinks' to='/signup'><span >SignUp</span></Link></Nav.Link>)}
                    
                    {user.token && <Nav.Link><Link className='header__navlinks' to={`/orders/${user.userId}`}><span >Orders</span></Link></Nav.Link>}
                    <Link to='/pricing2'> 
                    <Button variant="light">
                        < ShoppingBasketIcon /><Badge variant="light">{basket?.length}</Badge>
                    </Button>
                    </Link>
                </Nav>
            </Navbar.Collapse >
      </Navbar>
    )
}
export default Header;