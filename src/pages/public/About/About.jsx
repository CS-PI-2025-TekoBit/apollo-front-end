import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import { User, Envelope, Phone } from "@phosphor-icons/react";
import logoMarca from "../../../assets/imgs/logomarca.png";
import "./About.css";

export default function About() {
  return (
    <>
      <Header />

      {/* Hero Image Full Width */}
      <div className="hero-image" role="img" aria-label="Fachada da Apollo Veículos" />

      <main className="about-content">
        {/* Texto introdutório – Poppins 32px */}
        <section className="intro-text">
          <p>
            Dispomos de ampla variedade de carros, multimarcas, usados e semi-novos das mais
            variadas marcas, modelos, cores e faixas de preço; nacionais e importados;
            automóveis e caminhonetes, usados, semi-novos.
          </p>
        </section>

        {/* Administração */}
        <section className="admin-section">
          <h2>Nossa administração</h2>
          <div className="admin-grid">
            <article className="admin-card">
              <div className="admin-icon">
                <User size={36} weight="bold" />
              </div>
              <h3>Wagner</h3>
              <p className="role">Proprietário</p>
              <div className="contact">
                <p>
                  <Envelope size={14} /> wagner@apolloveiculos.com
                </p>
                <p>
                  <Phone size={14} /> (44) 99999-1111
                </p>
              </div>
            </article>

            <article className="admin-card">
              <div className="admin-icon">
                <User size={36} weight="bold" />
              </div>
              <h3>José Luiz</h3>
              <p className="role">Proprietário</p>
              <div className="contact">
                <p>
                  <Envelope size={14} /> joseluiz@apolloveiculos.com
                </p>
                <p>
                  <Phone size={14} /> (44) 99999-2222
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="brand-footer">
          <img src={logoMarca} alt="Apollo Veículos" className="logo" />
          <address className="address">
            AVENIDA HEITOR ALENCAR FURTADO, 3980 JARDIM SÃO JORGE<br />
            87 711-000 – PARANAVAÍ/PARANÁ
          </address>
          <p className="highlight">
            Integridade, honestidade e profissionalismo são as premissas que sempre nortearam as
            atividades da nossa empresa.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}