import React, { useState } from 'react'

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

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { resetPassword } from '../apollo/server'
import { validateFunc } from '../constraints/constraints'

const RESET_PASSWORD = gql`
  ${resetPassword}
`

const ResetPassword = props => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const onBlur = (event, field) => {
    if (field === 'password') {
      setPasswordError(!validateFunc({ password: password }, 'password'))
    } else if (field === 'confirmPassword') {
      setConfirmPasswordError(
        !validateFunc(
          { confirmPassword: confirmPassword, password: password },
          'confirmPassword'
        )
      )
    }
  }
  const validate = () => {
    const ConfirmPasswordError = !validateFunc(
      { password: password, confirmPassword: confirmPassword },
      'confirmPassword'
    )
    const PasswordError = !validateFunc({ password: password }, 'password')
    setPasswordError(PasswordError)
    setConfirmPasswordError(ConfirmPasswordError)
    return ConfirmPasswordError && PasswordError
  }
  const onCompleted = data => {
    setConfirmPasswordError(null)
    setPasswordError(null)
    setSuccess('Password has been updated')
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Reset Password</small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
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
              <FormGroup
                className={
                  confirmPasswordError === null
                    ? ''
                    : confirmPasswordError
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
                    value={confirmPassword}
                    onChange={event => {
                      setConfirmPassword(event.target.value)
                    }}
                    onBlur={event => {
                      onBlur(event, 'confirmPassword')
                    }}
                    placeholder="Confirm Password"
                    type="password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Mutation
                  mutation={RESET_PASSWORD}
                  onCompleted={onCompleted}
                  onError={error => {
                    setConfirmPasswordError(null)
                    setPasswordError(null)
                    setError(error.networkError.result.errors[0].message)
                  }}>
                  {(resetPassword, { loading, error }) => {
                    return (
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={() => {
                          setConfirmPasswordError(null)
                          setPasswordError(null)
                          setError(null)
                          setSuccess(null)
                          const params = new URLSearchParams(
                            props.location.search
                          )
                          if (validate() && params.get('reset')) {
                            resetPassword({
                              variables: {
                                password: password,
                                token: params.get('reset')
                              }
                            })
                          }
                        }}>
                        Reset
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
              {success && (
                <UncontrolledAlert color="success" fade={true}>
                  <span className="alert-inner--text">{success}</span>
                </UncontrolledAlert>
              )}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default ResetPassword
