import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { validateFunc } from '../../constraints/constraints'
import { withTranslation } from 'react-i18next'
import Loader from 'react-loader-spinner'

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
import { editCoupon, createCoupon, getCoupons } from '../../apollo/server'

const CREATE_COUPON = gql`
  ${createCoupon}
`
const EDIT_COUPON = gql`
  ${editCoupon}
`
const GET_COUPONS = gql`
  ${getCoupons}
`

function Coupan(props) {
  const [code, codeSetter] = useState(props.coupon ? props.coupon.code : '')
  const [discount, discountSetter] = useState(
    props.coupon ? props.coupon.discount : ''
  )
  const [enabled, enabledSetter] = useState(
    props.coupon ? props.coupon.enabled : false
  )
  const [errorMessage, errorMessageSetter] = useState('')
  const [successMessage, successMessageSetter] = useState('')
  const [codeError, codeErrorSetter] = useState(null)
  const [discountError, discountErrorSetter] = useState(null)
  const mutation = useState(props.coupon ? EDIT_COUPON : CREATE_COUPON)

  const onBlur = (setter, field, state) => {
    setter(!validateFunc({ [field]: state }, field))
  }
  const onSubmitValidaiton = () => {
    const codeError = !validateFunc({ code: code }, 'code')
    const discountError = !validateFunc({ discount: discount }, 'discount')
    codeErrorSetter(codeError)
    discountErrorSetter(discountError)
    return codeError && discountError
  }
  const clearFields = () => {
    codeSetter('')
    discountSetter('')
    codeErrorSetter(null)
    discountErrorSetter(null)
  }
  const onCompleted = data => {
    const message = props.coupon ? 'Coupon updated' : 'Coupon added'
    successMessageSetter(message)
    errorMessageSetter('')
    if (!props.coupon) clearFields()
  }
  const onError = error => {
    console.log(error.networkError.result.errors[0].message)
    let message = ''
    try {
      message = error.networkError.result.errors[0].message
    } catch (err) {
      message = 'Action failed. Please Try again'
    }
    // const message = 'Action failed. Please Try again'
    successMessageSetter('')
    errorMessageSetter(message)
  }
  const update = (proxy, { data: { createCoupon } }) => {
    try {
      if (createCoupon) {
        const data = proxy.readQuery({ query: GET_COUPONS })
        data.coupons.push(createCoupon)
        proxy.writeQuery({ query: GET_COUPONS, data })
      }
    } catch (error) {
      console.error(error)
    }
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
                  {props.coupon ? t('Edit Coupon') : t('Add Coupon')}
                </h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <label className="form-control-label" htmlFor="input-code">
                      {t('Coupon Code')}
                    </label>
                    <br />
                    <br />
                    <FormGroup
                      className={
                        codeError === null
                          ? ''
                          : codeError
                            ? 'has-success'
                            : 'has-danger'
                      }>
                      <Input
                        className="form-control-alternative"
                        id="input-code"
                        placeholder="e.g SALE50"
                        type="text"
                        value={code}
                        onChange={event => {
                          codeSetter(event.target.value)
                        }}
                        onBlur={event => {
                          onBlur(codeErrorSetter, 'code', code)
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <label
                      className="form-control-label"
                      htmlFor="input-discount">
                      {t('Discount Percent')}
                    </label>
                    <br />
                    <small>Between 1 and 100</small>
                    <FormGroup
                      className={
                        discountError === null
                          ? ''
                          : discountError
                            ? 'has-success'
                            : 'has-danger'
                      }>
                      <Input
                        className="form-control-alternative"
                        id="input-discount"
                        placeholder="1-99"
                        type="number"
                        value={discount}
                        onChange={event => {
                          discountSetter(event.target.value)
                        }}
                        onBlur={event => {
                          onBlur(discountErrorSetter, 'discount', discount)
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {!props.coupon && (
                  <Row>
                    <Col lg="6">
                      <label
                        className="form-control-label"
                        htmlFor="input-enabled">
                        {t('Enabled/Disabled')}
                      </label>
                      <FormGroup>
                        <label className="custom-toggle">
                          <input
                            defaultChecked={enabled}
                            type="checkbox"
                            onChange={event => {
                              enabledSetter(event.target.checked)
                            }}
                          />
                          <span className="custom-toggle-slider rounded-circle" />
                        </label>
                      </FormGroup>
                    </Col>
                  </Row>
                )}

                <Row>
                  <Col lg="6">
                    {successMessage && (
                      <UncontrolledAlert color="success" fade={true}>
                        <span className="alert-inner--text">
                          {successMessage}
                        </span>
                      </UncontrolledAlert>
                    )}
                    {errorMessage && (
                      <UncontrolledAlert color="danger" fade={true}>
                        <span className="alert-inner--text">
                          {errorMessage}
                        </span>
                      </UncontrolledAlert>
                    )}
                  </Col>
                  <Mutation
                    mutation={mutation[0]}
                    onCompleted={onCompleted}
                    onError={onError}
                    refetchQueries={[{ query: GET_COUPONS }]}
                    update={update}>
                    {(mutate, { loading, error }) => {
                      if (loading) {
                        return (
                          <Col className="text-right" lg="6">
                            <Button color="primary" onClick={() => null}>
                              <Loader
                                type="TailSpin"
                                color="#FFF"
                                height={25}
                                width={30}
                                visible={loading}
                              />
                            </Button>
                          </Col>
                        )
                      }
                      return (
                        <Col className="text-right" lg="6">
                          <Button
                            color="primary"
                            href="#pablo"
                            onClick={async e => {
                              e.preventDefault()
                              successMessageSetter('')
                              errorMessageSetter('')
                              if (onSubmitValidaiton()) {
                                mutate({
                                  variables: {
                                    couponInput: {
                                      _id: props.coupon ? props.coupon._id : '',
                                      code: code,
                                      discount: +discount,
                                      enabled: enabled
                                    }
                                  }
                                })
                              }
                            }}
                            size="md">
                            {t('Save')}
                          </Button>
                        </Col>
                      )
                    }}
                  </Mutation>
                </Row>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default withTranslation()(Coupan)
