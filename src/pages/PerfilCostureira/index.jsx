import React, { useState } from "react";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import imgWpp from "../../assets/wpp.png";
import imgTel from "../../assets/telefone.png";
import imgEmail from "../../assets/email.png";

import "swiper/css";
import "swiper/css/navigation";
import "./perfil.css";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import Header from "../components/HeaderComponent";
import NavProfile from "../components/HeaderComponent/NavTypes/NavProfile";
import { useQuery } from "react-query";
import { costureiraPeloId } from "../../services/costureira/costureiraService";
import fotoPadrao from "../../assets/foto-default.png";
import { useNavigate } from "react-router-dom";


const PerfilCostureira = () => {
  const param = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(["costureira-perfil", param?.id], () =>
    costureiraPeloId(param?.id)
  );

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!data) {
    return <div>Costureira não encontrada</div>;
  }

  console.log(data);

  const costureira = data.data;

  return (
    <div className="perfil-container">
      <Header>
        <NavProfile />
      </Header>
      <div className="informacoes-section">
        <div className="container">
          <div className="informacoes-container">
            <div className="foto-perfil">
              <div className="image">
                <img
                  src={
                    costureira.blob
                      ?
                      costureira.blob
                      : fotoPadrao
                  }
                  className="img-perfil"
                  alt=""
                />
              </div>
              <p className="nome-costureira">{costureira?.nome}</p>
            </div>
            <div className="bio-especialidades">
              <h1 className="tittle">Biografia</h1>
              <div className="card-cinza">
                <p className="text">{costureira.biografia}</p>
              </div>
              <h1 className="tittle">Contatos</h1>
              <div className="card-cinza contato-card">
                <div className="div-ipt">
                  <img src={imgWpp} alt="" className="img-wpp" />
                  <div className="dados-contato" id="whatsapp">
                    {costureira.telefone}
                  </div>
                </div>
                <div className="div-ipt">
                  <img src={imgTel} alt="" className="img-wpp" />
                  <div className="dados-contato" id="tel">
                    {costureira.telefone}
                  </div>
                </div>
                <div className="div-ipt">
                  <img src={imgEmail} alt="" className="img-wpp" />
                  <div className="dados-contato" id="email">
                    {costureira.email}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="div-minhas-postagens">
            <div className="titulo-maisverde">
              <h1 className="tittle-posts">Postagens dessa costureira</h1>
            </div>
            <div className="carross" style={{ width: "100%" }}>
              <Swiper
                navigation={true}
                modules={[Navigation]}
                slidesPerView={3}
                initialSlide={1}
                centeredSlides={true}
                spaceBetween={30}
                className="mySwiper"
              >
                {data.data.costureira.postagens.map((postagem) => {
                  const { idPostagem, imagens } = postagem;
                  const imagem =
                    imagens.length > 0 ? imagens[0].codigoImagem : fotoPadrao;

                  return (
                    <SwiperSlide key={idPostagem}>
                      <div className="image-slider-post">
                        <div onClick={() => navigate("/produto/" + idPostagem)}>
                          <img src={imagem} alt="" className="img-carrossel" />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PerfilCostureira;
