/* eslint-disable prefer-const */
import jwt from "jsonwebtoken";

import { User } from "@interfaces/interfaces";
import { UserRepository } from "@repositories/UserRepository";
import { CryptUtils } from "@utils/cryptUtils";
import { errorFactory } from "@utils/errorFactory";
import { Users } from "@prisma/client";

export class SignUpServices {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  insertUser = async (signUpData: User) => {
    const { userRepository } = this;
    const user = await userRepository.getUserByEmail(signUpData.email);

    if (user) throw errorFactory("error_user_already_exists");

    const signUpDataHandled = this.handlerDataSignUpEncrypt(signUpData);
    await userRepository.insertUser(signUpDataHandled);
  };
  handlerDataSignUpEncrypt = (signUpData: User) => {
    const cryptr = new CryptUtils();
    let { email, password } = signUpData;

    password = cryptr.encrypt(password);

    return { email, password };
  };
}
export class SignInServices {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  signIn = async (email: string, password: string) => {
    const { userRepository } = this;
    const user = await userRepository.getUserByEmail(email);

    if (!user) throw errorFactory("error_user_not_found");

    const cryptr = new CryptUtils();
    const passwordEncrypted = cryptr.decrypt(user.password);

    if (password !== passwordEncrypted)
      throw errorFactory("error_password_wrong");

    const token = await this.jwtSign(user);

    return token;
  };
  jwtSign = async (user: Users) => {
    const { id } = user;

    return jwt.sign({ id }, process.env.JWT_SECRET as string);
  };
}
