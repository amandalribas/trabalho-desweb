import "bootstrap-icons/font/bootstrap-icons.min.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useTokenStore from "../store/TokenStore";
import useNotificacaoStore from "../store/NotificacaoStore";
import logo from "../assets/logo-fut.png";
import { Client } from "@stomp/stompjs";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const tokenResponse = useTokenStore((s) => s.tokenResponse);
  const [naoLidas, setNaoLidas] = useState(0);
  const addNotificacao = useNotificacaoStore((s) => s.addNotificacao);

  useEffect(() => {
    let isMounted = true;
    let stompClient: Client | null = null;

    const connect = async () => {
      (globalThis as typeof globalThis & { global?: typeof globalThis }).global = globalThis;

      const { default: SockJS } = await import("sockjs-client/dist/sockjs.js");
      const socket = new SockJS("http://localhost:8080/ws-server");

      stompClient = new Client({
        webSocketFactory: () => socket as unknown as WebSocket,
        reconnectDelay: 5000,
        onConnect: () => {
          if (!isMounted || !stompClient) return;

          stompClient.subscribe("/CanalBack/notificacoes", (message) => {
            if (message.body) {
              const evento = JSON.parse(message.body);
              setNaoLidas((prev) => prev + 1);
              addNotificacao(evento);
            }
          });
        },
        onStompError: (frame) => {
          console.error("Erro STOMP:", frame.headers["message"]);
        },
      });

      stompClient.activate();
    };

    connect().catch((error) => {
      console.error("Erro ao conectar websocket:", error);
    });

    return () => {
      isMounted = false;
      stompClient?.deactivate();
    };
  }, [addNotificacao]);

  return (
    <nav className="bg-amarelo-background mb-6 py-4">
      {" "}
      {/*mb = margin-bottom, py = padding-y */}
      <div className="mx-3 md:mx-10 lg:mx-20">
        {" "}
        {/* md:mx-10 -- margem horizontal de 10 em telas médias, lg:mx-20 -- margem horizontal de 20 em telas grandes*/}
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <NavLink to="/" onClick={() => setIsOpen(false)}>
              <img src={logo} width="45px" />
            </NavLink>
            <NavLink
              className="hidden text-branco-texto hover:text-verde-texto md:block"
              aria-current="page"
              to="/"
            >
              <i className="bi bi-house me-1"></i>
              Home
            </NavLink>

            <NavLink
              className="hidden text-branco-texto hover:text-verde-texto md:block"
              aria-current="page"
              to="/eventos"
            >
              <i className="bi bi-calendar-event me-1"></i>
              Eventos
            </NavLink>

            {/* ELEMTENTOS DA NAVBAR QUE VARIAM DEPENDENDO DO TIPO DO USUÁRIO O PADRÃO É A DO USER PADRÃO (else) */}
            {tokenResponse.role == "ADMIN" ? (
              <>
                <NavLink
                  className="hidden text-branco-texto hover:text-verde-texto md:block"
                  aria-current="page"
                  to="/criar-jogo"
                >
                  <i className="bi-calendar-plus me-1"></i>
                  Criar jogo
                </NavLink>
                <NavLink
                  className="hidden text-branco-texto hover:text-verde-texto md:block"
                  aria-current="page"
                  to="/atualizar-jogo"
                >
                  <i className="bi bi-pencil-square  me-1"></i>
                  Atualizar Jogo
                </NavLink>
                <NavLink
                  className="hidden text-branco-texto hover:text-verde-texto md:block"
                  aria-current="page"
                  to="/criar-competicao"
                >
                  <i className="bi bi-trophy  me-1"></i>
                  Criar Competição
                </NavLink>

                <NavLink
                  className="hidden text-branco-texto hover:text-verde-texto md:block"
                  aria-current="page"
                  to="/criar-time"
                >
                  <i className="bi bi-shield-plus me-1"></i>
                  Criar Times
                </NavLink>

              </>
            ) : (
              <>
                <NavLink
                  className="hidden text-branco-texto hover:text-verde-texto md:block"
                  aria-current="page"
                  to="/em-andamento"
                >
                  <i className="bi bi-broadcast  me-1"></i>
                  Em Andamento
                </NavLink>
                <NavLink
                  className="hidden text-branco-texto hover:text-verde-texto md:block"
                  aria-current="page"
                  to="/meus-times"
                >
                  <i className="bi bi-people  me-1"></i>
                  Meus Times
                </NavLink>
                <NavLink 
                    className="hidden text-branco-texto hover:text-verde-texto md:flex items-center relative" 
                    to="/notificacoes"
                    onClick={() => setNaoLidas(0)} 
                  >
                    <i className="bi bi-bell me-1"></i>
                    Notificações

                    
                    {naoLidas > 0 && (
                      <span className="absolute -top-1 -right-3 bg-red-600 text-white rounded-full text-[10px] font-bold px-1.5 py-0.5 animate-pulse">
                        {naoLidas}
                      </span>
                    )}
                  </NavLink>
              </>
            )}

            <NavLink
              className="hidden text-branco-texto hover:text-verde-texto md:block"
              aria-current="page"
              to="/login"
            >
              {tokenResponse.idUsuario > 0 ? (
                <>
                  <i className="bi bi-box-arrow-left me-1"></i>
                  Sair
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Entrar
                </>
              )}
            </NavLink>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={
              "rounded bg-verde-texto p-2 text-white md:hidden " +
              (isOpen
                ? "border-2 border-verde-texto-sombra"
                : "border border-verde-texto")
            }
          >
            
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="mt-4 flex flex-col space-y-2 md:hidden">
            <NavLink
              className="text-branco-texto hover:text-verde-texto"
              aria-current="page"
              to="/"
              onClick={() => setIsOpen(false)}
            >
              <i className="bi bi-house me-1"></i>
              Home
            </NavLink>

            <NavLink
              className="text-branco-texto hover:text-verde-texto"
              aria-current="page"
              to="/eventos"
              onClick={() => setIsOpen(false)}
            >
              <i className="bi bi-calendar-event me-1"></i>
              Eventos
            </NavLink>
            {tokenResponse.role == "ADMIN" ? (
              <>
                <NavLink
                  className=" text-branco-texto hover:text-verde-texto md:block"
                  aria-current="page"
                  to="/criar-jogo"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="bi-calendar-plus me-1"></i>
                  Criar jogo
                </NavLink>
                <NavLink
                  className=" text-branco-texto hover:text-verde-texto md:block"
                  aria-current="page"
                  to="/atualizar-jogo"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="bi bi-pencil-square  me-1"></i>
                  Atualizar Jogo
                </NavLink>
                <NavLink
                  className=" text-branco-texto hover:text-verde-texto md:block"
                  aria-current="page"
                  to="/criar-competicao"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="bi bi-trophy  me-1"></i>
                  Criar Competição
                </NavLink>

                <NavLink
                  className=" text-branco-texto hover:text-verde-texto md:block"
                  aria-current="page"
                  to="/cadastrar-times"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="bi bi-shield-plus  me-1"></i>
                  Cad. Times
                </NavLink>

              </>
            ) : (
              <>
                <NavLink
                  className="text-branco-texto hover:text-verde-texto"
                  aria-current="page"
                  to="/em-andamento"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="bi bi-broadcast me-1"></i>
                  Em Andamento
                </NavLink>
                <NavLink
                  className="text-branco-texto hover:text-verde-texto"
                  aria-current="page"
                  to="/meus-times"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="bi bi-people me-1"></i>
                  Meus Times
                </NavLink>
                <NavLink 
                  className="hidden text-branco-texto hover:text-verde-texto md:flex items-center relative" 
                  to="/notificacoes"
                  onClick={() => setNaoLidas(0)} 
                >
                  <i className="bi bi-bell me-1"></i>
                  Notificações

                  {naoLidas > 0 && (
                    <span className="absolute -top-1 -right-3 bg-red-600 text-white rounded-full text-[10px] font-bold px-1.5 py-0.5 animate-pulse">
                      {naoLidas}
                    </span>
  )}
</NavLink>
              </>
            )}

            <NavLink
              className="text-branco-texto hover:text-verde-texto"
              aria-current="page"
              to="/login"
              onClick={() => setIsOpen(false)}
            >
              {tokenResponse.idUsuario > 0 ? (
                <>
                  <i className="bi bi-box-arrow-left me-1"></i>
                  Sair
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Entrar
                </>
              )}
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
