import 'dotenv/config'
import { create } from 'temba'
import fs from 'fs'

const config = {
  resourceNames: ['questions'],
  apiPrefix: 'api',
  requestBodyValidator: {
    post: (resourceName, requestBody) => {
      return validateRequest(resourceName, requestBody)
    },
    put: (resourceName, requestBody) => {
      return validateRequest(resourceName, requestBody)
    },
  },
}

const server = create(config)

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Temba is running on port ${port} ✅`)
})

const validateRequest = (resourceName, requestBody) => {
  return validate[resourceName](requestBody)
}

const validate = {
  questions: (requestBody) => {
    let sanitize = ({ question, answers, code, codeUrl, categories }) => ({
      question,
      answers,
      code,
      codeUrl,
      categories,
    })
    const question = sanitize(requestBody)

    const requiredStringFields = ['question']
    let error = validateRequiredStringFields(question, requiredStringFields)
    if (error) return error

    const optionalStringFields = ['code', 'codeUrl']
    error = validateOptionalStringFields(question, optionalStringFields)
    if (error) return error

    const requiredStringArrays = ['answers']
    error = validateRequiredStringArrays(question, requiredStringArrays)
    if (error) return error

    const optionalStringArrays = ['categories']
    error = validateOptionalStringArrays(question, optionalStringArrays)
    if (error) return error

    return question
  },
}

const validateRequiredStringFields = (requestBody, fields) => {
  for (const field of fields) {
    if (
      typeof requestBody[field] === 'undefined' ||
      requestBody[field] === null ||
      requestBody[field].trim() === ''
    ) {
      return 'Please provide a non empty string value for ' + field
    }
  }
}

const validateOptionalStringFields = (requestBody, fields) => {
  const fieldsToValidate = fields.filter(
    (field) =>
      typeof requestBody[field] !== 'undefined' && requestBody[field] !== null,
  )

  for (const field of fieldsToValidate) {
    if (requestBody[field].trim() === '')
      return (
        'Either omit ' + field + ' or provide a non empty string value for it'
      )
  }
}

const validateRequiredStringArrays = (requestBody, fields) => {
  for (const field of fields) {
    console.log(Array.isArray(requestBody[field]))
    if (
      typeof requestBody[field] === 'undefined' ||
      requestBody[field] === null ||
      !Array.isArray(requestBody[field]) ||
      requestBody[field].length === 0 ||
      requestBody[field].some(
        (item) => item === null || typeof item === 'undefined',
      ) ||
      requestBody[field].some((item) => item.trim() === '')
    ) {
      return (
        'Please provide a non empty array without empty values for ' + field
      )
    }
  }
}

const validateOptionalStringArrays = (requestBody, fields) => {
  const fieldsToValidate = fields.filter(
    (field) =>
      typeof requestBody[field] !== 'undefined' && requestBody[field] !== null,
  )

  for (const field of fieldsToValidate) {
    if (
      !Array.isArray(requestBody[field]) ||
      requestBody[field].length === 0 ||
      requestBody[field].some(
        (item) => item === null || typeof item === 'undefined',
      ) ||
      requestBody[field].some((item) => item.trim() === '')
    ) {
      return (
        'Either omit ' +
        field +
        ' or provide a non empty array without empty values for it'
      )
    }
  }
}
