import { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Cookies from 'universal-cookie';
import Container from "../Styled/Container";
import Section from "../Styled/Section";
import Input from "./Input";
import Button from "../Styled/Button";
import Tittle from "../Styled/Tittle";
import { ErrorMessage } from "../Styled/Input";

const Login = () => {
  let navigate = useNavigate();
  const cookies = new Cookies();
  const [errorLogin, seterrorLogin] = useState("");
  const handleSubmit = async ({ email, password }) => {
    const response = await fetch("http://192.168.100.2:7000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if(response.status !== 200) {
      seterrorLogin(data.message)
    } else {
      cookies.set('access-token', data.token, { path: '/' });
      navigate('/Home', {replace: true});
    }
  };

  const handleRegister = () => {
    navigate("/Register", { replace: true });
  }

  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            email: Yup.string().required("Obligatorio"),
            password: Yup.string().required("Obligatorio"),
          })}
        >
          <Form>
            <Tittle>Inicia Sesion </Tittle>
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
            <ErrorMessage>{errorLogin}</ErrorMessage>
            <Button type="submit">Iniciar Sesion</Button>
            <br />
          </Form>
        </Formik>
        <div>
          <label>No tienes cuenta?</label>
          <label onClick={handleRegister}>Registrate aqui</label>
        </div>
      </Section>
    </Container>
  );
};

export default Login;
