import React from "react";
import { Link } from "react-router-dom";

import DropDown from "../../../DropDown";
import { useAuth } from "../../../../../context/useAuth";

const NavProfile = () => {
  const { signed, user } = useAuth();
  return (
    <>
      {signed ? (
        <>
          <DropDown user={user} />
        </>
      ) : (
        <>
          <a href="/login" className="button">
            Entrar
          </a>

          <a href="/cadastro" className="button">
            Cadastrar
          </a>
        </>
      )}
    </>
  );
};

export default NavProfile;
