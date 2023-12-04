import React, { useEffect, useState } from "react";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./perfil.css";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/HeaderComponent";
import NavProfile from "../components/HeaderComponent/NavTypes/NavProfile";
import { useQuery } from "react-query";
import { costureiraPeloId } from "../../services/costureira/costureiraService";
import fotoPadrao from "../../assets/foto-default.png";
import axios from "axios";

const Vitrine = () => {
  const param = useParams();

  const navigate = useNavigate();

  const [postagens, setPostagens] = useState([]);
  const getPostagens = () => {
    axios
      .get(
        "http://localhost:8080/v1/postagens/competencias/" + param?.competencia
      )
      .then((response) => {
        console.log(response);
        setPostagens(response.data)
      })
      .catch((response) => console.log(response));
  };

  useEffect(() => getPostagens(), []);

  console.log(param);

  return (
    <div className="perfil-container">
      <Header>
        <NavProfile />
      </Header>
      <div className="favoritos-section">
        <div className="container">
          <div className="favoritos-container">
            <h1 className="tittle">{param.competencia}</h1>
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
                  {postagens.map((postagem) => {
                    return (
                      <SwiperSlide>
                        <div onClick={() => navigate("/produto/" + postagem.idPostagem)}>
                          <div className="image-slider-post">
                            <img
                              src={postagem.imagens[0].codigoImagem}
                              alt=""
                              className="img-carrossel"
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
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

export default Vitrine;
