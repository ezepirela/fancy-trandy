import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link } from 'react-router-dom';
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
                <Nav className="header__navlink" >
                    <Nav.Link as={Link} ><Link className='header__navlinks' to='/home'><Button style={{color: '#0A1D37', borderColor: '#FFBD9B'}} variant="outline-light" >Home</Button></Link></Nav.Link>
                    <Nav.Link as={Link} ><Link className='header__navlinks' to='/products'><Button style={{color: '#0A1D37', borderColor: '#FFBD9B'}} variant="outline-light" >Products</Button></Link></Nav.Link>
                    {user.token? (<Nav.Link as={Link} ><Link className='header__navlinks' to='/home'><Button style={{color: '#0A1D37', borderColor: '#FFBD9B'}} variant="outline-light" onClick={handleLogout}>Logout</Button></Link></Nav.Link>)
                     : 
                    (<Nav.Link as={Link} ><Link className='header__navlinks' to='/signup'><Button style={{color: '#0A1D37', borderColor: '#FFBD9B'}} variant="outline-light" >SignUp</Button></Link></Nav.Link>)}
                    
                    {user.token && <Nav.Link as={Link} ><Link className='header__navlinks' to={`/orders/${user.userId}`}><Button style={{color: '#0A1D37', borderColor: '#FFBD9B'}} variant="outline-light" >Orders</Button></Link></Nav.Link>}
                    <Link to='/pricing2'> 
                    <Button className='header__badge' variant="light">
                        < ShoppingBasketIcon /><Badge variant="light">{basket?.length}</Badge>
                    </Button>
                    </Link>
                </Nav>
            </Navbar.Collapse >
      </Navbar>
    )
}
export default Header;