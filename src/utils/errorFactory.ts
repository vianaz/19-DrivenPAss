type ErrorType =
  | "error_user_already_exists"
  | "error_user_not_found"
  | "error_password_wrong";

export const errorFactory = (errType: ErrorType) => {
  switch (errType) {
    case "error_user_already_exists":
      return { statusCode: 400, message: "User already exists" };

    case "error_user_not_found":
      return { statusCode: 400, message: "User not found" };

    case "error_password_wrong":
      return { statusCode: 400, message: "Password wrong" };

    default:
      return { statusCode: 500, message: "Something went wrong" };
  }
};
