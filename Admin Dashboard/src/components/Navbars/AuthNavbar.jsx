import React from 'react'
import { withTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
// reactstrap components
import {
  UncontrolledCollapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  FormGroup,
  Input
} from 'reactstrap'

function AdminNavbar(props) {
  const handleChange = event => {
    localStorage.setItem('enatega-language', event.target.value)
    props.i18n.changeLanguage(event.target.value)
  }
  const { t } = props
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link-icon" to="/" tag={Link}>
                  <i className="ni ni-planet" />
                  <span className="nav-link-inner--text">{t('Dashboard')}</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <FormGroup>
                  <Input
                    type="select"
                    name="select"
                    defaultValue={localStorage.getItem('enatega-language')}
                    id="exampleSelect"
                    onChange={handleChange}
                    onBlur={event => {}}>
                    <option value="en">English</option>
                    <option value="de">Deutsche</option>
                    <option value="zh">中文</option>
                    <option value="km">ភាសាខ្មែរ</option>
                    <option value="fr">français</option>
                  </Input>
                </FormGroup>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  )
}
export default withTranslation()(AdminNavbar)
