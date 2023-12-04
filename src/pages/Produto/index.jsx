import React, { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "./produto.css";
import imglike from "../../assets/like.png";
import imglikedado from "../../assets/likedado.png";
import Footer from "../components/Footer";
import Header from "../components/HeaderComponent";
import NavProfile from "../components/HeaderComponent/NavTypes/NavProfile";
import fotoPadrao from "../../assets/foto-default.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/useAuth";

const Produto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imagemPerfil, setImagemPerfil] = useState("");
  const [titulo, setTitulo] = useState("");
  const [description, setDescription] = useState("");
  const [like, setLike] = useState(false);
  const [curtidas, setCurtidas] = useState(0);
  const [costureira, setCostuteira] = useState(0);

  const param = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const getPostagem = async () => {
    await axios
      .get("http://localhost:8080/v1/postagens/" + param?.id)
      .then((response) => {
        console.log(response);
        setImageUrl(response.data.imagens[0].codigoImagem);
        setTitulo(response.data.titulo);
        setDescription(response.data.descricao);
        setCurtidas(response.data.curtidas.length);
        setCostuteira(response.data.costureira)
        axios
          .get("http://localhost:8080/v1/usuarios/" + response.data.costureira)
          .then((response) => {
            console.log(response);
            setImagemPerfil(response.data.blob);
            console.log(imagemPerfil)
            console.log(imageUrl)
          })
          .catch((response) => console.log(response));

      })
      .catch((response) => console.log(response));
  };

  const darLike = () => {
    axios
      .post(
        "http://localhost:8080/v1/usuarios/curtida-postagem?idPostagem=" +
          param.id +
          "&idUsuario=" +
          user.userId
      )
      .then((response) => {
        console.log(response);
        setLike(true);
        setCurtidas(curtidas + 1);
      })
      .catch((response) => console.log(response));
  };

  const removerLike = () => {
    axios
      .delete(
        `http://localhost:8080/v1/usuarios/remover-curtida/${user.userId}/postagem/${param.id}`
      )
      .then((response) => {
        console.log(response);
        setLike(false);
        setCurtidas(curtidas - 1);
      })
      .catch((response) => console.log(response));
  };

  const usuarioDeuLike = () => {
    axios
      .get(
        `http://localhost:8080/v1/usuarios/verifica-curtida/${user.userId}/postagem/${param.id}`
      )
      .then((response) => {
        console.log(response);
        setLike(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    usuarioDeuLike();
    getPostagem();
  }, []);

  return (
    <div className="produto-container">
      <Header>
        <NavProfile />
      </Header>
      <div className="background-produto">
        <h2 className="titulo">{titulo}</h2>
        <div className="like-kpi">
          <div className="div-imagem-produto">
            <img
              src={imageUrl ? imageUrl : fotoPadrao}
              alt="Imagem do produto"
              className="imagem-produto"
            />
          </div>
          <div className="div-produto">
            <div className="kpi">{curtidas}</div>
            {like ? (
              <img
                src={imglikedado}
                alt=""
                className="imagem-like"
                onClick={removerLike}
              />
            ) : (
              <img
                src={imglike}
                alt=""
                className="imagem-like"
                onClick={darLike}
              />
            )}
          </div>
        </div>
        <div className="descricao">
          <h2 className="titulo3">Descrição do produto</h2>
          <div className="div-texto-descricao">
            <p className="texto">{description}</p>
          </div>
          <h2 className="titulo3">Gostou? Entre em contato com:</h2>
          <div className="imagem-perfil">
            <div onClick={() => navigate("/perfil-costureira/" + costureira)}>
              <img
                src={imagemPerfil ? imagemPerfil : fotoPadrao}
                alt="Imagem da costureira"
                className="ft-perfil"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Produto;
