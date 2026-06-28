import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import EmAndamentoPage from "../pages/EmAndamentoPage";
import MeusTimesPage from "../pages/MeusTimesPage";
import LoginPage from "../pages/LoginPage";
import { NotificacoesPage } from "../pages/NotificacoesPage";
import PrivateRoutes from "./PrivateRoutes";
import { AdminPage } from "../pages/AdminPage";
import CriarJogoPage from "../pages/CriarJogoPage";
import AtualizarJogoPage from "../pages/AtualizarJogoPage";
import CriarCompeticaoPage from "../pages/CriarCompeticaoPage";
import CriarTimePage from "../pages/CriarTimePage";
import EventosPage from "../pages/EventosPage";
import AdicionarTimesPage from "../pages/AdicionarTimesPage";
import AtualizarCompeticaoPage from "../pages/AtualizarCompeticaoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      // Rotas públicas
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "home", element: <HomePage /> },
      { path: "em-andamento", element: <EmAndamentoPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    // Rotas privadas (admin)
    path: "/",
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [
      //rotas do admin:
      { path: "admin", element: <AdminPage /> },
      { path: "criar-jogo", element: <CriarJogoPage /> },
      { path: "atualizar-jogo", element: <AtualizarJogoPage /> },
      { path: "criar-competicao", element: <CriarCompeticaoPage /> },
      { path: "criar-time", element: <CriarTimePage /> },
      { path: "gerenciar-competicoes", element: <AtualizarCompeticaoPage />},
      //rotas do user comum: 
      { path: "meus-times", element: <MeusTimesPage /> },
      { path: "eventos", element: <EventosPage /> },
      { path: "adicionar-times", element: <AdicionarTimesPage />},
      { path: "notificacoes", element: <NotificacoesPage /> },
    ],
  },
]);
export default router;