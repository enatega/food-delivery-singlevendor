/*eslint-disable*/
import React from 'react'
import { withTranslation } from 'react-i18next'
// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from 'reactstrap'

function Footer(props) {
  const { t } = props
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {t('2019-20')}{' '}
            <a
              className="font-weight-bold ml-1"
              href="https://enatega.com/"
              rel="noopener noreferrer"
              target="_blank">
              Enatega
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink
                href="https://enatega.com/"
                rel="noopener noreferrer"
                target="_blank">
                Enatega
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://ninjascode.com/our-team"
                rel="noopener noreferrer"
                target="_blank">
                {t('About Us')}
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://medium.com/@sharangohar"
                rel="noopener noreferrer"
                target="_blank">
                {t('Blog')}
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  )
}

export default withTranslation()(Footer)
