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
import EventosPage from "../pages/EventosPage";

// O arquivo router.tsx é onde definimos as rotas da aplicação -- baseado no router visto em sala.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      // A linha abaixo define a rota “índice” (a rota padrão) dentro do grupo de rotas
      // filhas do caminho /. Ou seja, quando o usuário acessa exatamente /, ela redireciona
      // automaticamente para /home.
      // - index: true marca essa rota como a padrão do pai.
      // - <Navigate to="/home" replace /> faz o redirecionamento.
      // - replace troca a entrada no histórico (o usuário não volta para / ao apertar “voltar”).
      //rotas públicas:
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "home", element: <HomePage /> },
      { path: "em-andamento", element: <EmAndamentoPage /> },
      { path: "meus-times", element: <MeusTimesPage /> },
      { path: "notificacoes", element: <NotificacoesPage /> },
      { path: "eventos", element: <EventosPage /> },
      { path: "login", element: <LoginPage /> },
      // A página de erro já faz isso
      // {path: "*", element: <h5 className="text-xl text-center mt-3">404 - Página não encontrada</h5>}
    ],
  },
  {
    //rotas privadas:
    path: "/",
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [
      { path: "admin", element: < AdminPage/> },
      {path: "criar-jogo", element: <CriarJogoPage/>},
      {path: "atualizar-jogo", element: <AtualizarJogoPage/>},
      {path: "criar-competicao", element: <CriarCompeticaoPage/>},],
  },
]);
export default router;
