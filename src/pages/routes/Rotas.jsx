import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import Login from "../Login";
import Cadastro from "../Cadastro";
import Home from "../Home";
import Perfil from "../Perfil";
import Produto from "../Produto";
import EditarPerfil from "../EditarPerfil"
import Postagem from "../Postagem"
import Favoritos from "../Favoritos"
import PerfilCostureira from "../PerfilCostureira"
import NotFound from "../NotFound/notfound";
import Destaques from "../Destaques";
import Vitrine from "../Vitrine";

const Rotas = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/perfil/:idCostureira" element={<Perfil />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/produto" element={<Produto />} />
          <Route path="/produto/:id" element={<Produto />} />
          <Route path="/editar-perfil/:idCostureira" element={<EditarPerfil />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/favoritos/:id" element={<Favoritos />} />
          <Route path="/postagem" element={<Postagem />} />
          <Route path="/postagem/:id" element={<Postagem />} />
          <Route path="/perfil-costureira" element={<PerfilCostureira />} />
          <Route path="/perfil-costureira/:id" element={<PerfilCostureira />} />
          <Route path="/destaques" element={<Destaques />} />
          <Route path="/vitrine" element={<Vitrine />} />
          <Route path="/vitrine/:competencia" element={<Vitrine />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Rotas;
