import React, { useEffect, useState } from "react";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./favoritos.css";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/HeaderComponent";
import NavProfile from "../components/HeaderComponent/NavTypes/NavProfile";
import { useQuery } from "react-query";
import { costureiraPeloId } from "../../services/costureira/costureiraService";
import fotoPadrao from "../../assets/foto-default.png";
import axios from "axios";

const Favoritos = () => {
  const param = useParams();
  const navigate = useNavigate();

  console.log(param);

  const [postagens, setPostagens] = useState([]);

  const getPostagensCurtidas = () => {
    axios
      .get(`http://localhost:8080/v1/postagens/curtidas/${param.id}`)
      .then((response) => {
        console.log(response);
        setPostagens(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  };


  useEffect(() => {
    getPostagensCurtidas();
  },[]);

  return (
    <div className="perfil-container">
      <Header>
        <NavProfile />
      </Header>
      <div className="favoritos-section">
        <div className="container">
          <div className="favoritos-container">
            <h1 className="tittle">Produtos curtidos</h1>
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
                {postagens.map((postagem) => {
                  const { idPostagem, imagens } = postagem;
                  const imagem =
                    imagens.length > 0 ? imagens[0].codigoImagem : {fotoPadrao};

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

export default Favoritos;
