import { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Container from "../Styled/Container";
import Section from "../Styled/Section";
import Input from "./Input";
import Button from "../Styled/Button";
import Tittle from "../Styled/Tittle";

const Register = () => {
  const [statusRegister, setStatusRegister] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async ({ name, lastname, email, password }) => {
    const response = await fetch("http://192.168.100.2:7000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        lastname: lastname,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      setStatusRegister(data.message);
    } else {
      setStatusRegister(data.message);
    }
  };

  const handleLogin = () => {
    navigate("/", { replace: true });
  };

  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            name: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            name: Yup.string().required("Obligatorio"),
            lastname: Yup.string().required("Obligatorio"),
            email: Yup.string().required("Obligatorio"),
            password: Yup.string()
              .required("Obligatorio")
              .min(4, "Minimo 4 caracteres"),
          })}
        >
          <Form>
            <Tittle>Registrate</Tittle>
            <Input name="name" label="Nombre" />
            <Input name="lastname" label="Apellido" />
            <Input
              name="email"
              label="Correo"
              placeholder="correo@correo.com"
            />
            <Input
              name="password"
              label="Contrasenna"
              placeholder="*********"
              type="password"
              autocomplete="current-password"
            />
            <Button type="submit">Registrarme</Button>
            <br />
            {statusRegister}
          </Form>
        </Formik>
        <div>
          <label onClick={handleLogin}> Volver</label>
        </div>
      </Section>
    </Container>
  );
};

export default Register;
