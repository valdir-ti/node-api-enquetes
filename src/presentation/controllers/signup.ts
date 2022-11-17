import { httpRequest, httpResponse } from "../protocols/http"
import { MissingParamError } from "../errors/missing-param-error"
import { badRequest } from "../helpers/http-helper"
export class SignUpController {
  handle(httpRequest: httpRequest): httpResponse {
    const requiredFields = ["email", "name", "password", "passwordConfirmation"]

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 200,
      body: {},
    }
  }
}
