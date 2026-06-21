import "bootstrap-icons/font/bootstrap-icons.min.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useTokenStore from "../store/TokenStore";
import logo from "../assets/logo-fut.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const tokenResponse = useTokenStore((s) => s.tokenResponse);

    return (   
    <nav className="bg-amarelo-background mb-6 py-4"> {/*mb = margin-bottom, py = padding-y */}
        <div className="mx-3 md:mx-10 lg:mx-20"> {/* md:mx-10 -- margem horizontal de 10 em telas médias, lg:mx-20 -- margem horizontal de 20 em telas grandes*/}
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
                    className="hidden text-branco-texto hover:text-verde-texto md:block"
                    aria-current="page"
                    to="/notificacoes"
                    >
                        <i className="bi bi-bell  me-1"></i>
                        Notificações
                    </NavLink>
                    <NavLink 
                    className="hidden text-branco-texto hover:text-verde-texto md:block"
                    aria-current="page"
                    to="/login"
                    >
                    {tokenResponse.idUsuario > 0 ? 
                        <>
                        <i className="bi bi-box-arrow-left me-1"></i>
                        Sair
                        </> : 
                        <>
                        <i className="bi bi-box-arrow-in-right me-1"></i>
                        Entrar
                        </>
                    }
                    </NavLink>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={
                    "rounded bg-verde-texto p-2 text-white md:hidden " +
                    (isOpen ? "border-2 border-verde-texto-sombra" : "border border-verde-texto")
                    }
                >
                    {/* Use um ícone de hambúrguer aqui */}
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
                    className="text-branco-texto hover:text-verde-texto"
                    aria-current="page"
                    to="/notificacoes"
                    onClick={() => setIsOpen(false)}
                    >
                    <i className="bi bi-bell me-1"></i>
                    Notificações
                    </NavLink>
                    <NavLink
                    className="text-branco-texto hover:text-verde-texto"
                    aria-current="page"
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    >
                    {tokenResponse.idUsuario > 0 ? 
                        <>
                        <i className="bi bi-box-arrow-left me-1"></i>
                        Sair
                        </> : 
                        <>
                        <i className="bi bi-box-arrow-in-right me-1"></i>
                        Entrar
                        </>
                    }
                    </NavLink>
                </div>
                )}
        </div>
    </nav>
  )
}

export default Navbar;