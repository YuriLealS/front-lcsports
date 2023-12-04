import react, { useEffect, useRef, useState } from "react";

import logo from "../../../assets/logo.png";

import DropDownItem from "./DropDownItem";

import { FaUserAlt } from "react-icons/fa";
import "./dropDown.css";
import { useCallback } from "react";
import { useAuth } from "../../../context/useAuth";

const DropDown = ({ user }) => {
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  const { logoutUsuario } = useAuth();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleLogout = useCallback(() => {
    logoutUsuario();
  }, [logoutUsuario]);

  const dropItems = [
    {
      id: 1,
      imageProfile: logo,
      text: "Meu Perfil",
      path: "/perfil/" + user.userId,
    },
    {
      id: 2,
      imageProfile: logo,
      text: "Editar perfil",
      path: "/editar-perfil/" + user.userId,
    },
    {
      id: 3,
      imageProfile: logo,
      text: "Sair",
      path: "/login",
      onClick: () => {
        handleLogout();
      },
    },
  ];

  return (
    <div className="dropdown">
      <div className="menu-container" ref={menuRef}>
        <div
          className="menu-trigger"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <FaUserAlt className="image" />
        </div>

        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <h3>
            {user?.nome}
            <br />
            <span>Somelier calçados</span>
          </h3>
          <ul>
            {dropItems.map((item) => (
              <DropDownItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
