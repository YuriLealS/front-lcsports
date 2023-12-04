import React, { useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import maisverde from "../../assets/mais-verde.png";
import wpp from "../../assets/wpp.png";
import tel from "../../assets/telefone.png";
import email from "../../assets/email.png";
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

const Perfil = () => {
  const param = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    ["costureira-perfil", param?.idCostureira],
    () => costureiraPeloId(param?.idCostureira)
  );

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  console.log(data);

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
                {data.data.blob ? (
                  <img
                    src={
                      data.data.blob
                    }
                    className="img-perfil"
                    alt=""
                  />
                ) : (
                  <img src={fotoPadrao} className="img-perfil" alt="" />
                )}
              </div>
              <p className="nome-costureira">{data.data.nome ?? ""}</p>
              <div
                className="btn-editar-perfil"
                onClick={() =>
                  navigate("/editar-perfil/" + param?.idCostureira)
                }
              >
                <h1 className="tittle">Editar Perfil</h1>
              </div>
            </div>
            <div className="bio-especialidades">
              <h1 className="tittle">Biografia</h1>
              <div className="card-cinza">
                {data.data.biografia ?? ""}
                <p className="text"></p>
              </div>
              <h1 className="tittle">Contatos</h1>
              <div className="card-cinza-contatos contato-card">
                <div className="div-ipt">
                  <img src={wpp} alt="" className="img-wpp" />
                  <div className="dados-contato" id="whatsapp">
                    {data.data.telefone ?? ""}
                  </div>
                </div>
                <div className="div-ipt">
                  <img src={tel} alt="" className="img-wpp" />
                  <div className="dados-contato" id="tel">
                    {data.data.telefone ?? ""}
                  </div>
                </div>
                <div className="div-ipt">
                  <img src={email} alt="" className="img-wpp" />
                  <div className="dados-contato" id="email">
                    {data.data.email ?? ""}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="div-minhas-postagens">
            <div className="titulo-maisverde">
              <h1 className="tittle-posts">Minhas postagens</h1>
              <div onClick={() => navigate("/postagem/" + param?.idCostureira)}>
                <img src={maisverde} alt="" className="mais-verde" />
              </div>
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

export default Perfil;
