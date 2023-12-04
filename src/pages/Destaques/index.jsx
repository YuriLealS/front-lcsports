import React, { useState } from "react";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
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


const Destaques = () => {
  const param = useParams();

  console.log(param)

  const { data, isLoading } = useQuery(["costureira-perfil", param?.idCostureira], () =>
    costureiraPeloId(param?.idCostureira)
  );
  console.log(data);

  if (isLoading) {
    return <div>carregando...</div>;
  }

  return (
    <div className="perfil-container">
      <Header>
        <NavProfile />
      </Header>
      <div className="favoritos-section">
        <div className="container">
          <div className="favoritos-container">
            <h1 className="tittle">Destaques da semana</h1>
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
                <div>
                  <SwiperSlide>
                    <a href="/produto">
                      <div className="image-slider-post">
                        <img src={fotoPadrao} alt="Imagem produto" className="img-carrossel"/>
                      </div>
                    </a>
                  </SwiperSlide>
                  <SwiperSlide>
                    <a href="/produto">
                      <div className="image-slider-post">
                        <img src={fotoPadrao} alt="Imagem produto" className="img-carrossel"/>
                      </div>
                    </a>
                  </SwiperSlide><SwiperSlide>
                    <a href="/produto">
                      <div className="image-slider-post">
                        <img src={fotoPadrao} alt="Imagem produto" className="img-carrossel"/>
                      </div>
                    </a>
                  </SwiperSlide><SwiperSlide>
                    <a href="/produto">
                      <div className="image-slider-post">
                        <img src={fotoPadrao} alt="Imagem produto" className="img-carrossel"/>
                      </div>
                    </a>
                  </SwiperSlide><SwiperSlide>
                    <a href="/produto">
                      <div className="image-slider-post">
                        <img src={fotoPadrao} alt="Imagem produto" className="img-carrossel"/>
                      </div>
                    </a>
                  </SwiperSlide>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Destaques;
