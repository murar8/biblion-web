import checkPassword from "./utils/check-password";
import isEmail from "./utils/is-email";

export async function validateEmail(email: string) {
  if (!isEmail(email)) {
    throw new Error("Must be an email address.");
  }
}

export async function validateUsername(username: string) {
  if (username.length < 3) {
    throw new Error("Must be at least 3 characters.");
  }

  if (!/^([\dA-Za-z]|[._-](?![._-]))+$/.test(username)) {
    throw new Error("Must be composed of alphanumeric characters, dots, hyphens and underscores.");
  }
}

export async function validatePassword(password: string) {
  const { score, feedback } = await checkPassword(password);

  if (score < 2) {
    throw new Error(feedback.warning || feedback.suggestions?.[0]);
  }
}
