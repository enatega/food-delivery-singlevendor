/*eslint-disable*/
import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
import { NavLink as NavLinkRRD, Link } from 'react-router-dom'
// nodejs library to set properties for components
import { PropTypes } from 'prop-types'

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from 'reactstrap'

var ps

function Sidebar(props) {
  const [collapseOpen, collapseOpenSetter] = useState(false)
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? 'active' : ''
  }
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    collapseOpenSetter(prev => !prev)
  }
  // closes the collapse
  const closeCollapse = () => {
    collapseOpenSetter(false)
  }
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes, t) => {
    return routes.map((prop, key) => {
      return prop.appearInSidebar ? (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName="active">
            <i className={prop.icon} />
            {t(prop.name)}
          </NavLink>
        </NavItem>
      ) : null
    })
  }
  const { t } = props
  const { bgColor, routes, logo } = props
  let navbarBrandProps
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link
    }
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: '_blank'
    }
  }
  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main">
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}>
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require('assets/img/theme/team-4-800x800.jpg')}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">{t('Welcome')}!</h6>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                href="#pablo"
                onClick={e => {
                  e.preventDefault()
                  localStorage.removeItem('user-enatega')
                  props.history.push('/auth/login')
                }}>
                <i className="ni ni-user-run" />
                <span>{t('Logout')}</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>

          {/* Navigation */}
          <Nav navbar>{createLinks(routes, t)}</Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}

Sidebar.defaultProps = {
  routes: [{}]
}

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
}

export default withTranslation()(Sidebar)
