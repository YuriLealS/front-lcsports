import React, { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { Formik, Form } from "formik";

import { login } from "../../../../../services/usuario/usuarioService";
import { validationSchema } from "./validate";
import { useAuth } from "../../../../../context/useAuth";

import "./card.css";
import { api } from "../../../../../services/api/api";


const initialValues = {
  email: "",
  senha: "",
};

const Card = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const { signed, loginUsuario } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (signed) {
        console.log("maria");
        navigate("/");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [signed]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (errorMessage != "") {
        setErrorMessage("");
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

  const { mutate } = useMutation((entrada) => login(entrada), {
    onSuccess: (data) => {
      setErrorMessage("");

      console.log("aqui no success");
      if (data?.status === 200) {
        api.defaults.headers.Authorization = `${sessionStorage.getItem('token')}`;
        console.log(data.data);
        loginUsuario(data.data);
        navigate("/");
      }else {
        setErrorMessage("Usuário ou senha inválidos");
      }
    },
    onError: (error) => {
      console.log(error?.response.status);
      if (error?.response.status === 404) {
        setErrorMessage("Usuário não cadastrado");
      }

      if (error?.response.status === 400) {
        setErrorMessage("Email ou senha inválidos");
      }
    },
  });

  const handleSubmit = useCallback(
    (form) => {
      console.log(form);
      mutate({
        email: form.email,
        senha: form.senha,
      });
    },
    [mutate]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, getFieldProps }) => (
        <div className="card">
          <h1>Bem-vindo</h1>
          <Form className="formulario-login">
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="login">Email:</label>
                <input {...getFieldProps("email")} type="text" id="login" />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="senha">Senha:</label>
                <input {...getFieldProps("senha")} type="password" id="senha" />
                {errors.senha && (
                  <p className="error-message">{errors.senha}</p>
                )}
              </div>
              <button type="submit" className="button">
                Entrar
              </button>
              {errorMessage != "" && (
                <p className="box-error-message error-message">
                  {errorMessage}
                </p>
              )}
              <p className="sign-in-text">
                Ainda não é cadastrado? <a href="/cadastro">Cadastre-se aqui</a>
              </p>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Card;
