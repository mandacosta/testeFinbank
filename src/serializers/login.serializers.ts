import * as yup from "yup";

const schemaCpfOrEmail = yup.object().shape({
  email: yup.string().email("Invalid email"),
  cpf: yup
    .string()
    .matches(
      /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
      "Invalid CPF"
    ),
});

const loginSerializer = schemaCpfOrEmail
  .test("one-required", "Email or CPF is required", (value) => {
    const emailIsEmpty = !value.email;
    const cpfIsEmpty = !value.cpf;
    return !(emailIsEmpty && cpfIsEmpty);
  })

  .shape({
    password: yup.string().required("Required password"),
  });

export default loginSerializer;
