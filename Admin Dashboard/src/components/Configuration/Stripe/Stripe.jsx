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

function Stripe(props) {
  const publishableKey = useState(props.publishableKey || '')
  const secretKey = useState(props.secretKey || '')
  const [publishableKeyError] = useState(null)
  const [secretKeyError] = useState(null)

  const { t } = props
  return (
    <Row className="mt-3">
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">Stripe</h3>
          </CardHeader>
          <Form>
            <div className="pl-lg-4">
              <Row>
                <Col md="8">
                  <label
                    className="form-control-label"
                    htmlFor="input-publishablekey">
                    {t('Publishable Key')}
                  </label>
                  <FormGroup
                    className={
                      publishableKeyError === null
                        ? ''
                        : publishableKeyError
                          ? 'has-success'
                          : 'has-danger'
                    }>
                    <Input
                      className="form-control-alternative"
                      id="input-publishablekey"
                      placeholder="e.g pk_test_lEaBbVGnTkzja2FyFiNlbqtw"
                      type="text"
                      defaultValue={publishableKey}
                      disabled></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="8">
                  <label
                    className="form-control-label"
                    htmlFor="input-secretkey">
                    {t('Secret Key')}
                  </label>
                  <FormGroup
                    className={
                      secretKeyError === null
                        ? ''
                        : secretKeyError
                          ? 'has-success'
                          : 'has-danger'
                    }>
                    <Input
                      className="form-control-alternative"
                      id="input-secretkey"
                      placeholder="e.g sk_test_rKNqVc2tSkdgZHNO3XnPCLn4"
                      type="text"
                      defaultValue={secretKey}
                      disabled></Input>
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
export default withTranslation()(Stripe)
