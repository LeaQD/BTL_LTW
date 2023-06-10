import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css'
import { NavLink, useNavigate } from 'react-router-dom';
const Header = (props) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const handleLogout = () => {
        if (window.confirm("Bạn muốn đăng xuất khỏi trang ?")) {
            localStorage.removeItem("token")
            localStorage.removeItem("role")
            navigate("/login")
        }

    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand >
                    Library
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" >
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        {role == 'admin' && (<NavLink className="nav-link" to="/admin">Admin</NavLink>)}
                    </Nav>
                    <Nav>
                        <NavDropdown title="Setting" id="basic-nav-dropdown" className='nav-link'>

                            {!token && (<NavLink to="/login" className="dropdown-item"> Đăng nhập </NavLink>)}
                            {!token && (<NavLink to="/register" className="dropdown-item">   Đăng kí </NavLink>)}
                            {token && (<NavDropdown.Item onClick={() => handleLogout()}>  Đăng xuất</NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>)
}

export default Header;