import React, { useState } from "react";
import edit from "../../assets/edit.png";
import wpp from "../../assets/wpp.png";
import tel from "../../assets/telefone.png";
import logoEmail from "../../assets/email.png";

import "swiper/css";
import "swiper/css/navigation";
import "./editarperfil.css";
import Footer from "../components/Footer";
import Header from "../components/HeaderComponent";
import NavProfile from "../components/HeaderComponent/NavTypes/NavProfile";
import placeholderImage from "../../assets/foto-default.png";
import { useAuth } from "../../context/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { costureiraPeloId } from "../../services/costureira/costureiraService";

const EditarPerfil = () => {
  const param = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    ["costureira-perfil", param?.idCostureira],
    () => costureiraPeloId(param?.idCostureira)
  );

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImagem(selectedImage);
    setImage(URL.createObjectURL(selectedImage));
  };

  const [email, setEmail] = useState(data.data.email);
  const [telefone, setTelefone] = useState(data.data.telefone);
  const [biografia, setBiografia] = useState(data.data.biografia);
  const [imagem, setImagem] = useState(data.data.imagem);

  const api = axios.create({
    baseURL: "http://localhost:8080",
  });

  const submit = async (e) => {
    e.preventDefault();

    const imageFile = document.getElementById("image-upload").files[0];

    const usuario = {
      idUsuario: data.data.idUsuario,
      email: email,
      telefone: telefone,
      biografia: biografia,
      imagem: data.data.imagem,
    };

    console.log(data);

    const formData = new FormData();
    formData.append("imagem", imageFile);
    formData.append("usuario", JSON.stringify(usuario));

    try {
      const response = await axios.patch(
        "http://localhost:8080/v1/usuarios",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 409) {
      } else if (response.status === 201) {
        setTimeout(() => {
          const updateSessionStorageValue = (key, field, updatedValue) => {
            const currentValue = JSON.parse(sessionStorage.getItem(key));

            if (currentValue && typeof currentValue === "object") {
              currentValue[field] = updatedValue;
              sessionStorage.setItem(key, JSON.stringify(currentValue));
            }
          };

          updateSessionStorageValue("data", "email", email);
          navigate("/perfil/" + param?.idCostureira);
        }, 2000);
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(data);

  return (
    <div className="editarperfil-container">
      <Header>
        <NavProfile />
      </Header>
      <div className="informacoes-section">
        <div className="informacoes-container">
          <div className="foto-editarperfil">
            <div className="edit-foto">
              <div className="botao-salvar-foto">
                {image ? (
                  <img src={image} className="img-editarperfil" alt="" />
                ) : (
                  <img
                    src={placeholderImage}
                    className="img-editarperfil"
                    alt="Imagem Padrão"
                  />
                )}

                <button className="btn-salvar-imagem" onClick={submit}>
                  Salvar
                </button>
              </div>
              <label htmlFor="image-upload">
                <img src={edit} alt="Imagem de edit" className="img-edit" />
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
          <div className="bio-especialidades">
            <h1 className="tittle">Biografia</h1>
            <div className="card-cinza-editar">
              <textarea
                name="biografia"
                id="bio"
                cols="350"
                rows="5"
                className="invisible-textarea"
                value={biografia}
                onChange={(e) => setBiografia(e.target.value)}
              ></textarea>
            </div>
            <div className="contatos">
              <h1 className="tittle">Contatos</h1>
              <div className="card-cinza-contatos-editar contato-card">
                <div className="div-ipt">
                  <img src={wpp} alt="" className="img-wpp" />
                  <input
                    type="number"
                    className="ipt-contato"
                    placeholder="(XX)00000-0000"
                    id="wpp"
                    maxLength="11"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </div>
                <div className="div-ipt">
                  <img src={tel} alt="" className="img-wpp" />
                  <input
                    type="number"
                    className="ipt-contato"
                    placeholder="(XX)00000-0000"
                    id="wpp"
                    maxLength="11"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </div>
                <div className="div-ipt">
                  <img src={logoEmail} alt="" className="img-wpp" />
                  <input
                    type="text"
                    className="ipt-contato"
                    placeholder="xxxx@email.com"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditarPerfil;
