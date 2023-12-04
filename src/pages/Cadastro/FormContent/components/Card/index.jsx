import React, { useCallback, useEffect, useState } from "react";
import { Formik, Form } from "formik";

import "./card.css";
import { validationSchema } from "./validate";
import { useMutation, useQuery } from "react-query";
import { cadastro } from "../../../../../services/usuario/usuarioService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../context/useAuth";
import Cep from "./Cep";

const Cadastro = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const { signed } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    nome: "",
    email: "",
    senha: "",
    cep: "",
    uf: "",
    cidade: "",
    telefone: "",
    termos: false,
  };

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
  }, []);

  const { mutate } = useMutation((usuario) => cadastro(usuario), {
    onSuccess: (data) => {
      console.log(data);

      if (data?.response?.status === 400) {
        console.log("Email já cadastrado");
        setErrorMessage("Email já cadastrado");
        return;
      }

        console.log("Usuário cadastrado com sucesso");
        setErrorMessage("Usuário cadastrado com sucesso");
        navigate("/login");
    },
  });

  const handleSubmit = useCallback(
    (form) => {
      if (form.termos) {
        console.log(form);
        mutate({
          nome: form.nome,
          email: form.email,
          senha: form.senha,
          cep: form.cep,
          uf: form.uf,
          cidade: form.cidade,
          telefone: form.telefone,
        });
      }
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
          <h1>Vamos costurar sonhos?</h1>
          <Form>
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input
                {...getFieldProps("nome")}
                id="nome"
                name="nome"
                type="text"
              />
              {errors.nome && <p className="error-message">{errors.nome}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                {...getFieldProps("email")}
                id="email"
                name="email"
                type="text"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
              {errorMessage != "" ? (
                <p className="error-message">{errorMessage}</p>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="senha">Senha:</label>
              <input
                {...getFieldProps("senha")}
                id="senha"
                name="senha"
                type="password"
              />
              {errors.senha && <p className="error-message">{errors.senha}</p>}
            </div>
            <Cep />
            <div className="form-group">
              <label htmlFor="uf">UF:</label>
              <input
                {...getFieldProps("uf")}
                maxLength={2}
                id="uf"
                name="uf"
                type="text"
              />
              {errors.uf && <p className="error-message">{errors.uf}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="cidade">Cidade:</label>
              <input
                {...getFieldProps("cidade")}
                id="cidade"
                name="cidade"
                type="text"
              />
              {errors.cidade && (
                <p className="error-message">{errors.cidade}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="telefone">Telefone:</label>
              <input
                {...getFieldProps("telefone")}
                id="telefone"
                name="telefone"
                type="text"
              />
              {errors.telefone && (
                <p className="error-message">{errors.telefone}</p>
              )}
            </div>
            <div className="form-group">
              <p>
                Termos de uso
                <input
                  {...getFieldProps("termos")}
                  type="checkbox"
                  name="termos"
                  id="termos"
                />
              </p>
              {errors.termos && (
                <p className="error-message">{errors.termos}</p>
              )}
              <p className="error-message">{}</p>
            </div>
            <button className="button" type="submit">
              Cadastrar
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Cadastro;
