import React, { useState } from 'react'
import {
  Alert,
  Card,
  CardHeader,
  CardBody,
  Form,
  Row,
  Col,
  FormGroup,
  Input,
  Button
} from 'reactstrap'
import { withTranslation } from 'react-i18next'
import { Mutation, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { createOptions, getOptions, editOption } from '../../apollo/server'
import { validateFunc } from '../../constraints/constraints'
import Loader from 'react-loader-spinner'

const CREATE_OPTIONS = gql`
  ${createOptions}
`
const GET_OPTIONS = gql`
  ${getOptions}
`
const EDIT_OPTION = gql`
  ${editOption}
`

function Option(props) {
  const option = props.option
    ? [
      {
        ...props.option,
        titleError: false,
        descriptionError: false,
        priceError: false
      }
    ]
    : null
  const [options, optionsSetter] = useState(
    option || [
      {
        title: '',
        description: '',
        price: 0,
        titleError: false,
        descriptionError: false,
        priceError: false
      }
    ]
  )
  const [success, successSetter] = useState('')
  const [error, errorSetter] = useState('')

  const onBlur = (index, state) => {
    const option = options
    if (state === 'title') {
      option[index].titleError = !!validateFunc(
        { optionTitle: option[index][state] },
        'optionTitle'
      )
    }
    if (state === 'description') {
      option[index].descriptionError = !!validateFunc(
        { optionDescription: option[index][state] },
        'optionDescription'
      )
    }
    if (state === 'price') {
      option[index].priceError = !!validateFunc(
        { optionPrice: option[index][state] },
        'optionPrice'
      )
    }
    optionsSetter([...option])
  }
  const onAdd = index => {
    const option = options
    if (index === option.length - 1) {
      option.push({ title: '', description: '', price: 0 })
    } else {
      option.splice(index + 1, 0, { title: '', description: '', price: 0 })
    }
    optionsSetter([...option])
  }
  const onRemove = index => {
    if (options.length === 1 && index === 0) {
      return
    }
    const option = options
    option.splice(index, 1)
    console.log(option)
    optionsSetter([...option])
  }
  const onChange = (event, index, state) => {
    const option = options
    option[index][state] = event.target.value
    optionsSetter([...option])
  }
  const validate = () => {
    const option = options
    option.map((option, index) => {
      onBlur(index, 'title')
      onBlur(index, 'description')
      onBlur(index, 'price')
      return option
    })
    const error = option.filter(
      option =>
        option.titleError || option.descriptionError || option.priceError
    )
    if (!error.length) {
      return true
    }
    return false
  }
  const onCompleted = ({ createOptions, editOption }) => {
    if (createOptions) {
      optionsSetter([
        {
          title: '',
          description: '',
          price: 0,
          titleError: false,
          descriptionError: false,
          priceError: false
        }
      ])
      successSetter('Saved')
      errorSetter('')
    }
    if (editOption) {
      successSetter('Saved')
      errorSetter('')
    }
  }
  const onError = () => {
    errorSetter('An error occured while saving,Try again')
    successSetter('')
  }
  const update = (proxy, { data: { createOptions } }) => {
    try {
      if (createOptions) {
        const data = proxy.readQuery({ query: GET_OPTIONS })
        data.options = data.options.concat(createOptions)
        proxy.writeQuery({ query: GET_OPTIONS, data })
        if (props.updateOptions) {
          props.updateOptions(createOptions.map(({ _id }) => _id))
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  const onDismiss = () => {
    successSetter('')
    errorSetter('')
  }
  const { t } = props
  return (
    <Card>
      <CardHeader>Option</CardHeader>
      <CardBody>
        <Form>
          <div>
            <Row>
              <Col lg="3">
                <label className="form-control-label" htmlFor="input-title">
                  {t('Title')}
                </label>
                <br />
              </Col>
              <Col lg="3">
                <label
                  className="form-control-label"
                  htmlFor="input-description">
                  {t('Description')}
                </label>
                <br />
              </Col>
              <Col lg="3">
                <label className="form-control-label" htmlFor="input-price">
                  {t('Price')}
                </label>
                <br />
                <small>{t('Must be a number')}</small>
              </Col>
              {!props.option && (
                <Col lg="3">
                  <label className="form-control-label" htmlFor="input-price">
                    {t('Add/Remove')}
                  </label>
                </Col>
              )}
            </Row>
            {options.map((option, index) => (
              <Row key={index}>
                <Col lg="3">
                  <FormGroup
                    className={option.titleError === true ? 'has-danger' : ''}>
                    <Input
                      className="form-control-alternative"
                      id="input-title"
                      placeholder="e.g Pepsi"
                      type="text"
                      value={option.title}
                      onChange={event => {
                        onChange(event, index, 'title')
                      }}
                      onBlur={event => {
                        onBlur(index, 'title')
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <FormGroup
                    className={
                      option.descriptionError === true ? 'has-danger' : ''
                    }>
                    <Input
                      className="form-control-alternative"
                      id="input-description"
                      placeholder="e.g Optional"
                      type="text"
                      value={option.description}
                      onChange={event => {
                        onChange(event, index, 'description')
                      }}
                      onBlur={event => {
                        onBlur(index, 'description')
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <FormGroup
                    className={option.priceError === true ? 'has-danger' : ''}>
                    <Input
                      className="form-control-alternative"
                      id="input-price"
                      placeholder="e.g 90.25"
                      type="number"
                      min={'0'}
                      value={option.price}
                      onChange={event => {
                        onChange(event, index, 'price')
                      }}
                      onBlur={event => {
                        onBlur(index, 'price')
                      }}
                    />
                  </FormGroup>
                </Col>
                {!props.option && (
                  <Col lg="3">
                    <Button
                      color="danger"
                      onClick={() => {
                        onRemove(index)
                      }}>
                      -
                    </Button>{' '}
                    <Button
                      onClick={() => {
                        onAdd(index)
                      }}
                      color="primary">
                      +
                    </Button>
                  </Col>
                )}
              </Row>
            ))}
            <Row>
              <Col lg="4">
                <Mutation
                  mutation={props.option ? EDIT_OPTION : CREATE_OPTIONS}
                  onCompleted={onCompleted}
                  onError={onError}
                  refetchQueries={[{ query: GET_OPTIONS }]}
                  update={update}>
                  {(mutate, { loading }) => {
                    if (loading) {
                      return (
                        <Button disabled color="primary" onClick={() => null}>
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
                    return (
                      <Button
                        color="primary"
                        onClick={() => {
                          if (validate()) {
                            props.option
                              ? mutate({
                                variables: {
                                  optionInput: {
                                    _id: props.option._id,
                                    title: options[0].title,
                                    description: options[0].description,
                                    price: +options[0].price
                                  }
                                }
                              })
                              : mutate({
                                variables: {
                                  optionInput: options.map(
                                    ({ title, description, price }) => ({
                                      title,
                                      description,
                                      price: +price
                                    })
                                  )
                                }
                              })
                          }
                        }}>
                        {' '}
                        Save
                      </Button>
                    )
                  }}
                </Mutation>
              </Col>
              <Alert color="success" isOpen={!!success} toggle={onDismiss}>
                {success}
              </Alert>
              <Alert color="danger" isOpen={!!error} toggle={onDismiss}>
                {error}
              </Alert>
            </Row>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default compose(withApollo, withTranslation())(Option)
