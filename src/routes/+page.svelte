<script lang="ts">
  import { onMount } from "svelte";
  import { base } from "$app/paths"; // Adicione esta importação

  let currentHeroImage = $state(0);
  let activeSection = $state("");
  let isMenuOpen = $state(false); // <-- Nova variável para o menu

  // Função para fechar o menu ao clicar em um link
  function handleNavClick(id: string) {
    isMenuOpen = false;
    scrollToSection(id);
  }

  const heroImages: string[] = [
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600&h=900&fit=crop",
  ];

  const mosaicImages: string[] = [
    "https://images.unsplash.com/photo-1502633013411-fb997ddd0e22?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1514525253361-bee8a48740d7?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=600&fit=crop",
  ];

  function reveal(node: HTMLElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Adicionamos um pequeno delay extra para garantir que o CSS renderizou
            setTimeout(() => {
              node.classList.add("visible");
            }, 50);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return { destroy: () => observer.disconnect() };
  }

  onMount(() => {
    const interval = setInterval(() => {
      currentHeroImage = (currentHeroImage + 1) % heroImages.length;
    }, 5000);

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activeSection = entry.target.id;
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  });

  function scrollToSection(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
</script>

<nav class="navbar">
  <div class="container nav-container">
    <div class="logo">
      <a
        href="/"
        onclick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          isMenuOpen = false;
        }}
      >
        <img src="/logo.svg" alt="Escola Entrelaços" class="logo-img" />
      </a>
    </div>

    <button
      class="hamburger"
      class:open={isMenuOpen}
      onclick={() => (isMenuOpen = !isMenuOpen)}
      aria-label="Menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <ul class="nav-links">
      <li>
        <button
          class:active={activeSection === "como-funciona"}
          onclick={() => scrollToSection("como-funciona")}>Como Funciona</button
        >
      </li>
      <li>
        <button
          class:active={activeSection === "quem-somos"}
          onclick={() => scrollToSection("quem-somos")}>Quem Somos</button
        >
      </li>
      <li>
        <button
          class:active={activeSection === "contato"}
          onclick={() => scrollToSection("contato")}>Contato</button
        >
      </li>
      <li>
        <a
          href="https://wa.me/5521999999999"
          class="cta-nav"
          target="_blank"
          rel="noopener noreferrer"
        >
          AGENDE UMA AULA EXPERIMENTAL
        </a>
      </li>
    </ul>
  </div>

  {#if isMenuOpen}
    <div class="mobile-menu">
      <button onclick={() => handleNavClick("como-funciona")}
        >Como Funciona</button
      >
      <button onclick={() => handleNavClick("quem-somos")}>Quem Somos</button>
      <button onclick={() => handleNavClick("contato")}>Contato</button>
      <a href="https://wa.me/5521999999999" class="cta-mobile" target="_blank">
        AGENDE UMA AULA EXPERIMENTAL
      </a>
    </div>
  {/if}
</nav>

<main>
  <section class="hero">
    {#each heroImages as image, i}
      <div
        class="hero-bg"
        class:active={i === currentHeroImage}
        style:background-image="url({image})"
      ></div>
    {/each}
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <p class="hero-subtitle">Teatro, Dança e Música</p>
      <h1 class="hero-title">Em um só curso</h1>
      <p class="hero-age">Alunos de 6 a 15 anos</p>
    </div>
  </section>

  <section id="como-funciona" class="section">
    <div class="container centered-content">
      <h2 class="section-title">Como Funciona</h2>
      <p class="section-description">
        Nossa metodologia integra as três artes em uma jornada única de
        aprendizado e diversão.
      </p>

      <div class="activities-grid">
        <article
          class="activity reveal"
          use:reveal
          style:transition-delay="0.1s"
        >
          <div class="icon-frame blue">
            <img
              src="{base}/icon_musica.svg"
              alt="Música"
              class="activity-svg"
            />
          </div>
          <h3 class="activity-title text-blue">Música</h3>
          <p>
            Exploração rítmica e introdução aos instrumentos de forma lúdica.
          </p>
        </article>

        <article
          class="activity reveal"
          use:reveal
          style:transition-delay="0.2s"
        >
          <div class="icon-frame pink">
            <img
              src="{base}/icon_teatro.svg"
              alt="Teatro"
              class="activity-svg"
            />
          </div>
          <h3 class="activity-title text-pink">Teatro</h3>
          <p>Expressão corporal e improvisação para desenvolver a confiança.</p>
        </article>

        <article
          class="activity reveal"
          use:reveal
          style:transition-delay="0.3s"
        >
          <div class="icon-frame orange">
            <img src="{base}/icon_danca.svg" alt="Dança" class="activity-svg" />
          </div>
          <h3 class="activity-title text-orange">Dança</h3>
          <p>
            Movimento e consciência corporal através de coreografias vibrantes.
          </p>
        </article>
      </div>
    </div>
  </section>

  <section id="quem-somos" class="section orange-bg">
    <div class="container grid-split">
      <div class="mosaic-container">
        <div class="mosaic-grid">
          <div
            class="mosaic-item big"
            style:background-image="url({mosaicImages[0]})"
          ></div>
          <div
            class="mosaic-item"
            style:background-image="url({mosaicImages[1]})"
          ></div>
          <div
            class="mosaic-item"
            style:background-image="url({mosaicImages[2]})"
          ></div>
          <div
            class="mosaic-item wide"
            style:background-image="url({mosaicImages[3]})"
          ></div>
          <div
            class="mosaic-item"
            style:background-image="url({mosaicImages[4]})"
          ></div>
          <div
            class="mosaic-item"
            style:background-image="url({mosaicImages[5]})"
          ></div>
          <div
            class="mosaic-item"
            style:background-image="url({mosaicImages[6]})"
          ></div>
        </div>
      </div>
      <div class="text-block">
        <h2 class="section-title light">Quem Somos</h2>
        <p>
          A Escola Entrelaços nasceu da paixão por unir as artes performáticas
          em um currículo único para crianças e jovens.
        </p>
        <p>
          Acreditamos que a arte é a ferramenta mais poderosa para o
          desenvolvimento da criatividade e da autoconfiança.
        </p>
      </div>
    </div>
  </section>

  <section id="contato" class="section">
    <div class="container">
      <div class="grid-split contact-layout">
        <div class="text-block">
          <h2 class="section-title">Contato</h2>
          <p>
            Agende uma visita e venha conhecer nossa estrutura no centro da
            cidade.
          </p>
          <p><strong>📍 Localização:</strong> Rua das Artes, 123 - Centro</p>
          <p><strong>📞 WhatsApp:</strong> (21) 99999-9999</p>
        </div>

        <div class="map-frame">
          <iframe
            src="https://maps.google.com/maps?width=600&height=400&hl=en&q=R.%20São%20Clemente,%20421%20-%20Botafogo,%20Rio%20de%20Janeiro&t=&z=16&ie=UTF8&iwloc=B&output=embed"
            title="Mapa de Localização"
            class="map-element"
          ></iframe>
        </div>
      </div>

      <div class="cta-footer-block">
        <a href="https://wa.me/5521999999999" class="btn-long-cta">
          AGENDE UMA AULA EXPERIMENTAL
        </a>
      </div>
    </div>
  </section>
</main>

<footer class="footer">
  <div class="container footer-layout">
    <div class="footer-info">
      <img src="/logo.svg" alt="Escola Entrelaços" class="footer-logo" />
      <p>© 2026 Escola Entrelaços. Todos os direitos reservados.</p>
    </div>

    <div class="social-links">
      <a
        href="https://instagram.com/perfil-placeholder"
        class="social-btn insta"
        target="_blank"
        aria-label="Instagram"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path
            d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
          ></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg
        >
      </a>

      <a
        href="https://wa.me/5521999999999"
        class="social-btn whats"
        target="_blank"
        aria-label="WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><path
            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
          ></path></svg
        >
      </a>

      <a
        href="mailto:contato@placeholder.com.br"
        class="social-btn mail"
        aria-label="E-mail"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><path
            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
          ></path><polyline points="22,6 12,13 2,6"></polyline></svg
        >
      </a>
    </div>
  </div>
</footer>

<style>
  :root {
    --orange: #f6851f;
    --pink: #e13945;
    --blue: #0094cb;
    --dark: #222;
    --white: #fff;
    --radius-lg: 40px;
    --radius-md: 20px;
  }

  :global(html) {
    scroll-behavior: smooth;
    /* Melhora a renderização de fontes e animações */
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
    /* scroll-snap-type: y mandatory; /* Ativa o "ímã" no eixo vertical */
  }

  :global(body) {
    font-family: "Nunito", sans-serif;
    color: var(--dark);
    margin: 0;
    line-height: 1.8;
  }

  .container {
    max-width: 1250px;
    margin: 0 auto;
    padding: 0 50px;
  }

  .centered-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .grid-split {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 100px;
    align-items: center;
  }

  /* Navbar */
  .navbar {
    padding: 10px 0; /* De 30px para 10px */
    background: var(--orange);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    /* Adicionando um glassmorphism sutil para não pesar */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo-img {
    height: 38px;
    width: auto;
    display: block;
    transition: transform 0.3s ease;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 25px;
    align-items: center;
    margin: 0;
  }
  .nav-links button {
    background: none;
    border: none;
    color: white;
    font-weight: 700;
    cursor: pointer;
    font-size: 0.95rem;
    font-family: "Nunito", sans-serif;
    position: relative; /* Necessário para posicionar a linha */
    padding: 5px 0;
    transition: color 0.3s ease;
  }
  /* Criando a linha orgânica com pseudo-elemento */
  .nav-links button::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 3px; /* Linha um pouco mais grossinha e arredondada */
    background-color: white;
    border-radius: 10px; /* Deixa a linha orgânica/arredondada */
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: translateX(-50%);
    opacity: 0;
  }
  /* Estado ativo e hover */
  .nav-links button:hover::after,
  .nav-links button.active::after {
    width: 100%;
    opacity: 1;
  }
  /* Leve bounce no texto ao passar o mouse */
  .nav-links button:hover {
    transform: translateY(-2px);
  }
  .nav-links button.active {
    border-bottom: 1px solid white;
  }
  .cta-nav {
    background: var(--pink);
    color: white;
    padding: 8px 18px;
    border-radius: 100px;
    text-decoration: none;
    font-weight: 800;
    font-size: 0.8rem;
    display: inline-block;

    /* Transição suave para todas as propriedades */
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 3px 0px rgba(180, 30, 40, 1); /* Ajuste da sombra 3D proporcional */
  }

  /* Animação ao passar o mouse (Hover) */
  .cta-nav:hover {
    background: #ef4452; /* Um rosa levemente mais claro */
    transform: translateY(-2px); /* Eleva o botão levemente */
    box-shadow: 0 6px 15px rgba(225, 57, 69, 0.3); /* Sombra mais difusa */
  }

  /* Animação de Clique (Active) */
  .cta-nav:active {
    transform: translateY(2px); /* "Empurra" o botão para baixo */
    box-shadow: 0 0px 0px rgba(180, 30, 40, 1);
    filter: brightness(0.9); /* Escurece levemente */
  }

  /* Estilos do Hamburger */
  .hamburger {
    display: none; /* Escondido no desktop */
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 25px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;
  }

  .hamburger span {
    width: 30px;
    height: 3px;
    background: white;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }

  /* Animação para transformar em "X" */
  .hamburger.open span:first-child {
    transform: rotate(45deg);
  }
  .hamburger.open span:nth-child(2) {
    opacity: 0;
    transform: translateX(20px);
  }
  .hamburger.open span:last-child {
    transform: rotate(-45deg);
  }

  /* Estilos do Menu Mobile */
  .mobile-menu {
    position: absolute;
    top: 100%; /* Logo abaixo da navbar fixa */
    left: 0;
    width: 100%;
    background: var(--orange);
    display: flex;
    flex-direction: column;
    padding: 20px 0 40px 0;
    gap: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    z-index: 999;
    align-items: center;
  }

  .mobile-menu button {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    font-weight: 700;
    font-family: "Nunito", sans-serif;
  }

  .cta-mobile {
    background: var(--pink);
    color: white;
    padding: 15px 30px;
    border-radius: 100px;
    text-decoration: none;
    font-weight: 800;
    margin-top: 10px;
  }

  /* Media Query para ativar o Hamburger */
  @media (max-width: 1100px) {
    .hamburger {
      display: flex; /* Mostra o hamburger */
      height: 20px;
      width: 25px;
    }

    .nav-links {
      display: none; /* Já estava assim no seu código, mantemos */
    }

    /* Ajuste para a navbar mobile não ficar tão alta */
    .navbar {
      padding: 20px 0;
    }

    .logo-img {
      height: 32px; /* Diminuindo de 55px para 35px no mobile */
    }

    .nav-container {
      padding: 0 20px; /* Reduzindo o padding lateral para ganhar mais área útil */
      gap: 15px; /* Garante um respiro mínimo entre logo e hamburger */
    }

    .navbar {
      padding: 8px 0;
    } /* Deixando a barra um pouco mais fina */
  }

  /* Hero */
  .hero {
    height: 100vh;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: 1.2s;
    transform: scale(1); /* Estado inicial */
    transition:
      transform 6s ease-out,
      opacity 1.2s; /* Transição longa para o zoom */
  }

  .hero-bg.active {
    opacity: 1;
    transform: scale(1.1); /* Leve aumento enquanto ativa */
  }
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
  }
  .hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    width: 100%;
    color: white;
  }
  .hero-title {
    font-size: 5.5rem;
    font-weight: 900;
    line-height: 1.1;
    margin: 15px 0;
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4); /* Cria separação da imagem */
    letter-spacing: -2px;
  }
  .hero-subtitle {
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 6px; /* Aumentar o espaçamento deixa mais chique */
    font-weight: 800;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }
  .hero-age {
    font-size: 1.1rem;
    background: rgba(0, 0, 0, 0.2); /* Um fundo sutil para o texto pequeno */
    padding: 5px 15px;
    border-radius: 50px;
    display: inline-block;
    backdrop-filter: blur(4px); /* Efeito de vidro fosco atrás da idade */
  }

  .btn-primary-large,
  .cta-nav {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .btn-primary-large:active,
  .cta-nav:active {
    transform: scale(0.95); /* Efeito de apertar */
  }

  /* Brilho sutil ao passar o mouse */
  .btn-primary-large:hover {
    box-shadow: 0 15px 30px rgba(225, 57, 69, 0.4);
    filter: brightness(1.1);
  }

  .section,
  .hero {
    scroll-snap-align: start; /* Alinha o topo da seção com o topo da tela */
  }

  /* Seções */
  .section {
    min-height: 100vh; /* Garante pelo menos o tamanho da tela */
    display: flex;
    align-items: center; /* Centraliza o conteúdo verticalmente */
    padding: 60px 0; /* Mantém um respiro lateral/interno */
    box-sizing: border-box;
    scroll-margin-top: 10px; /* Garante que o título não fique colado na header fina */
  }
  /* Garante que o conteúdo dentro das seções ocupe a largura correta e fique centralizado */
  .section .container {
    width: 100%;
    position: relative;
    z-index: 1;
  }
  /* 2. Aproximando a descrição do título e da grade */
  .section-title {
    font-size: 3.8rem; /* Leve redução para equilibrar */
    margin-bottom: 10px; /* Diminuído de 40px */
    font-weight: 900;
    line-height: 1.1;
    color: var(--dark);
  }
  .section-title.light {
    color: white;
  }
  .section-description {
    font-size: 1.3rem;
    margin-bottom: 50px; /* Cortado pela metade (era 100px) */
  }
  #como-funciona .section-title {
    text-align: center;
  }
  /* Atividades */
  .activities-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    width: 100%;
    justify-items: center;
  }
  .activity {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 320px;
    transition: transform 0.3s ease;
    padding: 15px;
    border-radius: var(--radius-md);
  }
  .icon-frame {
    width: 140px;
    height: 140px;
    margin-bottom: 15px;
    border-radius: 40px;
    padding: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 45px;
  }
  .icon-frame.blue {
    background: #f0f7ff;
  }
  .icon-frame.pink {
    background: #fff1f2;
  }
  .icon-frame.orange {
    background: #fff7ed;
  }
  .activity-svg {
    width: 100%;
    height: auto;
  }
  .activity:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.5); /* Leve destaque no fundo */
  }
  .activity:hover .icon-frame {
    transform: scale(1.1) rotate(5deg);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .icon-frame {
    transition: transform 0.3s ease;
    /* Adicione um leve drop-shadow para profundidade */
    filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.05));
  }
  .activity-title {
    font-size: 1.2rem;
    font-weight: 800;
    margin-bottom: 10px;
  }
  .text-blue {
    color: var(--blue);
  }
  .text-pink {
    color: var(--pink);
  }
  .text-orange {
    color: var(--orange);
  }

  /* Mosaico */
  .orange-bg {
    background: var(--orange);
    color: white;
  }
  .mosaic-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 150px;
    gap: 15px;
  }
  .mosaic-item {
    background-size: cover;
    background-position: center;
    border-radius: var(--radius-md);
    background-color: rgba(255, 255, 255, 0.1);
  }
  .mosaic-item.big {
    grid-column: span 2;
    grid-row: span 2;
  }
  .mosaic-item.wide {
    grid-column: span 2;
  }

  /* Contato e Botões */
  .map-frame {
    height: 500px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
  .map-element {
    width: 100%;
    height: 100%;
    border: none;
  }
  .cta-center-block {
    text-align: center;
    margin-top: 100px;
  }
  .btn-primary-large {
    background: var(--pink);
    color: white;
    padding: 30px 80px;
    border-radius: 100px;
    text-decoration: none;
    font-weight: 900;
    font-size: 1.5rem;
    display: inline-block;
    transition: 0.4s;
  }
  .btn-primary-large:hover {
    transform: translateY(-8px);
  }

  /* Footer Moderno com Logo-Botões */
  .footer {
    background: #1a1a1a;
    color: #aaa;
    padding: 80px 0;
    border-top: 1px solid #333;
    scroll-snap-align: end;
    scroll-snap-stop: always;
  }
  .footer-layout {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-logo {
    height: 40px;
    margin-bottom: 15px;
    opacity: 0.8;
    filter: grayscale(1);
    transition: 0.3s;
  }
  .footer-logo:hover {
    opacity: 1;
    filter: none;
  }

  .social-links {
    display: flex;
    gap: 20px;
  }
  .social-btn {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2a2a2a;
    color: #fff;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    text-decoration: none;
  }
  .social-btn svg {
    width: 24px;
    height: 24px;
  }

  /* Cores de hover para cada marca */
  .social-btn.insta:hover {
    background: radial-gradient(
      circle at 30% 107%,
      #fdf497 0%,
      #fdf497 5%,
      #fd5949 45%,
      #d6249f 60%,
      #285aeb 90%
    );
    transform: scale(1.1);
  }
  .social-btn.whats:hover {
    background: #25d366;
    transform: scale(1.1);
  }
  .social-btn.mail:hover {
    background: var(--blue);
    transform: scale(1.1);
  }

  @media (max-width: 1100px) {
    .footer-layout {
      flex-direction: column;
      text-align: center;
      gap: 40px;
    }
    .grid-split,
    .activities-grid {
      grid-template-columns: 1fr;
      gap: 60px;
    }
    .hero-title {
      font-size: 3.5rem;
    }
    .nav-links {
      display: none;
    }
  }

  /* Isso avisa o Svelte: "Mesmo que você não veja .visible no HTML, 
ela vai aparecer e deve ser aplicada globalmente neste elemento" */

  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.8s ease-out,
      transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  }

  /* ALTERE DE: .reveal.visible PARA: */
  .reveal:global(.visible) {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  /* Garante que o layout de cima funcione e o botão respire */
  .contact-layout {
    margin-bottom: 60px; /* Espaço entre o mapa e o botão */
  }

  .cta-footer-block {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .btn-long-cta {
    background: var(--pink);
    color: white;
    padding: 25px 40px;
    width: 100%;
    max-width: 900px; /* Tamanho máximo para manter a elegância */
    border-radius: 100px;
    text-decoration: none;
    font-weight: 900;
    font-size: 1.4rem;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 10px 25px rgba(225, 57, 69, 0.2);
    display: block;
  }

  .btn-long-cta:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(225, 57, 69, 0.3);
    filter: brightness(1.1);
  }

  .btn-long-cta:active {
    transform: translateY(2px);
  }

  /* Ajuste Mobile */
  @media (max-width: 768px) {
    .btn-long-cta {
      font-size: 1.1rem;
      padding: 20px;
    }
  }
  /* Classe da Padronagem */
  .with-pattern {
    position: relative;
    background-color: var(--white);
    /* Caminho para o arquivo na pasta static */
    background-image: url("/padronagem_d.svg");
    background-repeat: repeat;
    background-size: 2000px; /* Ajuste esse valor para aumentar/diminuir o tamanho dos logos */
    background-attachment: local;

    /* O SEGREDO: Para a padronagem não brigar com o texto, 
       usamos uma opacidade baixíssima. Se o SVG for escuro, 
       podemos usar filtros para deixá-lo quase invisível. */
    background-blend-mode: overlay;
    opacity: 1;
  }

  .section:not(.orange-bg) {
    position: relative;
    background-color: var(--white);
    clip-path: inset(0);
    overflow: hidden; /* Garante que a padronagem não "vaze" */
  }

  /* 2. Pseudo-elemento ::before para a camada de padronagem */
  .section:not(.orange-bg)::before {
    content: "";
    /* Mudamos de absolute para FIXED */
    position: fixed;
    inset: 0;
    z-index: 0;

    background-color: var(--orange);

    -webkit-mask-image: url("/padronagem_d.svg");
    mask-image: url("/padronagem_d.svg");

    -webkit-mask-repeat: repeat;
    mask-repeat: repeat;

    -webkit-mask-position: center;
    mask-position: center;

    /* Mantendo seu tamanho gigante */
    -webkit-mask-size: 3000px !important;
    mask-size: 3000px !important;

    /* Removemos o mask-attachment porque o position: fixed já faz o trabalho */

    opacity: 0.03;
    pointer-events: none;
  }
</style>
