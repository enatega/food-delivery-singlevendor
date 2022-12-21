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
import { saveOrderConfiguration } from '../../../apollo/server'
import Loader from 'react-loader-spinner'

const SAVE_ORDER_CONFIGURATION = gql`
  ${saveOrderConfiguration}
`

function Order(props) {
  const [prefix, prefixSetter] = useState(props.prefix || '')
  const [prefixError, prefixErrorSetter] = useState(null)
  const validateInput = () => {
    let result = true
    result = !validateFunc({ prefix: prefix }, 'prefix')
    prefixErrorSetter(result)
    return result
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
            <h3 className="mb-0">{t('Order')}</h3>
          </CardHeader>
          <Form>
            <div className="pl-lg-4">
              <Row>
                <Col md="8">
                  <label className="form-control-label" htmlFor="input-orderid">
                    {t('OrderID prefix')}
                  </label>
                  <FormGroup
                    className={
                      prefixError === null
                        ? ''
                        : prefixError
                          ? 'has-success'
                          : 'has-danger'
                    }>
                    <Input
                      className="form-control-alternative"
                      id="input-orderid"
                      placeholder="e.g FOOD-"
                      type="text"
                      defaultValue={prefix}
                      onChange={event => {
                        prefixSetter(event.target.value)
                      }}
                      onBlur={event => {
                        onBlur(prefixErrorSetter, 'prefix', event)
                      }}></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Mutation
                    mutation={SAVE_ORDER_CONFIGURATION}
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
                      if (error) return 'Error :('
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
                                    order_id_prefix: prefix
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
export default withTranslation()(Order)
