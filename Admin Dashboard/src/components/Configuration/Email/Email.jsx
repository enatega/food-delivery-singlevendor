import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Row,
  Col,
  Card,
  CardHeader,
  FormGroup,
  Form,
  Input,
  Button
} from 'reactstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { validateFunc } from '../../../constraints/constraints'
import { saveEmailConfiguration } from '../../../apollo/server'
import Loader from 'react-loader-spinner'

const SAVE_EMAIL_CONFIGURATION = gql`
  ${saveEmailConfiguration}
`

function Email(props) {
  const [email, emailSetter] = useState(props.email || '')
  const [password, passwordSetter] = useState(props.password || '')
  const [enableEmail, enableEmailSetter] = useState(!!props.enabled)
  const [emailError, emailErrorSetter] = useState(null)
  const [passwordError, passwordErrorSetter] = useState(null)

  const validateInput = () => {
    let emailResult = true
    let passwordResult = true
    emailResult = !validateFunc({ email: email }, 'email')
    passwordResult = !validateFunc({ password: password }, 'password')
    emailErrorSetter(emailResult)
    passwordErrorSetter(passwordResult)
    return emailResult && passwordResult
  }
  const onBlur = (setter, field, event) => {
    setter(!validateFunc({ [field]: event.target.value.trim() }, field))
  }
  const onCompleted = data => {
    console.log(data)
  }
  const onError = error => {
    console.log(error)
  }
  const { t } = props
  return (
    <Row className="mt-3">
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">{t('Email')}</h3>
          </CardHeader>
          <Form>
            <div className="pl-lg-4">
              <Row>
                <Col md="8">
                  <label className="form-control-label" htmlFor="input-email">
                    {t('Email')}
                  </label>
                  <FormGroup
                    className={
                      emailError === null
                        ? ''
                        : emailError
                          ? 'has-success'
                          : 'has-danger'
                    }>
                    <Input
                      className="form-control-alternative"
                      id="input-email"
                      placeholder="e.g something@email.com"
                      type="text"
                      defaultValue={email}
                      onChange={event => {
                        emailSetter(event.target.value)
                      }}
                      onBlur={event => {
                        onBlur(emailErrorSetter, 'email', event)
                      }}></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="8">
                  <label
                    className="form-control-label"
                    htmlFor="input-password">
                    {t('Password')}
                  </label>
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
                      placeholder="e.g FOOD-"
                      type="password"
                      defaultValue={password}
                      onChange={event => {
                        passwordSetter(event.target.value)
                      }}
                      onBlur={event => {
                        onBlur(passwordErrorSetter, 'password', event)
                      }}></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="8">
                  <label className="form-control-label" htmlFor="input-enable">
                    {t('Enable/Disable')}
                  </label>
                  <FormGroup>
                    <label className="custom-toggle">
                      <input
                        defaultChecked={enableEmail}
                        type="checkbox"
                        onChange={event => {
                          enableEmailSetter(event.target.checked)
                        }}
                      />
                      <span className="custom-toggle-slider rounded-circle" />
                    </label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Mutation
                    mutation={SAVE_EMAIL_CONFIGURATION}
                    onCompleted={onCompleted}
                    onError={onError}>
                    {(saveConfiguration, { loading, error }) => {
                      if (loading) {
                        return (
                          <Button
                            className="btn-block mb-2"
                            color="primary"
                            onClick={() => null}>
                            <Loader
                              type="TailSpin"
                              color="#FFF"
                              height={25}
                              width={30}
                              visible={loading}
                            />
                          </Button>
                        )
                      }
                      if (error) return t('Error')
                      return (
                        <Button
                          disabled
                          className="btn-block mb-2"
                          type="button"
                          color="primary"
                          onClick={e => {
                            e.preventDefault()
                            if (validateInput()) {
                              saveConfiguration({
                                variables: {
                                  configurationInput: {
                                    email: email,
                                    password: password,
                                    enable_email: enableEmail
                                  }
                                }
                              })
                            }
                          }}
                          size="lg">
                          {t('Save')}
                        </Button>
                      )
                    }}
                  </Mutation>
                </Col>
              </Row>
            </div>
          </Form>
        </Card>
      </div>
    </Row>
  )
}
export default withTranslation()(Email)
