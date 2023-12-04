import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgLogo from "../../../assets/logo.png";
import "./header.css";
import { Drawer, Button } from "@mui/material";

import { IoIosMenu,IoMdContact } from "react-icons/io"
import { useAuth } from "../../../context/useAuth";

const Header = ({ children }) => {
  const { user } = useAuth()
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
console.log(user);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="left-header">
            <IoIosMenu className="hamburger-icon" onClick={toggleDrawer(true)} />
            <div className="img-container">
              <a href="/">
                <img src={imgLogo} alt="Logo" className="img" />
              </a>
            </div>
          </div>
          <div className="nav-container">{children}</div>
        </div>
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          sx={{
            zIndex: 99999
          }}

        >
          <div style={{ width: "200px", backgroundColor: "#000234" }} >
            <div className="user-icon-link" onClick={() => navigate("/perfil/" + user.userId)}>
              <IoMdContact className="user-icon" />
            </div>
            <label htmlFor="" className="category-title">Categorias</label>
            <hr style={{ width: "100%" }} />
            <div className="link-category">
              <div className="link-list-fav" onClick={() => navigate("/favoritos/" + user.userId)}>
                Produtos Curtidos
              </div>
            </div>
            <hr style={{ width: "100%" }} />
            <div className="div-categorias-hamburguer">
              <div className="link-esportes" onClick={() => navigate("/vitrine/futebol")}>Futebol</div>
              <div className="link-esportes" onClick={() => navigate("/vitrine/volei")}>Vôlei</div>
              <div className="link-esportes" onClick={() => navigate("/vitrine/basquete")}>Basquete</div>
              <div className="link-esportes" onClick={() => navigate("/vitrine/handball")}>Handebol</div>
              <div className="link-esportes" onClick={() => navigate("/vitrine/natacao")}>Natação</div>
              <div className="link-esportes" onClick={() => navigate("/vitrine/atletismo")}>Atletismo</div>
              <div className="link-esportes" onClick={() => navigate("/vitrine/ginasticaArtistica")}>Ginástica Artística</div>
              <div className="link-esportes" onClick={() => navigate("/vitrine/ginasticaRitmica")}>Ginástica Rítmica</div>
              <div className="link-esportes" onClick={() => navigate("/vitrine/artesMarciais")}>Artes Marciais</div>
              <div className="link-esportes" onClick={() => navigate("/vitrine/Ciclismo")}>Ciclismo</div>
              <div className="link-esportes" onClick={() => navigate("/vitrine/tenis")}>Tênis</div>
              <div className="link-esportes" onClick={() => navigate("/vitrine/tenisDeMesa")}>Tênis de mesa</div>
              <div className="link-esportes" onClick={() => navigate("/vitrine/poloAquatico")}>Polo aquático</div>
              <div className="link-esportes" onClick={() => navigate("/vitrine/Surf")}>Surfe</div>
            </div>
          </div>
        </Drawer>

      </div>
    </>
  );
};

export default Header;
