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
