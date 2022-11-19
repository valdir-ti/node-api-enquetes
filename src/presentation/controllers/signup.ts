import { Controller } from "../protocols/controller"
import { httpRequest, httpResponse } from "../protocols/http"
import { EmailValidator } from "../protocols/email-validator"

import { badRequest } from "../helpers/http-helper"

import { ServerError } from "../errors/server-error"
import { InvalidParamError } from "../errors/invalid-param-error"
import { MissingParamError } from "../errors/missing-param-error"

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: httpRequest): httpResponse {
    try {
      const requiredFields = [
        "email",
        "name",
        "password",
        "passwordConfirmation",
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError("email"))
      }

      return {
        statusCode: 200,
        body: {},
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: new ServerError(),
      }
    }
  }
}
