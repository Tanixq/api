module.exports = {
  email: {
    in: ["body"],
    errorMessage: "Email is missing",
    exists: true,
    isEmail: {
      errorMessage: "Invalid email format",
    },
  },
  password: {
    in: ["body"],
    errorMessage: '"password" field is missing',
    exists: true,
    isLength: {
      errorMessage: "Password should be at least 5 chars long",
      options: { min: 5 },
    },
  },
};
