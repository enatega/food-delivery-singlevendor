import React, { useRef, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
// reactstrap components
import { Container } from 'reactstrap'
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.jsx'
import AdminFooter from 'components/Footers/AdminFooter.jsx'
import Sidebar from 'components/Sidebar/Sidebar.jsx'

import routes from 'routes.js'

const Admin = props => {
  var divRef = useRef(null)
  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    divRef.current.scrollTop = 0
  }, [])
  function getRoutes(routes) {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
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
  function getBrandText(path) {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name
      }
    }
    return 'Brand'
  }
  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/admin/dashboard',
          imgSrc: require('assets/img/brand/logo.png'),
          imgAlt: '...'
        }}
      />
      <div className="main-content" ref={divRef}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>{getRoutes(routes)}</Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  )
}
export default Admin
