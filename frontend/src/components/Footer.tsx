const Footer = () => {
  return (
    <footer className="mt-10 bg-azul-background py-6 text-sm text-branco-texto">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 text-center md:grid-cols-2 md:text-left">
        
        {/* Coluna 1 - Desenvolvedores */}
        <div>
          <h2 className="mb-2 text-base font-bold text-verde-texto">
            Desenvolvido por
          </h2>

          <ul className="space-y-1 text-gray-200">
            <li>Amanda Lemos Ribas</li>
            <li>Diogo Gouveia de Oliveira</li>
            <li>Lais Ferreira Nazareth</li>
            <li>Guilherme Da Hora Fontoura</li>
            <li>Maria Eduarda D&apos;Angelo Quitete Vianna</li>
          </ul>
        </div>

        {/* Coluna 2 - Créditos acadêmicos */}
        <div>
          

          <p className="text-gray-200">
            Instituto de Computação 
          </p>

          <p className="mt-1 text-gray-300">
            Universidade Federal Fluminense
          </p>

          <p className="mt-1 text-gray-300">
            Disciplina de Desenvolvimento Web
          </p>

          <p className="mt-1 text-gray-400">
            Simulador Copa
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;