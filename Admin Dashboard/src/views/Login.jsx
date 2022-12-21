import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  UncontrolledAlert
} from 'reactstrap'

import { Redirect } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { adminLogin } from '../apollo/server'
import { validateFunc } from '../constraints/constraints'
const LOGIN = gql`
  ${adminLogin}
`

const Login = props => {
  const [email, setEmail] = useState('admin@enatega.com')
  const [password, setPassword] = useState('enatega123')
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [error, setError] = useState(null)
  const [redirectToReferrer, setRedirectToReferrer] = useState(
    !!localStorage.getItem('user-enatega')
  )

  const onBlur = (event, field) => {
    if (field === 'email') {
      setEmailError(!validateFunc({ email: email }, 'email'))
    }
    if (field === 'password') {
      setPasswordError(!validateFunc({ password: password }, 'password'))
    }
  }
  const validate = () => {
    const EmailError = !validateFunc({ email: email }, 'email')
    const PasswordError = !validateFunc({ password: password }, 'password')
    setEmailError(EmailError)
    setPasswordError(PasswordError)
    return EmailError && PasswordError
  }

  const { from } = props.location.state || { from: { pathname: '/' } }
  const { t } = props
  if (redirectToReferrer) return <Redirect to={from} />
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>{t('Sign in credentials')}</small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup
                className={
                  emailError === null
                    ? ''
                    : emailError
                      ? 'has-success'
                      : 'has-danger'
                }>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={email}
                    onChange={event => {
                      setEmail(event.target.value)
                    }}
                    onBlur={event => {
                      onBlur(event, 'email')
                    }}
                    placeholder="Email"
                    type="email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup
                className={
                  passwordError === null
                    ? ''
                    : passwordError
                      ? 'has-success'
                      : 'has-danger'
                }>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={password}
                    onChange={event => {
                      setPassword(event.target.value)
                    }}
                    onBlur={event => {
                      onBlur(event, 'password')
                    }}
                    placeholder="Password"
                    type="password"
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Mutation
                  mutation={LOGIN}
                  onCompleted={data => {
                    localStorage.setItem(
                      'user-enatega',
                      JSON.stringify(data.adminLogin)
                    )
                    setRedirectToReferrer(true)
                    setEmailError(null)
                    setPasswordError(null)
                  }}
                  onError={error => {
                    console.log('error', JSON.stringify(error))
                    setEmailError(null)
                    setPasswordError(null)
                    setError(error.graphQLErrors[0].message)
                  }}>
                  {(adminLogin, { loading, error }) => {
                    return (
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={() => {
                          setEmailError(null)
                          setPasswordError(null)
                          if (validate()) {
                            adminLogin({ variables: { password, email } })
                          }
                        }}>
                        {t('Sign in')}
                      </Button>
                    )
                  }}
                </Mutation>
              </div>
              {error && (
                <UncontrolledAlert color="danger" fade={true}>
                  <span className="alert-inner--text">{error}</span>
                </UncontrolledAlert>
              )}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default withTranslation()(Login)
