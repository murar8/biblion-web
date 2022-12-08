// See http://emailregex.com/
const EMAIL_REGEX =
  /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;

export default function isEmail(input: string) {
  return EMAIL_REGEX.test(input);
}
