import React, { useState } from "react";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import penalty from "../../assets/penalty.png";
import asics from "../../assets/asics.png";
import reebok from "../../assets/reebok.png";
import visibilidade from "../../assets/visibilidade.svg";
import demanda from "../../assets/demanda.svg";
import valorizacao from "../../assets/valorizacao.svg";
import sobre from "../../assets/sobre.svg";

import "swiper/css";
import "swiper/css/navigation";
import "./home.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import HeaderDeslogado from "../components/HeaderComponent";
import NavProfile from "../components/HeaderComponent/NavTypes/NavProfile";

const Home = () => {
  return (
    <div className="home-container">
      <HeaderDeslogado>
        <NavProfile />
      </HeaderDeslogado>
      <div className="background-section">
        <div className="ellipse-container">
          <div className="content-title">
            <h2>VENHA COSTURAR SONHOS COM A GENTE</h2>
            <p>
              Somos uma plataforma digital de divulgação de costureiras
              especializadas em artigos esportivos. Nossa plataforma visa dar
              mais visibilidade para os profissionais na área de costura fazendo
              com que essa profissão seja cada dia mais valorizada e encontrada
              facilmente no mercado.
            </p>
          </div>
        </div>
      </div>

      <div className="sponsors-section">
        <div className="container">
          <div className="content-box">
            <h2>Grandes marcas que já usaram nosso serviço</h2>
            <div className="carross" style={{ width: "100%" }}>
              <Swiper
                navigation={true}
                modules={[Navigation]}
                slidesPerView={3}
                initialSlide={2}
                centeredSlides={true}
                spaceBetween={30}
                className="mySwiper"
              >
                <div>
                  <SwiperSlide>
                    <div className="image-slider">
                      <img src={penalty} alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="image-slider">
                      <img src={reebok} alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="image-slider">
                      <img src={asics} alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="image-slider">
                      <img src={penalty} alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="image-slider">
                      <img src={reebok} alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="image-slider">
                      <img src={asics} alt="" />
                    </div>
                  </SwiperSlide>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <div className="pilares-section">
        <div className="container">
          <div className="content-pilares-container">
            <h3 className="title">Nossos Pilares</h3>
            <div className="pilares-box-container">
              <div className="pilares">
                <div className="image-box">
                  <img src={visibilidade} alt="" />
                </div>
                <h2>Visibilidade</h2>
                <p>
                  Nossa plataforma pretente trazer mais visibilidade para seu
                  serviço, fazendo com que consiga se conectar com novos
                  clientes e fazer com que seu trabalho seja visto por um
                  público mais específico aumentando as chances de venda
                </p>
              </div>
              <div className="pilares">
                <div className="image-box">
                  <img src={demanda} alt="" />
                </div>
                <h2>Demanda</h2>
                <p>
                  O nosso maior foco do projeto é aumentar a sua demanda mensal,
                  para que você costureira consiga faturar mais com uma maior
                  facilidade e organização, fazemos o cliente chegar até você
                  através dos seus itens anunciados na plataforma.
                </p>
              </div>
              <div className="pilares">
                <div className="image-box">
                  <img src={valorizacao} alt="" />
                </div>
                <h2>Valorização do produto</h2>
                <p>
                  Aqui na LC Sports seus produtos serão mais valorizados e
                  melhor apresentados para o seu público alvo, pois sabemos da
                  dificuldade de confecciona-los e do carinho com que são
                  feitos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sobre-section">
        <div className="container">
          <div className="content-sobre">
            <h3 className="title">Sobre nós</h3>
            <div className="sobre-container">
              <p>
                LC Sports é uma plataforma que tem o intuito de ajudar as
                costureiras especializadas em artigos esportivos a divulgarem o
                seu trabalho em uma única plataforma. Direcionando o usuário a
                sua especialidade desejada.
              </p>
              <div className="sobre-box-image">
                <img src={sobre} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
