const pw_regexp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)

const passwordTest = (pw) => pw_regexp.test(pw)

export default passwordTest