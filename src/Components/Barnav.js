import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaHome } from 'react-icons/fa';


function Barnav(props) {
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/"><FaHome /> Talant-Valmy</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="d-flex" id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Autre lien</Nav.Link>
            <Nav.Link href="produits">Produits</Nav.Link>
            <NavDropdown title="Services" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Vente de billets</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Question mensuelle CSE
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Question à élu-e</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Autre...
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Nav className="me-auto">
            <NavDropdown title="Mon compte" id="collasible-nav-dropdown_1">
              <NavDropdown.Item href="sign-up">S'inscrire</NavDropdown.Item>
              <NavDropdown.Item href="mes-commandes">
                Mes commandes
              </NavDropdown.Item>
              
              <NavDropdown.Divider />
              {!props.bascule && <NavDropdown.Item href="Connexion">
                Connexion
              </NavDropdown.Item>}
              {props.bascule && <NavDropdown.Item href="logout">Déconnexion</NavDropdown.Item>}
            </NavDropdown>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default Barnav;