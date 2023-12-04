import React, { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "./postagem.css";
import ErrorCard from "./components/index";

import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/HeaderComponent";
import NavProfile from "../components/HeaderComponent/NavTypes/NavProfile";
import axios from "axios";

const Postagem = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [titulo, setTitulo] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate()

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
    cadastrarImagem(selectedImage);
  };

  const params = useParams();

  const cadastrarImagem = (imagem) => {
    let data = new FormData();
    data.append("imagem", imagem);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/v1/imagens/config",
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setImageUrl(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const criarPostagem = () => {
    const data = {
      titulo: titulo,
      descricao: description,
      competencias: categories,
      imagens: [
        {
          codigoImagem: imageUrl,
        },
      ],
    };
    axios
      .post("http://localhost:8080/v1/postagens/" + params?.id, data)
      .then((response) => {
        console.log(response)
        navigate("/produto/" + response.data.idPostagem) 
      })
      .catch((response) => console.log(response));
  };

  const handleDescriptionChange = (event) => {
    const enteredDescription = event.target.value;
    setDescription(enteredDescription);
  };

  const handleCategoryChange = (event) => {
    const selectedCategories = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setCategories(selectedCategories);
  };

  const handlePostClick = () => {
    const errors = [];

    if (!image) {
      errors.push("Selecione uma imagem.");
    }

    if (!description) {
      errors.push("Adicione uma descrição.");
    }

    if (categories.length === 0) {
      errors.push("Adicione pelo menos uma categoria.");
    }

    setErrorMessages(errors);
    setShowError(true);

    if (errors.length === 0) {
      // Lógica para postar a imagem
      console.log("Imagem postada com sucesso!");
      // Limpar os campos
      criarPostagem();
    }
  };

  return (
    <div className="postagem-container">
      <Header>
        <NavProfile />
      </Header>
      <div className="background">
        {showError && errorMessages.length > 0 && (
          <div className="cardErro">
            <h2 id="error-title" className="error-title">
              Erro
            </h2>
            <ul>
              {errorMessages.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="conteudo">
          <h1 className="tittle">Faça uma Publicação</h1>
          <div className="div-descricao">
            <h1 className="tittle">Titulo da postagem</h1>
            <div className="card-cinza-postagem">
              <input
                type="text"
                className="ipt-titulo"
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
          </div>
          <div className="div-img">
            <h1 className="tittle">Imagens</h1>
            <label htmlFor="image-upload" className="botoes">
              Adicionar Imagem
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
            {image && (
              <img className="miniatura" src={image} alt="Imagem selecionada" />
            )}
          </div>
          <div className="div-descricao">
            <h1 className="tittle">Categoria</h1>
            <div className="card-cinza-postagem">
              <select
                name=""
                id="categorias"
                className="select-box"
                onChange={handleCategoryChange}
              >
                <option value="">-- Selecione uma categoria --</option>
                <option value="futebol">Futebol</option>
                <option value="volei">Vôlei</option>
                <option value="basquete">Basquete</option>
                <option value="handball">Handebol</option>
                <option value="natacao">Natação</option>
                <option value="atletismo">Atletismo</option>
                <option value="ginasticaArtistica">Ginástica Artística</option>
                <option value="ginasticaRitmica">Ginástica Rítmica</option>
                <option value="artesMarciais">Artes Marciais</option>
                <option value="Ciclismo">Ciclismo</option>
                <option value="tenis">Tênis</option>
                <option value="tenisDeMesa">Tênis e mesa</option>
                <option value="poloAquatico">Polo Aquático</option>
                <option value="Surf">Surfe</option>
              </select>
            </div>
          </div>
          <div className="div-descricao">
            <h1 className="tittle">Descrição</h1>
            <div className="card-cinza-postagem">
              <textarea
                className="invisible-textarea"
                value={description}
                onChange={handleDescriptionChange}
                cols="200"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div className="div-btn-postar">
            <button className="botao-postar" onClick={handlePostClick}>
              Postar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Postagem;
