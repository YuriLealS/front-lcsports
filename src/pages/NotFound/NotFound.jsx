import React from "react";
import notfound from "../../assets/not-found.png";
import "./notfound.css";
import Header from "../components/HeaderComponent";
import NavProfile from "../components/HeaderComponent/NavTypes/NavProfile";
const NotFound = () => {
  return (
    <div className="notfound-container">
      <Header>
        <NavProfile />
      </Header>
      <div className="card-img-not-found">
        <div className="img-not-found">
          <img src={notfound} alt="" className="img-serch-not-found" />
          <div className="card-text-notfound">
        <p className="text-notfound">Busca não encontrada</p>
      </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
