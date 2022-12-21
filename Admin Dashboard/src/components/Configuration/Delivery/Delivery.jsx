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
import { saveDeliveryConfiguration } from '../../../apollo/server'
import Loader from 'react-loader-spinner'

const SAVE_DELIVERY_CONFIGURATION = gql`
  ${saveDeliveryConfiguration}
`

function Delivery(props) {
  const [deliveryCharges, deliveryChargesSetter] = useState(
    props.deliveryCharges || 0
  )
  const [deliveryChargesError, deliveryChargesErrorSetter] = useState(null)

  const onBlur = (setter, field, event) => {
    setter(!validateFunc({ [field]: event.target.value.trim() }, field))
  }
  const validateInput = () => {
    const deliveryChargesError = !isNaN(deliveryCharges)
    deliveryChargesErrorSetter(deliveryChargesError)
    return deliveryChargesError
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
            <h3 className="mb-0">{t('Delivery Charges')}</h3>
          </CardHeader>
          <Form>
            <div className="pl-lg-4">
              <Row>
                <Col md="8">
                  <label
                    className="form-control-label"
                    htmlFor="input-deliverycharges">
                    {t('Price')}
                  </label>
                  <FormGroup
                    className={
                      deliveryChargesError === null
                        ? ''
                        : deliveryChargesError
                          ? 'has-success'
                          : 'has-danger'
                    }>
                    <Input
                      className="form-control-alternative"
                      id="input-deliverycharges"
                      placeholder="e.g 30.00"
                      type="number"
                      defaultValue={deliveryCharges}
                      onChange={event => {
                        deliveryChargesSetter(event.target.value)
                      }}
                      onBlur={event => {
                        onBlur(
                          deliveryChargesErrorSetter,
                          'deliveryCharges',
                          event
                        )
                      }}></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Mutation
                    mutation={SAVE_DELIVERY_CONFIGURATION}
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
                          className="btn-block mb-2"
                          type="button"
                          color="primary"
                          onClick={e => {
                            e.preventDefault()
                            if (validateInput()) {
                              saveConfiguration({
                                variables: {
                                  configurationInput: {
                                    delivery_charges: Number(deliveryCharges)
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

export default withTranslation()(Delivery)
