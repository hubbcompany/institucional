const socialChannels = [
  { name: 'Instagram', channel: 'instagram', url: 'https://www.instagram.com/hubbcompany/', icon: 'ig' },
  { name: 'LinkedIn', channel: 'linkedin', url: 'https://www.linkedin.com/company/hubbcompany/', icon: 'in' },
  { name: 'Facebook', channel: 'facebook', url: 'https://www.facebook.com/hubbcompany/', icon: 'f' },
  { name: 'YouTube', channel: 'youtube', url: 'https://www.youtube.com/@hubbcompany', icon: '▶' },
  { name: 'TikTok', channel: 'tiktok', url: 'https://www.tiktok.com/@hubbcompany', icon: '♪' }
];

const socialMarkup = `
  <div class="footer-social" aria-label="Redes sociais da Hubb Company">
    <strong>Acompanhe a Hubb</strong>
    <div class="social-links">
      ${socialChannels.map(({ name, channel, url, icon }) => `
        <a href="${url}" target="_blank" rel="me noopener noreferrer" data-track-external="${channel}" data-link-location="footer">
          <svg class="social-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><circle cx="16" cy="16" r="14"></circle><text x="16" y="20" text-anchor="middle">${icon}</text></svg>
          <span>${name}</span>
        </a>`).join('')}
    </div>
  </div>`;

const footer = document.querySelector('.site-footer');
if (footer) {
  const footerBottom = footer.querySelector('.footer-bottom');
  if (footerBottom) footerBottom.insertAdjacentHTML('beforebegin', socialMarkup);
  else footer.insertAdjacentHTML('beforeend', `<div class="container">${socialMarkup}</div>`);
} else {
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div><a href="/" class="logo logo-footer"><span class="logo-mark" aria-hidden="true"><i></i><i></i><i></i></span><span>hubb<span>company</span></span></a><p>Automação de negócios para empresas que querem operar melhor.</p></div>
        <nav aria-label="Automação"><strong>Automação</strong><a href="/automacao-de-negocios/">Visão geral</a><a href="/automacao-de-negocios/automacao-de-marketing/">Marketing</a><a href="/automacao-de-negocios/automacao-de-vendas/">Vendas</a><a href="/automacao-de-negocios/automacao-de-processos/">Processos</a></nav>
        <nav aria-label="Empresa"><strong>Empresa</strong><a href="/como-funciona/">Como funciona</a><a href="/sobre/">Sobre</a><a href="/contato/">Contato</a></nav>
      </div>
      <div class="container">${socialMarkup}</div>
      <div class="container footer-bottom"><p>© 2026 Hubb Company. Todos os direitos reservados.</p><nav aria-label="Links legais"><a href="/politica-de-privacidade/">Privacidade</a><a href="/termos-de-servico/">Termos</a><a href="/exclusao-de-dados/">Exclusão de dados</a></nav></div>
    </footer>`);
}

const contactPage = document.querySelector('.contact-page');
if (contactPage) {
  contactPage.insertAdjacentHTML('afterend', `
    <section class="external-channels-section" aria-labelledby="external-channels-title">
      <div class="container">
        <div class="section-heading">
          <div><p class="eyebrow">Outros canais</p><h2 id="external-channels-title">Escolha como prefere falar com a Hubb.</h2></div>
          <p>O formulário continua sendo o melhor caminho para explicar seu processo. Se preferir uma conversa mais direta, estamos também no WhatsApp.</p>
        </div>
        <div class="external-channels-grid">
          <article class="external-channel-card featured-channel">
            <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><circle cx="16" cy="16" r="13"></circle><path d="M10 25l1.3-4.5A9 9 0 1125 17a9 9 0 01-9 9 8.9 8.9 0 01-4.3-1.1z"></path></svg>
            <div><p class="channel-label">WhatsApp</p><h3>Conversar pelo WhatsApp</h3><p>(19) 99151-2409</p></div>
            <a class="btn btn-primary" href="https://wa.me/5519991512409?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Hubb%20Company%20e%20quero%20conversar%20sobre%20automa%C3%A7%C3%A3o." target="_blank" rel="noopener noreferrer" data-track-external="whatsapp" data-link-location="contato">Abrir conversa ↗</a>
          </article>
          <article class="external-channel-card">
            <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M16 29s10-8.1 10-17A10 10 0 106 12c0 8.9 10 17 10 17z"></path><circle cx="16" cy="12" r="3.5"></circle></svg>
            <div><p class="channel-label">Google</p><h3>Ver a Hubb no Google</h3><p>Acesse o perfil público da empresa.</p></div>
            <a class="text-link" href="https://share.google/yQZIZZm4AxiGnwaPU" target="_blank" rel="noopener noreferrer" data-track-external="google_business" data-link-location="contato">Abrir perfil →</a>
          </article>
        </div>
        <div class="google-review-callout"><p><strong>Já trabalhou com a Hubb?</strong> Sua experiência pode ajudar outras empresas.</p><a href="https://g.page/r/Cf4KuLvoEczAEBM/review" target="_blank" rel="noopener noreferrer" data-track-external="google_review" data-link-location="contato">Deixar uma avaliação no Google ↗</a></div>
      </div>
    </section>`);
}

document.querySelectorAll('[data-track-cta]').forEach((link) => {
  link.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'cta_diagnostico_clicado',
      cta_location: link.dataset.trackCta,
      page_path: window.location.pathname
    });
  });
});

document.querySelectorAll('[data-track-external]').forEach((link) => {
  link.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'contato_externo_clicado',
      channel: link.dataset.trackExternal,
      link_location: link.dataset.linkLocation,
      page_path: window.location.pathname
    });
  });
});

const menuToggle = document.querySelector('#menu-toggle');
document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    if (menuToggle) menuToggle.checked = false;
  });
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

if (contactForm && formStatus) {
  let formStarted = false;
  contactForm.addEventListener('input', () => {
    if (formStarted) return;
    formStarted = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'formulario_iniciado',
      form_name: 'contato_hubb_company',
      page_path: window.location.pathname
    });
  });

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');
    const buttonLabel = button.querySelector('.button-label');
    button.disabled = true;
    buttonLabel.textContent = 'Enviando...';
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('formspree-error');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'formulario_enviado',
        form_name: 'contato_hubb_company',
        page_path: window.location.pathname
      });
      contactForm.reset();
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Mensagem enviada! Vamos analisar o cenário e responder com o próximo passo.';
    } catch (error) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'formulario_erro',
        form_name: 'contato_hubb_company',
        page_path: window.location.pathname
      });
      formStatus.className = 'form-status error';
      formStatus.innerHTML = 'Não conseguimos enviar agora. Tente novamente ou escreva para <a href="mailto:contato@hubbcompany.com.br">contato@hubbcompany.com.br</a>.';
    } finally {
      button.disabled = false;
      buttonLabel.textContent = 'Solicitar diagnóstico';
    }
  });
}
