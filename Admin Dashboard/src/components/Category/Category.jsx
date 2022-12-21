/* eslint-disable camelcase */
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

import { cloudinary_upload_url, cloudinary_category } from '../../config/config'
import { editCategory, createCategory, categories } from '../../apollo/server'

const CREATE_CATEGORY = gql`
  ${createCategory}
`
const EDIT_CATEGORY = gql`
  ${editCategory}
`
const GET_CATEGORIES = gql`
  ${categories}
`

function Category(props) {
  const [title, titleSetter] = useState(
    props.category ? props.category.title : ''
  )
  const [description, descriptionSetter] = useState(
    props.category ? props.category.description : ''
  )
  const [imgMenu, imgMenuSetter] = useState(
    props.category ? props.category.img_menu : ''
  )
  const [errorMessage, errorMessageSetter] = useState('')
  const [successMessage, successMessageSetter] = useState('')
  const [titleError, titleErrorSetter] = useState(null)
  const [descriptionError, descriptionErrorSetter] = useState(null)
  const mutation = useState(props.category ? EDIT_CATEGORY : CREATE_CATEGORY)

  const filterImage = event => {
    let images = []
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i)
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
    // let message = `${images.length} valid image(s) selected`
    // console.log(message)
    return images.length ? images[0] : undefined
  }
  const selectImage = (event, state) => {
    const result = filterImage(event)
    if (result) {
      imageToBase64(result)
    }
  }

  const onBlur = (setter, field, state) => {
    setter(!validateFunc({ [field]: state }, field))
  }
  const onSubmitValidaiton = () => {
    const titleError = !validateFunc(
      { category_title: title },
      'category_title'
    )
    const descriptionError = !validateFunc(
      { category_description: description },
      'category_description'
    )
    titleErrorSetter(titleError)
    descriptionErrorSetter(descriptionError)
    return titleError && descriptionError
  }
  const clearFields = () => {
    titleSetter('')
    descriptionSetter('')
    imgMenuSetter('')
    titleErrorSetter(null)
    descriptionErrorSetter(null)
  }
  const onCompleted = data => {
    const message = props.category
      ? 'Category updated successfully'
      : 'Category added successfully'
    successMessageSetter(message)
    errorMessageSetter('')
    if (!props.category) clearFields()
    setTimeout(hideMessage, 3000)
  }
  const onError = () => {
    const message = 'Action failed. Please Try again'
    successMessageSetter('')
    errorMessageSetter(message)
    setTimeout(hideMessage, 3000)
  }
  const hideMessage = () => {
    successMessageSetter('')
    errorMessageSetter('')
  }
  const imageToBase64 = imgUrl => {
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      imgMenuSetter(fileReader.result)
    }
    fileReader.readAsDataURL(imgUrl)
  }
  const uploadImageToCloudinary = async() => {
    if (imgMenu === '') {
      return imgMenu
    }
    if (props.category && props.category.img_menu === imgMenu) {
      return imgMenu
    }

    const apiUrl = cloudinary_upload_url
    const data = {
      file: imgMenu,
      upload_preset: cloudinary_category
    }
    try {
      const result = await fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
      const imageData = await result.json()
      return imageData.secure_url
    } catch (e) {
      console.log(e)
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
                  {props.category ? t('Edit Category') : t('Add Category')}
                </h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <label className="form-control-label" htmlFor="input-title">
                      {t('Title')}
                    </label>
                    <br />
                    <FormGroup
                      className={
                        titleError === null
                          ? ''
                          : titleError
                            ? 'has-success'
                            : 'has-danger'
                      }>
                      <Input
                        className="form-control-alternative"
                        id="input-title"
                        placeholder="e.g Breakfast"
                        type="text"
                        value={title}
                        onChange={event => {
                          titleSetter(event.target.value)
                        }}
                        onBlur={event => {
                          onBlur(titleErrorSetter, 'category_title', title)
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <label
                      className="form-control-label"
                      htmlFor="input-description">
                      {t('Description')}
                    </label>
                    <br />
                    <FormGroup
                      className={
                        descriptionError === null
                          ? ''
                          : descriptionError
                            ? 'has-success'
                            : 'has-danger'
                      }>
                      <Input
                        className="form-control-alternative"
                        id="input-description"
                        placeholder="e.g All happiness depends on leisurely breakfast."
                        type="text"
                        value={description}
                        onChange={event => {
                          descriptionSetter(event.target.value)
                        }}
                        onBlur={event => {
                          onBlur(
                            descriptionErrorSetter,
                            'category_description',
                            description
                          )
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <div className="card-title-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          {imgMenu && typeof imgMenu === 'string' && (
                            <img
                              alt="menu img"
                              style={{ width: '200px', height: '200px' }}
                              src={imgMenu}
                            />
                          )}
                        </a>
                        <input
                          className="mt-4"
                          type="file"
                          onChange={event => {
                            selectImage(event, 'imgMenu')
                          }}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Mutation
                    mutation={mutation[0]}
                    onCompleted={onCompleted}
                    onError={onError}
                    refetchQueries={[{ query: GET_CATEGORIES }]}>
                    {(mutate, { loading, error }) => {
                      if (loading) {
                        return (
                          <Col className="text-right" xs="12">
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
                        <Col className="text-right" xs="12">
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
                                    _id: props.category
                                      ? props.category._id
                                      : '',
                                    title: title,
                                    description: description,
                                    img_menu: await uploadImageToCloudinary()
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
                <Row>
                  <Col lg="6">
                    {successMessage && (
                      <UncontrolledAlert color="success" fade={true}>
                        <span className="alert-inner--icon">
                          <i className="ni ni-like-2" />
                        </span>{' '}
                        <span className="alert-inner--text">
                          <strong>{t('Success')}!</strong> {successMessage}
                        </span>
                      </UncontrolledAlert>
                    )}
                    {errorMessage && (
                      <UncontrolledAlert color="danger" fade={true}>
                        <span className="alert-inner--icon">
                          <i className="ni ni-like-2" />
                        </span>{' '}
                        <span className="alert-inner--text">
                          <strong>{t('Danger')}!</strong> {errorMessage}
                        </span>
                      </UncontrolledAlert>
                    )}
                  </Col>
                </Row>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default withTranslation()(Category)
