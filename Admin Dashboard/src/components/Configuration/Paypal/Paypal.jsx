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

function Paypal(props) {
  const clientId = useState(props.clientId || '')
  const clientSecret = useState(props.clientSecret || '')
  const sandbox = useState(!!props.sandbox)
  const [clientIdError] = useState(null)
  const [clientSecretError] = useState(null)

  const { t } = props
  console.log(clientIdError)
  return (
    <Row className="mt-3">
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">{t('Paypal')}</h3>
          </CardHeader>
          <Form>
            <div className="pl-lg-4">
              <Row>
                <Col md="8">
                  <label
                    className="form-control-label"
                    htmlFor="input-clientid">
                    {t('Client ID')}
                  </label>
                  <FormGroup
                    className={
                      clientIdError === null
                        ? ''
                        : clientIdError
                          ? 'has-success'
                          : 'has-danger'
                    }>
                    <Input
                      className="form-control-alternative"
                      id="input-clientid"
                      placeholder="e.g AeGIgSX--JEVwoQgLjGOb8gh1DUJG0MFVgLc2mBIe6_V5NefV0LM3L78m01fLLI6U2FFB-qJr4ErrtL1"
                      type="text"
                      defaultValue={clientId}
                      disabled></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="8">
                  <label
                    className="form-control-label"
                    htmlFor="input-clientsecret">
                    {t('Client Secret')}
                  </label>
                  <FormGroup
                    className={
                      clientSecretError === null
                        ? ''
                        : clientSecretError
                          ? 'has-success'
                          : 'has-danger'
                    }>
                    <Input
                      className="form-control-alternative"
                      id="input-clientsecret"
                      placeholder="e.g EHAP6CSZt3kwzcpdxrpw16PqHEspw5wtJCVVux_95e2Qcwbeh6mQp9GncEbxnVFkEbJu4z1i-GuDDthf"
                      type="text"
                      defaultValue={clientSecret}
                      disabled></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="8">
                  <label className="form-control-label" htmlFor="input-enable">
                    {t('Sandbox')}
                  </label>
                  <FormGroup>
                    <label className="custom-toggle">
                      <input
                        defaultChecked={sandbox}
                        type="checkbox"
                        disabled
                      />
                      <span className="custom-toggle-slider rounded-circle" />
                    </label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Button
                    className="btn-block mb-2"
                    type="button"
                    color="primary"
                    disabled
                    size="lg">
                    {t('Save')}
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </Card>
      </div>
    </Row>
  )
}

export default withTranslation()(Paypal)
