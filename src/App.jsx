import React from "react";

import Rotas from "./pages/routes/Rotas";
import { AuthProvider } from "./context/useAuth";

const App = () => {
  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  );
};

export default App;
