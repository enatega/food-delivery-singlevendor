import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
// reactstrap components
import { Container, Row } from 'reactstrap'

// core components
import AuthNavbar from '../components/Navbars/AuthNavbar.jsx'
import AuthFooter from '../components/Footers/AuthFooter.jsx'

import routes from '../routes.js'

function Auth(props) {
  useEffect(() => {
    document.body.classList.add('bg-default')
    return () => {
      document.body.classList.remove('bg-default')
    }
  }, [])
  function getRoutes(routes) {
    return routes.map((prop, key) => {
      if (prop.layout === '/auth') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }
  return (
    <>
      <div className="main-content">
        <AuthNavbar />
        <div className="header bg-gradient-warning py-7 py-lg-8">
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0">
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Switch>{getRoutes(routes)}</Switch>
          </Row>
        </Container>
      </div>
      <AuthFooter />
    </>
  )
}

export default Auth
