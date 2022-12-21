/* eslint-disable camelcase */
import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { validateFunc } from '../../constraints/constraints'
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
  Row,
  Col,
  UncontrolledAlert
} from 'reactstrap'
// core components
import { createRider, editRider, getRiders } from '../../apollo/server'
import Loader from 'react-loader-spinner'
const CREATE_RIDER = gql`
  ${createRider}
`
const EDIT_RIDER = gql`
  ${editRider}
`
const GET_RIDERS = gql`
  ${getRiders}
`

function Rider(props) {
  const mutation = useState(props.rider ? EDIT_RIDER : CREATE_RIDER)
  const [name, nameSetter] = useState(props.rider ? props.rider.name : '')
  const [username, usernameSetter] = useState(
    props.rider ? props.rider.username : ''
  )
  const [password, passwordSetter] = useState(
    props.rider ? props.rider.password : ''
  )
  const [phone, phoneSetter] = useState(props.rider ? props.rider.phone : '')
  const [available, availableSetter] = useState(
    props.rider ? props.rider.available : true
  )
  const [mainError, errorSetter] = useState('')
  const [success, successSetter] = useState('')
  const [nameError, nameErrorSetter] = useState(null)
  const [usernameError, usernameErrorSetter] = useState(null)
  const [passwordError, passwordErrorSetter] = useState(null)
  const [phoneError, phoneErrorSetter] = useState(null)

  const onBlur = (setter, field, state) => {
    setter(!validateFunc({ [field]: state }, field))
  }
  const onSubmitValidaiton = () => {
    const nameError = !validateFunc({ name: name }, 'name')
    const usernameError = !validateFunc({ username: username }, 'username')
    const passwordError = !validateFunc({ password: password }, 'password')
    const phoneError = !validateFunc({ phone: phone }, 'phone')

    nameErrorSetter(nameError)
    usernameErrorSetter(usernameError)
    phoneErrorSetter(phoneError)
    passwordErrorSetter(passwordError)

    return nameError && usernameError && phoneError && passwordError
  }
  const clearFields = () => {
    nameSetter('')
    usernameSetter('')
    passwordSetter('')
    phoneSetter('')
    nameErrorSetter(null)
    usernameErrorSetter(null)
    passwordErrorSetter(null)
    phoneErrorSetter(null)
  }
  const onCompleted = data => {
    if (!props.rider) clearFields()
    const message = props.rider
      ? 'Rider updated successfully'
      : 'Rider added successfully'
    errorSetter('')
    successSetter(message)
    setTimeout(hideAlert, 5000)
  }
  const update = (proxy, { data: { createRider } }) => {
    try {
      if (createRider) {
        const data = proxy.readQuery({ query: GET_RIDERS })
        data.riders.push(createRider)
        proxy.writeQuery({ query: GET_RIDERS, data })
      }
    } catch (error) {
      console.error(error)
    }
  }
  const onError = ({ graphQLErrors, networkError }) => {
    console.log(networkError)
    if (networkError) {
      errorSetter(networkError.result.errors[0].message)
    } else if (graphQLErrors) {
      errorSetter(graphQLErrors.result.errors[0].message)
    }
    successSetter('')
    setTimeout(hideAlert, 5000)
  }
  const hideAlert = () => {
    errorSetter('')
    successSetter('')
  }

  const { t } = props
  return (
    <Row>
      <Col className="order-xl-1">
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">
                  {props.rider ? t('Edit Rider') : t('Add Rider')}
                </h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Mutation
              mutation={mutation[0]}
              onCompleted={onCompleted}
              onError={onError}
              update={update}>
              {(mutate, { loading, error }) => {
                if (loading) {
                  return (
                    <Loader
                      className="text-center"
                      type="TailSpin"
                      color="#fb6340"
                      height={100}
                      width={100}
                      visible={loading}
                    />
                  )
                }
                return (
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <label
                            className="form-control-label"
                            htmlFor="input-name">
                            {t('Name')}
                          </label>
                          <br />
                          <small>{t('Character limit of max length 20')}</small>
                          <FormGroup
                            className={
                              nameError === null
                                ? ''
                                : nameError
                                  ? 'has-success'
                                  : 'has-danger'
                            }>
                            <Input
                              className="form-control-alternative"
                              id="input-name"
                              placeholder="e.g John Doe"
                              type="text"
                              maxLength="20"
                              value={name}
                              onChange={event => {
                                nameSetter(event.target.value)
                              }}
                              onBlur={event => {
                                onBlur(nameErrorSetter, 'name', name)
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <label
                            className="form-control-label"
                            htmlFor="input-username">
                            {t('Username')}
                          </label>
                          <br />
                          <small>{t('Character limit of max length 20')}</small>
                          <FormGroup
                            className={
                              usernameError === null
                                ? ''
                                : usernameError
                                  ? 'has-success'
                                  : 'has-danger'
                            }>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              placeholder="e.g ridername007"
                              maxLength="20"
                              type="text"
                              value={username}
                              onChange={event => {
                                usernameSetter(event.target.value.toLowerCase())
                              }}
                              onBlur={event => {
                                onBlur(
                                  usernameErrorSetter,
                                  'username',
                                  username
                                )
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <label
                            className="form-control-label"
                            htmlFor="input-phone">
                            {t('Phone')}
                          </label>
                          <br />
                          <small>{t('Character limit of max length 20')}</small>
                          <FormGroup
                            className={
                              phoneError === null
                                ? ''
                                : phoneError
                                  ? 'has-success'
                                  : 'has-danger'
                            }>
                            <Input
                              className="form-control-alternative"
                              id="input-phone"
                              placeholder="e.g 923458989989"
                              maxLength="20"
                              type="number"
                              value={phone}
                              onChange={event => {
                                phoneSetter(event.target.value)
                              }}
                              onBlur={event => {
                                onBlur(phoneErrorSetter, 'phone', phone)
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <label
                            className="form-control-label"
                            htmlFor="input-password">
                            {t('Password')}
                          </label>
                          <br />
                          <small>{t('Character limit of max length 20')}</small>
                          <FormGroup
                            className={
                              passwordError === null
                                ? ''
                                : passwordError
                                  ? 'has-success'
                                  : 'has-danger'
                            }>
                            <Input
                              className="form-control-alternative"
                              id="input-password"
                              placeholder="e.g 132"
                              maxLength="20"
                              type="text"
                              value={password}
                              onChange={event => {
                                passwordSetter(event.target.value)
                              }}
                              onBlur={event => {
                                onBlur(
                                  passwordErrorSetter,
                                  'password',
                                  password
                                )
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <label
                            className="form-control-label"
                            htmlFor="input-available">
                            {t('Available')}
                          </label>
                          <FormGroup>
                            <label className="custom-toggle">
                              <input
                                defaultChecked={available}
                                type="checkbox"
                                onChange={event => {
                                  availableSetter(event.target.checked)
                                }}
                              />
                              <span className="custom-toggle-slider rounded-circle" />
                            </label>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          {success && (
                            <UncontrolledAlert color="success" fade={true}>
                              <span className="alert-inner--text">
                                {success}
                              </span>
                            </UncontrolledAlert>
                          )}
                          {mainError && (
                            <UncontrolledAlert color="danger" fade={true}>
                              <span className="alert-inner--text">
                                {mainError}
                              </span>
                            </UncontrolledAlert>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col className="text-right" lg="6">
                          <Button
                            color="primary"
                            href="#pablo"
                            onClick={async e => {
                              e.preventDefault()
                              if (onSubmitValidaiton()) {
                                mutate({
                                  variables: {
                                    riderInput: {
                                      _id: props.rider ? props.rider._id : '',
                                      name: name,
                                      username: username,
                                      password: password,
                                      phone: phone,
                                      available: available
                                    }
                                  }
                                })
                              }
                              errorSetter('')
                              successSetter('')
                            }}
                            size="md">
                            {t('Save')}
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                )
              }}
            </Mutation>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default withTranslation()(Rider)
