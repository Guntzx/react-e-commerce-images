import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Container from "../Styled/Container";
import Section from "../Styled/Section";
import Input from "./Input";
import Button from "../Styled/Button";
import Tittle from "../Styled/Tittle";

const Login = () => {
    const [errorLogin, seterrorLogin] = useState('')
    const handleSubmit = async ({ email, password }) => {

        const response = await fetch('http://192.168.100.2:7000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })

        const data = await response.json();
        
        if(response.status > 200){
            seterrorLogin(data.message)
        }
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
            email: Yup.string()
              .required("Obligatorio"),
            password: Yup.string()
              .required("Obligatorio"),
          })}
        >
          <Form>
            <Tittle>Inicia Sesion </Tittle>
            <Input name="email" label="Correo" placeholder="correo@correo.com"/>
            <Input name="password" label="Contrasenna" placeholder="*********" />
            {errorLogin}
            <Button type="submit">Iniciar Sesion</Button>
            <br />
            <label>Registrate</label>
          </Form>
        </Formik>
      </Section>
    </Container>
  );
};

export default Login;
