import { httpRequest, httpResponse } from "../protocols/http"
export class SignUpController {
  handle(httpRequest: httpRequest): httpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error("Missing Param: name"),
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error("Missing Param: email"),
      }
    }
    return {
      statusCode: 200,
      body: {},
    }
  }
}
