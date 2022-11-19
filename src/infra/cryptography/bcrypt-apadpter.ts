import bcrypt from "bcrypt"
import { Encrypter } from "../../data/protocols/encrypter"

export class BcryptAdapter implements Encrypter {
  private readonly salt: number | string
  constructor(salt: number | string) {
    this.salt = salt
  }
  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
