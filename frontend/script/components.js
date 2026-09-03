const Componentes = {

  // ======================== HEADER ========================

  renderizarHeader(paginaAtual) {
    const user = api.getUser();
    const logado = api.isLoggedIn();

    return `
      <div class="promo-bar">
        <div class="container">
          <span>ENTREGA LOCAL - COMBINE PELO PAINEL ADMINISTRATIVO</span>
        </div>
      </div>
      <header>
        <div class="container header-inner">
          <a href="/pages/home.html" class="marca">
            <svg class="marca-logo" viewBox="0 0 60 40" width="38" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 6C5.5 6 3 8.5 2 11c-1 2.5-1.5 5 0 7.5 1 1.5 2 3 4 4l1-1.5c-1.5-1.5-2-3-2.5-4.5-.5-2 0-4 1.5-5.5 1.5-1.5 3.5-3 6-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M10 7c2 0 4 1 5 3l3-1c-1.5-3-4.5-5-8-5S5 6 4 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
              <path d="M12.5 16c0 2 1.5 4 4 4s4-2 4-4-1.5-4-4-4-4 2-4 4z" stroke="currentColor" stroke-width="1.5" fill="none"/>
              <path d="M28 12c3-4 8-5 12-4s7 5 8 9c.5 2 .5 4-.5 6l-1-1c.5-1.5.5-3 .5-5-.5-4-3-7.5-7-9s-9-1-12 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
              <path d="M44 14c2.5-.5 5 .5 6.5 3s2 5 1.5 7.5c-.3 1.5-1 3-2 4l.8.8c1.5-1.5 2.2-3 2.5-4.5.5-3 0-6-2-8.5s-5-3.5-7.8-2.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
              <path d="M26 14c-2 2-3 5-3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
              <path d="M48 12c-2 1-3.5 3-4 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            </svg>
            <span class="marca-texto">JP CROCO</span>
          </a>
          <nav class="nav-topo">
            <a href="/pages/home.html" class="nav-link ${paginaAtual === 'home' ? 'ativo' : ''}">Inicio</a>
            <a href="/pages/loja.html" class="nav-link ${paginaAtual === 'loja' ? 'ativo' : ''}">Loja</a>
            ${logado ? `
              ${user?.acesso === 'admin' ? `<a href="/pages/admin.html" class="nav-link ${paginaAtual === 'admin' ? 'ativo' : ''}">Admin</a>` : ''}
              <a href="/pages/minhas-compras.html" class="nav-link ${paginaAtual === 'compras' ? 'ativo' : ''}">Minhas Compras</a>
              <a href="/pages/conta.html" class="nav-link ${paginaAtual === 'conta' ? 'ativo' : ''}">Minha Conta</a>
              <button class="btn-nav-logout" onclick="Componentes.logout()">Sair</button>
            ` : `
              <a href="/pages/login.html" class="nav-link ${paginaAtual === 'login' ? 'ativo' : ''}">Entrar</a>
            `}
            <button class="btn-cart" onclick="Componentes.abrirSacola()" aria-label="Abrir sacola">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span class="badge cart-counter" id="cartCounter" style="display:none">0</span>
            </button>
          </nav>
          <button class="btn-cart btn-cart-mobile" onclick="Componentes.abrirSacola()" aria-label="Abrir sacola">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span class="badge cart-counter" id="cartCounterMobile" style="display:none">0</span>
          </button>
          <button class="hamburger" onclick="Componentes.toggleMobileMenu()" aria-label="Menu">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </header>
      <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-header">
          <a href="/pages/home.html" class="marca">
            <svg class="marca-logo" viewBox="0 0 60 40" width="30" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 6C5.5 6 3 8.5 2 11c-1 2.5-1.5 5 0 7.5 1 1.5 2 3 4 4l1-1.5c-1.5-1.5-2-3-2.5-4.5-.5-2 0-4 1.5-5.5 1.5-1.5 3.5-3 6-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M10 7c2 0 4 1 5 3l3-1c-1.5-3-4.5-5-8-5S5 6 4 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
              <path d="M12.5 16c0 2 1.5 4 4 4s4-2 4-4-1.5-4-4-4-4 2-4 4z" stroke="currentColor" stroke-width="1.5" fill="none"/>
              <path d="M28 12c3-4 8-5 12-4s7 5 8 9c.5 2 .5 4-.5 6l-1-1c.5-1.5.5-3 .5-5-.5-4-3-7.5-7-9s-9-1-12 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
              <path d="M44 14c2.5-.5 5 .5 6.5 3s2 5 1.5 7.5c-.3 1.5-1 3-2 4l.8.8c1.5-1.5 2.2-3 2.5-4.5.5-3 0-6-2-8.5s-5-3.5-7.8-2.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
              <path d="M26 14c-2 2-3 5-3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
              <path d="M48 12c-2 1-3.5 3-4 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            </svg>
            <span class="marca-texto">JP CROCO</span>
          </a>
          <button class="panel-close" onclick="Componentes.toggleMobileMenu()" aria-label="Fechar menu">&times;</button>
        </div>
        <nav class="mobile-menu-links">
          <a href="/pages/home.html" class="mobile-link ${paginaAtual === 'home' ? 'ativo' : ''}">Inicio</a>
          <a href="/pages/loja.html" class="mobile-link ${paginaAtual === 'loja' ? 'ativo' : ''}">Loja</a>
          <button class="mobile-link mobile-cart" onclick="Componentes.abrirSacola()">Sacola</button>
          ${logado ? `
            ${user?.acesso === 'admin' ? `<a href="/pages/admin.html" class="mobile-link ${paginaAtual === 'admin' ? 'ativo' : ''}">Admin</a>` : ''}
            <a href="/pages/minhas-compras.html" class="mobile-link ${paginaAtual === 'compras' ? 'ativo' : ''}">Minhas Compras</a>
            <a href="/pages/conta.html" class="mobile-link ${paginaAtual === 'conta' ? 'ativo' : ''}">Minha Conta</a>
            <hr class="divisor" style="margin:16px 0">
            <button class="mobile-link mobile-logout" onclick="Componentes.logout()">Sair</button>
          ` : `
            <hr class="divisor" style="margin:16px 0">
            <a href="/pages/login.html" class="mobile-link ${paginaAtual === 'login' ? 'ativo' : ''}">Entrar</a>
          `}
        </nav>
      </div>
    `;
  },

  // ======================== FOOTER ========================

  renderizarFooter() {
    return `
      <footer>
        <div class="container footer-inner">
          <div class="footer-grid">
            <div class="footer-col">
              <h4>JP Croco</h4>
              <p class="footer-desc">Estilo, elegancia e qualidade desde 2026. Moda que define atitude.</p>
            </div>
            <div class="footer-col">
              <h4>Navegacao</h4>
              <a href="/pages/home.html">Inicio</a>
              <a href="/pages/loja.html">Loja</a>
              <a href="/pages/login.html">Minha Conta</a>
            </div>
            <div class="footer-col">
              <h4>Atendimento</h4>
              <span>contato@jpcroco.com.br</span>
              <span>(11) 99999-9999</span>
              <span>Seg - Sex: 9h as 18h</span>
            </div>
          </div>
          <hr class="divisor">
          <div class="footer-bottom">
            <span>&copy; 2026 JP Croco. Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>
    `;
  },

  // ======================== CART PANEL ========================

  renderizarPainelSacola() {
    return `
      <div class="overlay" id="overlay" onclick="Componentes.fecharSacola()"></div>
      <div class="panel sacola-panel" id="sacolaPanel" aria-hidden="true">
        <div class="panel-header">
          <h2>Sacola</h2>
          <button class="panel-close" onclick="Componentes.fecharSacola()" aria-label="Fechar">&times;</button>
        </div>
        <div class="panel-body" id="sacolaItens">
        </div>
        <div class="panel-footer" id="sacolaFooter" style="display:none">
          <div class="cart-summary">
            <div class="cart-summary-row">
              <span>Subtotal</span>
              <span id="sacolaSubtotal">R$ 0,00</span>
            </div>
            <div class="cart-summary-row total">
              <span>Total</span>
              <span id="sacolaTotal">R$ 0,00</span>
            </div>
          </div>
          <button class="btn btn-primary btn-block mt-3" onclick="Componentes.abrirCheckout()">
            Finalizar Compra
          </button>
          <button class="btn btn-ghost btn-block mt-1" onclick="Componentes.fecharSacola()">
            Continuar Comprando
          </button>
        </div>
      </div>
    `;
  },

  // ======================== CHECKOUT PANEL ========================

  renderizarCheckout() {
    return `
      <div class="panel checkout-panel" id="checkoutPanel" aria-hidden="true">
        <div class="panel-header">
          <button class="panel-close" onclick="Componentes.voltarSacola()" aria-label="Voltar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h2>Finalizar Compra</h2>
          <button class="panel-close" onclick="Componentes.fecharCheckout()" aria-label="Fechar">&times;</button>
        </div>
        <div class="panel-body">
          <form id="checkoutForm" onsubmit="Componentes.finalizarCompra(event)" novalidate>
            <div class="checkout-section">
              <h3 class="checkout-section-title">Dados Pessoais</h3>
              <div class="form-group">
                <label class="form-label" for="ckNome">Nome Completo</label>
                <input type="text" id="ckNome" name="nome" required placeholder="Seu nome completo">
                <span class="form-error">Preencha seu nome</span>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="ckEmail">Email</label>
                  <input type="email" id="ckEmail" name="email" required placeholder="email@exemplo.com">
                  <span class="form-error">Email invalido</span>
                </div>
                <div class="form-group">
                  <label class="form-label" for="ckTelefone">Telefone</label>
                  <input type="tel" id="ckTelefone" name="telefone" required placeholder="(11) 99999-9999" maxlength="15">
                  <span class="form-error">Telefone invalido</span>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="ckCpf">CPF</label>
                <input type="text" id="ckCpf" name="cpf" required placeholder="000.000.000-00" maxlength="14">
                <span class="form-error">CPF invalido</span>
              </div>
            </div>

            <div class="checkout-section">
              <h3 class="checkout-section-title">Endereco de Entrega</h3>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="ckCep">CEP</label>
                  <input type="text" id="ckCep" name="cep" required placeholder="00000-000" maxlength="9">
                  <span class="form-error">CEP invalido</span>
                </div>
                <div class="form-group">
                  <label class="form-label" for="ckCidade">Cidade</label>
                  <input type="text" id="ckCidade" name="cidade" required placeholder="Sua cidade">
                  <span class="form-error">Preencha a cidade</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="ckRua">Rua / Logradouro</label>
                  <input type="text" id="ckRua" name="rua" required placeholder="Rua, Avenida...">
                  <span class="form-error">Preencha o endereco</span>
                </div>
                <div class="form-group">
                  <label class="form-label" for="ckNumero">Numero</label>
                  <input type="text" id="ckNumero" name="numero" required placeholder="123">
                  <span class="form-error">Preencha o numero</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="ckComplemento">Complemento</label>
                  <input type="text" id="ckComplemento" name="complemento" placeholder="Apto, Bloco...">
                </div>
                <div class="form-group">
                  <label class="form-label" for="ckEstado">Estado</label>
                  <select id="ckEstado" name="estado" required>
                    <option value="">Selecione</option>
                    <option value="AC">AC</option><option value="AL">AL</option><option value="AP">AP</option>
                    <option value="AM">AM</option><option value="BA">BA</option><option value="CE">CE</option>
                    <option value="DF">DF</option><option value="ES">ES</option><option value="GO">GO</option>
                    <option value="MA">MA</option><option value="MT">MT</option><option value="MS">MS</option>
                    <option value="MG">MG</option><option value="PA">PA</option><option value="PB">PB</option>
                    <option value="PR">PR</option><option value="PE">PE</option><option value="PI">PI</option>
                    <option value="RJ">RJ</option><option value="RN">RN</option><option value="RS">RS</option>
                    <option value="RO">RO</option><option value="RR">RR</option><option value="SC">SC</option>
                    <option value="SP">SP</option><option value="SE">SE</option><option value="TO">TO</option>
                  </select>
                  <span class="form-error">Selecione o estado</span>
                </div>
              </div>
              <div id="freteBox" style="margin-top:12px;padding:12px;background:#f8f9fa;border-radius:10px;display:none">
                <div style="display:flex;justify-content:space-between;align-items:center"><strong>Frete para <span id="freteCepLabel"></span></strong><button type="button" class="btn-ghost" style="font-size:.8rem" onclick="Componentes.calcularFrete()">Recalcular</button></div>
                <div id="freteOpcoes" style="margin-top:8px"></div>
                <small id="freteCubagem" style="color:#666"></small>
              </div>
            </div>
          </form>
        </div>
        <div class="panel-footer">
          <div class="cart-summary-row" style="font-size:.9rem"><span>Subtotal</span><span id="checkoutSubtotal">R$ 0,00</span></div>
          <div class="cart-summary-row" style="font-size:.9rem"><span>Frete</span><span id="checkoutFrete">—</span></div>
          <div class="cart-summary-row total mb-2">
            <span>Total</span>
            <span id="checkoutTotal">R$ 0,00</span>
          </div>
          <button class="btn btn-primary btn-block" onclick="document.getElementById('checkoutForm').requestSubmit()">
            Confirmar Pedido
          </button>
        </div>
      </div>
    `;
  },

  // ======================== SUCCESS MODAL ========================

  renderizarModalSucesso() {
    return `
      <div class="modal-overlay" id="modalSucesso">
        <div class="modal">
          <div class="modal-body">
            <div class="modal-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--verde-lacoste)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h2 class="modal-title">Pedido Realizado!</h2>
            <p class="modal-text" id="modalPedidoMsg">
              Seu pedido foi realizado com sucesso. Voce recebera um email com os detalhes.
            </p>
            <div class="modal-actions">
              <button class="btn btn-primary btn-block" onclick="Componentes.fecharModalSucesso()">
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ======================== PANEL LOGIC ========================

  _currentPanel: null,

  _openPanel(panelId) {
    this._closeCurrentPanel();
    const panel = document.getElementById(panelId);
    const overlay = document.getElementById('overlay');
    if (panel) {
      panel.classList.add('ativo');
      panel.setAttribute('aria-hidden', 'false');
      if (overlay) overlay.classList.add('ativo');
      document.body.classList.add('panel-open');
      this._currentPanel = panelId;
    }
  },

  _closeCurrentPanel() {
    if (this._currentPanel) {
      const panel = document.getElementById(this._currentPanel);
      const overlay = document.getElementById('overlay');
      if (panel) {
        panel.classList.remove('ativo');
        panel.setAttribute('aria-hidden', 'true');
      }
      if (overlay) overlay.classList.remove('ativo');
      document.body.classList.remove('panel-open');
      this._currentPanel = null;
    }
  },

  abrirSacola() {
    const menu = document.getElementById('mobileMenu');
    if (menu && menu.classList.contains('ativo')) {
      this.toggleMobileMenu();
    }
    this.renderizarItensSacola();
    this._openPanel('sacolaPanel');
  },

  fecharSacola() {
    this._closeCurrentPanel();
  },

  async abrirCheckout() {
    if(!api.isLoggedIn()){ window.location.href='/pages/login.html'; Componentes.toast("Faça login para comprar",'error'); return; }
    const user=api.getUser();
    let cliente=null;
    // 1) tenta vínculo direto email==username
    if(user.username && user.username.includes('@')){
      try{ cliente=await api.getClienteByEmail(user.username).catch(()=>null); }catch(_){}
    }
    // 2) fallback: cliente vinculado salvo em conta.html
    if(!cliente){
      try{
        const raw=sessionStorage.getItem(`cliente_vinculado_${user.username}`) || localStorage.getItem(`cliente_vinculado_${user.username}`);
        if(raw){ const j=JSON.parse(raw); if(j?.email) cliente=await api.getClienteByEmail(j.email).catch(()=>null); }
      }catch(_){}
    }
    // 3) último fallback: busca todos e pega o que tem email igual ao username ou nome
    if(!cliente){
      try{
        const all=await api.getClientes({limit:100}).catch(()=>null);
        const lista=all?.clientes||[];
        cliente=lista.find(c=> c.email===user.username) || lista.find(c=> c.email && user.username && c.email.toLowerCase()===user.username.toLowerCase()) || null;
      }catch(_){}
    }
    if(!cliente || !cliente.nome || !cliente.telefone || !cliente.cpf){
      this.toast("Cadastre seus dados pessoas em 'Minha Conta' para realizar a compra",'error');
      setTimeout(()=> window.location.href='/pages/conta.html', 900);
      return;
    }
    this._openPanel('checkoutPanel');
    this.atualizarTotalCheckout();
    this.aplicarMascarasCheckout();
    // preenche e trava campos pessoais (persistência no banco)
    const map={ckNome:cliente.nome, ckEmail:cliente.email||user.username, ckTelefone:cliente.telefone, ckCpf:cliente.cpf};
    Object.entries(map).forEach(([id,val])=>{
      const el=document.getElementById(id);
      if(el){ el.value=val||''; el.readOnly=true; el.style.background='var(--cinza-100)'; el.style.cursor='not-allowed'; }
    });
    // nota visual: dados pessoais vem da conta
    const sec=document.querySelector('#checkoutPanel .checkout-section');
    if(sec && !sec.querySelector('.aviso-conta')){
      sec.insertAdjacentHTML('afterbegin','<div class="aviso-conta" style="background:#e6f4ea;border:1px solid #c8e6c9;border-radius:8px;padding:8px 10px;font-size:.82rem;margin-bottom:10px">Dados pessoais preenchidos da sua <a href="/pages/conta.html" style="text-decoration:underline">Minha Conta</a> • edite lá se precisar</div>');
    }
  },

  fecharCheckout() {
    this._closeCurrentPanel();
  },

  voltarSacola() {
    const checkout = document.getElementById('checkoutPanel');
    if (checkout) checkout.classList.remove('ativo');
    this._currentPanel = 'sacolaPanel';
    const sacola = document.getElementById('sacolaPanel');
    if (sacola) sacola.classList.add('ativo');
  },

  renderizarItensSacola() {
    const container = document.getElementById('sacolaItens');
    const footer = document.getElementById('sacolaFooter');
    const itens = Carrinho.getArrayItens();

    if (itens.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--cinza-300)" stroke-width="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <h3 class="empty-state-title">Sua sacola esta vazia</h3>
          <p class="empty-state-text">Adicione produtos para comecar</p>
          <a href="/pages/loja.html" class="btn btn-primary">Ver Produtos</a>
        </div>
      `;
      footer.style.display = 'none';
      return;
    }

    footer.style.display = 'block';

    container.innerHTML = itens.map(item => `
      <div class="cart-item" data-key="${item.chave}">
        <div class="cart-item-img">
          ${item.imagem ? `<img src="${item.imagem}" alt="${item.nome}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-md)">` : `<span class="placeholder-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cinza-300)" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></span>`}
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.nome}</div>
          <div class="cart-item-meta">${item.tamanho ? `Tam: ${item.tamanho}` : ''}</div>
          <div class="cart-item-bottom">
            <div class="qty-control">
              <button class="qty-btn" onclick="Componentes.alterarQtd('${item.chave}', ${item.quantidade - 1})">&minus;</button>
              <span class="qty-value">${item.quantidade}</span>
              <button class="qty-btn" onclick="Componentes.alterarQtd('${item.chave}', ${item.quantidade + 1})">+</button>
            </div>
            <span class="cart-item-price">${api.formatarMoeda(item.preco * item.quantidade)}</span>
          </div>
          <button class="cart-item-remove" onclick="Componentes.removerItem('${item.chave}')">Remover</button>
        </div>
      </div>
    `).join('');

    const sub = Carrinho.subtotal();
    document.getElementById('sacolaSubtotal').textContent = api.formatarMoeda(sub);
    document.getElementById('sacolaTotal').textContent = api.formatarMoeda(sub);
  },

  alterarQtd(chave, novaQtd) {
    Carrinho.alterarQuantidade(chave, novaQtd);
    this.renderizarItensSacola();
    this.atualizarContador();
  },

  removerItem(chave) {
    Carrinho.remover(chave);
    this.renderizarItensSacola();
    this.atualizarContador();
    this.atualizarBotoesProduto();
  },

  atualizarContador() {
    const total = Carrinho.totalItens();
    ['cartCounter', 'cartCounterMobile'].forEach(id => {
      const counter = document.getElementById(id);
      if (!counter) return;
      if (total > 0) {
        counter.textContent = total;
        counter.style.display = 'inline-flex';
      } else {
        counter.style.display = 'none';
      }
    });
  },

  atualizarBotoesProduto() {
    document.querySelectorAll('[data-produto-id]').forEach(btn => {
      const id = parseInt(btn.dataset.produtoId);
      if (Carrinho.temItem(id)) {
        btn.classList.add('adicionado');
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg> Adicionado`;
      } else {
        btn.classList.remove('adicionado');
        btn.innerHTML = `+ Sacola`;
      }
    });
  },

  _freteValor: 0,
  _entregaTipo: null,
  _freteOpcoes: null,
  atualizarTotalCheckout() {
    const sub = Carrinho.subtotal();
    const freteEl = document.getElementById('checkoutFrete');
    const subEl = document.getElementById('checkoutSubtotal');
    const totalEl = document.getElementById('checkoutTotal');
    if (subEl) subEl.textContent = api.formatarMoeda(sub);
    if (freteEl) freteEl.textContent = this._freteValor ? api.formatarMoeda(this._freteValor) : '—';
    if (totalEl) totalEl.textContent = api.formatarMoeda(sub + (this._freteValor||0));
  },
  async calcularFrete(){
    const cep = document.getElementById('ckCep')?.value.replace(/\D/g,'');
    if(!cep||cep.length!==8){ Componentes.toast('Informe um CEP válido com 8 dígitos','error'); return; }
    const box=document.getElementById('freteBox'), opcoesEl=document.getElementById('freteOpcoes'), label=document.getElementById('freteCepLabel');
    if(label) label.textContent=cep.replace(/(\d{5})(\d{3})/,'$1-$2');
    if(box) box.style.display='block';
    this._freteValor=0;
    this._freteOpcoes=[];
    this.atualizarTotalCheckout();
    const cubagemEl=document.getElementById('freteCubagem');
    if(cubagemEl) cubagemEl.textContent='';
    if(opcoesEl) opcoesEl.innerHTML='<small>Calculando opções de entrega...</small>';
    try{
      const itens=Carrinho.getArrayItens().map(i=>({peso_gramas:500, comprimento:20,largura:15,altura:10,quantidade:i.quantidade}));
      const res=await api.calcularFrete({cepDestino:cep, itens});
      this._freteOpcoes=res.opcoes||[];
      if(cubagemEl && !res.entregaLocal){
        const cub = res.pesoCubadoKg||((20*15*10)/6000);
        cubagemEl.textContent=`Peso real ${res.pesoReal||'—'}g • Cubado ${cub}kg • Taxável ${res.pesoTaxavel||'—'}g ${res.mock?'• (simulação, sem credencial)':''}`;
      }
      if(opcoesEl){
        opcoesEl.innerHTML=this._freteOpcoes.map((o,i)=>`<label style="display:flex;justify-content:space-between;align-items:center;padding:8px;border:1px solid ${this._freteValor===o.valor?'#111':'#eee'};border-radius:8px;margin:6px 0;cursor:pointer;background:${this._freteValor===o.valor?'#f5f5f5':''}"><span><input type="radio" name="frete" value="${o.valor}" ${this._freteValor===o.valor?'checked':''} onchange="Componentes.selecionarFrete(${o.valor}, '${o.servico.replace(/'/g,"\\'")}')" style="margin-right:8px"><strong>${o.servico}</strong>${o.prazo ? ' • '+o.prazo+' dias' : ''}${o.obs ? '<small style="display:block;color:#666;margin-left:22px">'+o.obs+'</small>' : ''}</span><strong>${o.valor === 0 && o.coProduto === 'UBER' ? 'A combinar' : api.formatarMoeda(o.valor)}</strong></label>`).join('');
        if(!this._freteValor && this._freteOpcoes[0]) this.selecionarFrete(this._freteOpcoes[0].valor, this._freteOpcoes[0].servico);
      }
    }catch(e){ if(opcoesEl) opcoesEl.innerHTML=`<span style="color:#c5221f">Erro: ${e.message}</span>`;}
  },
  selecionarFrete(val, servico){ this._freteValor=parseFloat(val); if(servico) this._entregaTipo=servico; this.atualizarTotalCheckout(); },

  // ======================== PAYMENT ========================

  // ======================== MASKS ========================

  aplicarMascarasCheckout() {
    this._mascaraTelefone('ckTelefone');
    this._mascaraCPF('ckCpf');
    this._mascaraCEP('ckCep');
    const cepEl=document.getElementById('ckCep');
    if(cepEl && !cepEl._cepListener){
      cepEl._cepListener=true;
      cepEl.addEventListener('blur', async ()=>{
        const d=cepEl.value.replace(/\D/g,'');
        if(d.length!==8) return;
        await this.localizarEnderecoPorCep(d);
        this.calcularFrete();
      });
    }
  },

  async localizarEnderecoPorCep(cep) {
    const cepEl=document.getElementById('ckCep');
    const ruaEl=document.getElementById('ckRua');
    const cidadeEl=document.getElementById('ckCidade');
    const estadoEl=document.getElementById('ckEstado');
    const numeroEl=document.getElementById('ckNumero');
    if(!cepEl || !ruaEl || !cidadeEl || !estadoEl) return;
    const cepConsultado=String(cep).replace(/\D/g,'');
    cepEl.setAttribute('aria-busy','true');
    try {
      const endereco=await api.consultarCep(cepConsultado);
      // Ignora uma resposta antiga caso o usuário tenha alterado o CEP.
      if(cepEl.value.replace(/\D/g,'')!==cepConsultado) return;
      ruaEl.value=endereco.rua || '';
      cidadeEl.value=endereco.cidade || '';
      estadoEl.value=endereco.estado || '';
      if(endereco.rua || endereco.cidade) this.toast('Endereço preenchido pelo CEP.', 'success');
      if(numeroEl) numeroEl.focus();
    } catch(err) {
      if(cepEl.value.replace(/\D/g,'')===cepConsultado) this.toast(err.message, 'error');
    } finally {
      cepEl.removeAttribute('aria-busy');
    }
  },

  _mascaraTelefone(id) {
    const el = document.getElementById(id);
    if (!el || el._mascaraAplicada) return;
    el._mascaraAplicada = true;
    el.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
      else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
      else if (v.length > 0) v = `(${v}`;
      e.target.value = v;
    });
  },

  _mascaraCPF(id) {
    const el = document.getElementById(id);
    if (!el || el._mascaraAplicada) return;
    el._mascaraAplicada = true;
    el.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      e.target.value = v;
    });
  },

  _mascaraCEP(id) {
    const el = document.getElementById(id);
    if (!el || el._mascaraAplicada) return;
    el._mascaraAplicada = true;
    el.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 8);
      if (v.length > 5) v = `${v.slice(0,5)}-${v.slice(5)}`;
      e.target.value = v;
    });
  },

  // ======================== VALIDATION ========================

  validarCheckout() {
    let valido = true;
    const form = document.getElementById('checkoutForm');
    const campos = form.querySelectorAll('[required]');

    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

    campos.forEach(campo => {
      const grupo = campo.closest('.form-group');
      let campoValido = true;

      if (!campo.value.trim()) {
        campoValido = false;
      } else if (campo.name === 'email' || campo.type === 'email') {
        campoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value);
      } else if (campo.name === 'telefone') {
        const digits = campo.value.replace(/\D/g, '');
        campoValido = digits.length >= 10;
      } else if (campo.name === 'cpf') {
        const digits = campo.value.replace(/\D/g, '');
        campoValido = digits.length === 11;
      } else if (campo.name === 'cep') {
        const digits = campo.value.replace(/\D/g, '');
        campoValido = digits.length === 8;
      }

      if (!campoValido && grupo) {
        grupo.classList.add('error');
        valido = false;
      }
    });

    return valido;
  },

  // ======================== SUBMIT ========================

  async finalizarCompra(e) {
    e.preventDefault();
    if (!this.validarCheckout()) return;
    const userV=api.getUser();
    if(!userV || !userV.username){ this.toast("Faça login para comprar",'error'); window.location.href='/pages/login.html'; return; }
    let clienteVinculado=null;
    if(userV.username.includes('@')){
      try{ clienteVinculado=await api.getClienteByEmail(userV.username); }catch(_){}
    }
    if(!clienteVinculado || !clienteVinculado.nome || !clienteVinculado.telefone || !clienteVinculado.cpf){
      this.toast("Cadastre seus dados pessoas em 'Minha Conta' para realizar a compra",'error');
      setTimeout(()=> window.location.href='/pages/conta.html', 900);
      return;
    }
    const btn = e.target.querySelector('[type="submit"], .btn-primary');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Processando...';
    }

    try {
      const itens = Carrinho.getArrayItens();
      if (itens.length === 0) {
        throw new Error('Adicione itens ao carrinho');
      }

      // dados pessoais vêm do cliente vinculado (auto-fill), somente endereço é digitado
      const nome = clienteVinculado.nome;
      const email = clienteVinculado.email || userV.username;
      const telefone = clienteVinculado.telefone;
      const cpf = clienteVinculado.cpf;
      const rua = document.getElementById('ckRua').value.trim();
      const numero = document.getElementById('ckNumero').value.trim();
      const complemento = document.getElementById('ckComplemento').value.trim();
      const cidade = document.getElementById('ckCidade').value.trim();
      const estado = document.getElementById('ckEstado').value;
      const cep = document.getElementById('ckCep').value.trim();

      const endereco = `${rua}, ${numero}${complemento ? ' - ' + complemento : ''}, ${cidade} - ${estado}, CEP: ${cep}`;

      const clienteId = clienteVinculado.id;

      const valorTotal = Carrinho.subtotal() + (this._freteValor||0);
      const entrega_tipo = this._entregaTipo || (cep.replace(/\D/g,'').startsWith('70') ? 'Retirada no local' : 'Correios');

      const pedido = await api.createPedido({
        cliente_id: clienteId,
        status: 'pendente',
        endereco_entrega: endereco,
        valor_total: valorTotal,
        entrega_tipo,
      });

      for (const item of itens) {
        const payload = {
          pedido_id: pedido.id,
          produto_id: item.produto_id,
          quantidade: item.quantidade,
          preco_unitario: item.preco,
        };
        if (item.tamanho) payload.tamanho = item.tamanho;
        await api.createItemPedido(payload);
      }

      this.fecharCheckout();
      this.fecharSacola();

      try {
        const pagamento = await api.criarPreferencia(pedido.id);
        if (pagamento && pagamento.init_point) {
          Carrinho.limpar();
          this.atualizarContador();
          try{ localStorage.setItem('ultimo_pedido', JSON.stringify({id:pedido.id, id_pedido:pedido.id_pedido, valor_total:valorTotal, entrega_tipo, endereco_entrega:endereco})); }catch(_){}
          window.location.href = pagamento.init_point;
          return;
        }
        Carrinho.limpar();
        this.atualizarContador();
        try{ localStorage.setItem('ultimo_pedido', JSON.stringify({id:pedido.id, id_pedido:pedido.id_pedido, valor_total:valorTotal, entrega_tipo, endereco_entrega:endereco})); }catch(_){}
        this.mostrarModalAguardando(pedido);
      } catch (err) {
        Carrinho.limpar();
        this.atualizarContador();
        this.toast('Nao foi possivel gerar o pagamento: ' + err.message + '. Seu pedido fica aguardando pagamento.', 'error');
        try{ localStorage.setItem('ultimo_pedido', JSON.stringify({id:pedido.id, valor_total:valorTotal, entrega_tipo, endereco_entrega:endereco})); }catch(_){}
        this.mostrarModalAguardando(pedido);
      }

    } catch (err) {
      this.toast(err.message, 'error');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Confirmar Pedido';
      }
    }
  },

  mostrarModalSucesso(pedido) {
    const modal = document.getElementById('modalSucesso');
    const msg = document.getElementById('modalPedidoMsg');
    const idp = pedido.id_pedido || '#'+pedido.id;
    const valor = api.formatarMoeda(pedido.valor_total);
    const tipo = pedido.entrega_tipo || '';
    const endereco = pedido.endereco_entrega || '';
    // busca nome para whatsapp (cliente vinculado)
    let nomeWpp=''; try{ const u=api.getUser(); if(u?.username){ const c=JSON.parse(sessionStorage.getItem(`cliente_vinculado_${u.username}`)||'null'); nomeWpp=c?.nome||''; } }catch(_){}
    if(!nomeWpp) nomeWpp= document.getElementById('ckNome')?.value || '';
    const tel = window.VENDEDOR_WHATSAPP || '5561999999999';
    let extra='';
    if(tipo.includes('Uber')){
      const wppMsg=`Olá! Meu pedido ${idp} é Entrega via Uber. Meu nome é ${nomeWpp}, meu endereço é ${endereco}, tipo: ${tipo}. Pedido: ${idp}`;
      extra=`<div style="margin-top:14px"><a href="https://wa.me/${tel}?text=${encodeURIComponent(wppMsg)}" target="_blank" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:6px;background:#25D366;border-color:#25D366">Falar no WhatsApp - Uber</a><div style="font-size:.82rem;color:#666;margin-top:6px">Pedido ${idp} • ${tipo}</div></div>`;
    }else if(tipo.includes('Retirada')){
      const wppMsg=`Olá! Meu pedido ${idp} é Retirada na loja. Meu nome é ${nomeWpp}. Poderia me enviar o endereço da loja? Pedido: ${idp}`;
      extra=`<div style="margin-top:14px"><a href="https://wa.me/${tel}?text=${encodeURIComponent(wppMsg)}" target="_blank" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:6px;background:#25D366;border-color:#25D366">Solicitar endereço no WhatsApp</a><div style="font-size:.82rem;color:#666;margin-top:6px">Pedido ${idp} • ${tipo}</div></div>`;
    }else{
      extra=`<div style="margin-top:14px"><a href="/pages/minhas-compras.html" class="btn btn-primary">Acompanhar em Minhas Compras</a><div style="font-size:.82rem;color:#666;margin-top:6px">Pedido ${idp} • ${tipo||'Correios'} • Entrega para todo o Brasil</div></div>`;
    }
    if (msg) {
      msg.innerHTML = `
        Seu pedido <strong>${idp}</strong> foi realizado com sucesso!<br>
        Valor total: <strong>${valor}</strong><br>
        ${extra}
      `;
    }
    if (modal) {
      modal.classList.add('ativo');
      document.body.classList.add('modal-open');
    }
  },

  fecharModalSucesso() {
    const modal = document.getElementById('modalSucesso');
    if (modal) {
      modal.classList.remove('ativo');
      document.body.classList.remove('modal-open');
    }
  },

  // Pagamento ainda NAO foi confirmado:
  // nao mostra protocolo do pedido nem mensagem de sucesso.
  mostrarModalAguardando(pedido) {
    const modal = document.getElementById('modalSucesso');
    const msg = document.getElementById('modalPedidoMsg');
    if (msg) {
      msg.innerHTML = `
        Seu pedido esta <strong>aguardando o pagamento</strong>.<br>
        <span style="color:var(--cinza-500)">Status: <strong>pendente</strong></span><br>
        Assim que o pagamento for confirmado, voce recebera a confirmacao por email.
      `;
    }
    if (modal) {
      modal.classList.add('ativo');
      document.body.classList.add('modal-open');
    }
  },

  // ======================== TOAST ========================

  toast(mensagem, tipo = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.textContent = mensagem;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('ativo'));
    setTimeout(() => {
      toast.classList.remove('ativo');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  },

  // ======================== AUTH ========================

  logout() {
    api.clearToken();
    Carrinho.limpar();
    this.atualizarContador();
    window.location.href = '/pages/login.html';
  },

  toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const isOpen = menu.classList.contains('ativo');
    menu.classList.toggle('ativo');
    document.body.classList.toggle('mobile-menu-open', !isOpen);
  },

  // ======================== DETALHE DO PRODUTO (LOJA + HOME) ========================
  // Modal compartilhado entre a loja e a home: ao clicar num produto abre aqui.

  _produtoDetalhe: null,
  _qtdDetalhe: 1,
  _tamanhoDetalhe: null,

  renderizarModalDetalhe() {
    return `
      <div class="modal-overlay" id="detailModalOverlay" onclick="Componentes.fecharDetalhe(event)">
        <div class="modal" style="max-width:720px;border-radius:var(--radius-xl);overflow:hidden" onclick="event.stopPropagation()">
          <div class="detail-modal-body">
            <div class="detail-img" id="detailImg">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--cinza-300)" stroke-width="1">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </div>
            <div class="detail-info">
              <span class="detail-tag" id="detailTag"></span>
              <h2 class="detail-name" id="detailName"></h2>
              <p class="detail-price" id="detailPrice"></p>
              <div class="detail-specs">
                <div class="detail-spec-row">
                  <span class="detail-spec-label">Tamanho</span>
                  <span class="detail-spec-value" id="detailSizes"></span>
                </div>
                <div class="detail-spec-row">
                  <span class="detail-spec-label">Estoque</span>
                  <span class="detail-spec-value" id="detailStock"></span>
                </div>
                <div class="detail-spec-row">
                  <span class="detail-spec-label">ID</span>
                  <span class="detail-spec-value" id="detailId"></span>
                </div>
              </div>
              <div class="size-selector" id="sizeSelector"></div>
              <div class="detail-qty">
                <span class="detail-qty-label">Quantidade:</span>
                <div class="qty-control">
                  <button class="qty-btn" onclick="Componentes.alterarQtdDetalhe(-1)">&minus;</button>
                  <span class="qty-value" id="detailQtd">1</span>
                  <button class="qty-btn" onclick="Componentes.alterarQtdDetalhe(1)">+</button>
                </div>
              </div>
              <div class="detail-actions">
                <button class="btn btn-primary btn-block" id="detailAddBtn" onclick="Componentes.adicionarDetalhe()">
                  Adicionar a Sacola
                </button>
                <button class="btn btn-ghost btn-block" onclick="Componentes.fecharDetalhe()">
                  Continuar Explorando
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  _getTamanhos(p) {
    if (p.tamanhos && p.tamanhos.length) return p.tamanhos;
    return p.tamanho ? [{ tamanho: p.tamanho, stock: p.stock }] : [];
  },

  abrirDetalhe(id, produtos) {
    const p = produtos.find(x => x.id === id);
    if (!p) return;
    this._produtoDetalhe = p;
    this._qtdDetalhe = 1;
    this._tamanhoDetalhe = null;

    // Garante que o overlay do modal detalhe exista nesta pagina
    let overlay = document.getElementById('detailModalOverlay');
    if (!overlay) {
      const holder = document.getElementById('modalDetalhe') || document.getElementById('modal');
      if (holder) holder.innerHTML = this.renderizarModalDetalhe();
      overlay = document.getElementById('detailModalOverlay');
      if (!overlay) return;
    }

    const tamanhos = this._getTamanhos(p);
    const temPromo = p.preco_promocional != null && p.preco_promocional < p.preco;

    document.getElementById('detailName').textContent = p.nome;
    document.getElementById('detailPrice').innerHTML = temPromo
      ? `<span class="preco-promo detail-preco-promo">${api.formatarMoeda(p.preco_promocional)}</span> <span class="preco-riscado detail-preco-riscado">${api.formatarMoeda(p.preco)}</span>`
      : api.formatarMoeda(p.preco);
    document.getElementById('detailSizes').textContent = tamanhos.length ? tamanhos.map(t => t.tamanho).join(', ') : '—';
    document.getElementById('detailStock').textContent = p.stock > 0 ? `${p.stock} unidades` : 'Esgotado';
    document.getElementById('detailId').textContent = `#${p.id}`;
    document.getElementById('detailQtd').textContent = '1';
    document.getElementById('detailTag').textContent = temPromo ? 'Promocao' : 'Produto';

    this._renderSizeSelector(tamanhos);

    const imagens = (p.imagens && p.imagens.length) ? p.imagens : (p.imagem ? [p.imagem] : []);
    this._renderImagensCarousel(imagens, p.nome);

    overlay.classList.add('ativo');
    document.body.classList.add('modal-open');
  },

  _renderImagensCarousel(imagens, nome) {
    const container = document.getElementById('detailImg');
    if (!container) return;
    this._carouselIndex = 0;
    this._carouselTotal = imagens.length;

    if (!imagens.length) {
      container.innerHTML = `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--cinza-300)" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`;
      return;
    }

    const slides = imagens.map(src =>
      `<div class="carousel-slide"><img src="${src}" alt="${nome}" loading="lazy"></div>`
    ).join('');

    const multi = imagens.length > 1;
    const dots = multi
      ? `<div class="carousel-dots">${imagens.map((_, i) => `<button type="button" class="carousel-dot ${i === 0 ? 'ativo' : ''}" data-i="${i}" onclick="Componentes._carouselVaiPara(${i})"></button>`).join('')}</div>`
      : '';

    container.innerHTML = `
      <div class="carousel-viewport" id="detailCarouselViewport">
        <div class="carousel-track">${slides}</div>
      </div>
      ${multi ? `
        <button type="button" class="carousel-arrow prev" onclick="Componentes._carouselMover(-1)">&#10094;</button>
        <button type="button" class="carousel-arrow next" onclick="Componentes._carouselMover(1)">&#10095;</button>
        ${dots}
      ` : ''}
    `;

    const viewport = container.querySelector('.carousel-viewport');
    this._carouselViewport = viewport;
    if (viewport) {
      viewport.addEventListener('scroll', () => {
        const slide = viewport.querySelector('.carousel-slide');
        if (!slide) return;
        const idx = Math.round(viewport.scrollLeft / slide.clientWidth);
        this._carouselIndex = idx;
        viewport.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('ativo', i === idx));
      });
    }
  },

  _carouselMover(dir) {
    const vp = this._carouselViewport;
    const slide = vp && vp.querySelector('.carousel-slide');
    if (!vp || !slide) return;
    vp.scrollBy({ left: dir * slide.clientWidth, behavior: 'smooth' });
  },

  _carouselVaiPara(i) {
    const vp = this._carouselViewport;
    const slide = vp && vp.querySelector('.carousel-slide');
    if (!vp || !slide) return;
    vp.scrollTo({ left: i * slide.clientWidth, behavior: 'smooth' });
  },

  _renderSizeSelector(tamanhos) {
    const container = document.getElementById('sizeSelector');
    if (!tamanhos.length) {
      container.innerHTML = '';
      return;
    }
    this._tamanhoDetalhe = null;
    container.innerHTML = `
      <span class="detail-spec-label">Escolha o tamanho:</span>
      <div class="size-options">
        ${tamanhos.map((t, i) => {
          const esgotado = t.stock <= 0;
          return `<button type="button" class="size-option ${esgotado ? 'esgotado' : ''} ${i === 0 ? 'ativo' : ''}" data-tamanho="${t.tamanho}" ${esgotado ? 'disabled' : ''} onclick="Componentes.selecionarTamanho('${t.tamanho}', this)">${t.tamanho}${esgotado ? '' : ` <small>${t.stock}</small>`}</button>`;
        }).join('')}
      </div>
    `;
    const primeiro = tamanhos.find(t => t.stock > 0);
    this._tamanhoDetalhe = primeiro ? primeiro.tamanho : (tamanhos[0]?.tamanho || null);
    this._atualizarBotaoDetalhe();
  },

  selecionarTamanho(tamanho, btn) {
    this._tamanhoDetalhe = tamanho;
    document.querySelectorAll('.size-option').forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');
    this._qtdDetalhe = 1;
    document.getElementById('detailQtd').textContent = '1';
    this._atualizarBotaoDetalhe();
  },

  _tamanhoStockAtual() {
    const p = this._produtoDetalhe;
    if (!p) return 0;
    const tam = this._getTamanhos(p).find(t => t.tamanho === this._tamanhoDetalhe);
    return tam ? (tam.stock || 0) : (p.stock || 0);
  },

  _atualizarBotaoDetalhe() {
    const btn = document.getElementById('detailAddBtn');
    if (!btn) return;
    const p = this._produtoDetalhe;
    const stock = this._tamanhoStockAtual();
    if (!p || p.stock <= 0 || !this._tamanhoDetalhe || stock <= 0) {
      btn.disabled = true;
      btn.textContent = 'Esgotado';
    } else {
      btn.disabled = false;
      btn.textContent = 'Adicionar a Sacola';
    }
  },

  fecharDetalhe(e) {
    if (e && e.target !== e.currentTarget) return;
    const overlay = document.getElementById('detailModalOverlay');
    if (overlay) overlay.classList.remove('ativo');
    document.body.classList.remove('modal-open');
    this._produtoDetalhe = null;
    this._tamanhoDetalhe = null;
  },

  alterarQtdDetalhe(delta) {
    const max = Math.max(1, this._tamanhoStockAtual());
    this._qtdDetalhe = Math.max(1, Math.min(this._qtdDetalhe + delta, max));
    document.getElementById('detailQtd').textContent = this._qtdDetalhe;
  },

  adicionarDetalhe() {
    if (!this._produtoDetalhe) return;
    const tamanho = this._tamanhoDetalhe || (this._getTamanhos(this._produtoDetalhe)[0]?.tamanho || '');
    for (let i = 0; i < this._qtdDetalhe; i++) {
      Carrinho.adicionar(this._produtoDetalhe, tamanho);
    }
    this.atualizarBotoesProduto();
    this.fecharDetalhe();
    this.abrirSacola();
  },

  // ======================== INIT ========================

  init() {
    this.atualizarContador();
    Carrinho.onMudar(() => this.atualizarContador());
    setTimeout(()=> this.verificarRetornoPagamento(), 800);
  },

  async verificarRetornoPagamento(){
    const raw = localStorage.getItem('ultimo_pedido'); 
    if (!raw) return;
    let ped; 
    try { ped = JSON.parse(raw); } catch { return; }
    const user = api.getUser(); 
    if (!user || !user.username || !user.username.includes('@')) return;
    const cli = await api.getClienteByEmail(user.username).catch(() => null); 
    if (!cli) return;

    const tentar = async () => {
      try {
        const data = await api.getPedidos({ cliente_id: cli.id, limit: 100 });
        const atualizado = (data.pedidos || []).find(p =>
          String(p.id) === String(ped.id) || (ped.id_pedido && p.id_pedido === ped.id_pedido)
        );
        if (!atualizado) return false;
        const st = (atualizado.status || '').toLowerCase();
        if (['pago', 'enviado', 'entregue'].includes(st)) {
          this.mostrarModalSucesso(atualizado);
          localStorage.removeItem('ultimo_pedido');
          return true;
        }
      } catch (_) { return false; }
      return false;
    };

    if (await tentar()) return;

    let tent = 0;
    const MAX_TENTATIVAS = 40; // 40 x 3s = 2 minutos (era 20 = 60s)
    const iv = setInterval(async () => {
      tent++;
      if (await tentar()) {
        clearInterval(iv);
        return;
      }
      if (tent > MAX_TENTATIVAS) {
        clearInterval(iv);
        this.toast('Ainda estamos confirmando seu pagamento. Você pode acompanhar em "Minhas Compras".', 'info');
        this._mostrarAvisoDemorado(ped);
      }
    }, 3000);
  },

  _mostrarAvisoDemorado(pedido) {
    const msg = document.getElementById('modalPedidoMsg');
    if (msg) {
      msg.innerHTML += `
        <div style="margin-top:14px;padding:10px;background:#fff3cd;border-radius:8px;font-size:.85rem">
          A confirmação está demorando mais que o esperado. Isso não significa que o pagamento falhou —
          assim que for confirmado você verá em <a href="/pages/minhas-compras.html">Minhas Compras</a>.
        </div>`;
    }
  },

  mostrarPixQR(pix, pedido){
    const modal=document.getElementById('modalSucesso'); const msg=document.getElementById('modalPedidoMsg');
    if(msg){
      msg.innerHTML=`
        <div style="text-align:center">
          <p>Escaneie o QR Code PIX para pagar <strong>${api.formatarMoeda(pix.valor||pedido.valor_total)}</strong> • Pedido <strong>${pedido.id_pedido||'#'+pedido.id}</strong></p>
          <img src="data:image/png;base64,${pix.qr_code_base64}" alt="QR PIX" style="max-width:260px;margin:12px auto;display:block;border:1px solid #eee;border-radius:12px">
          <p style="font-size:.82rem;color:#666;word-break:break-all">${pix.qr_code||''}</p>
          <p style="font-size:.82rem;color:#137333;margin-top:8px">Aguardando pagamento... assim que o PIX for confirmado o modal de sucesso aparecerá automaticamente.</p>
        </div>`;
    }
    if(modal){ modal.classList.add('ativo'); document.body.classList.add('modal-open'); }
    // poll já ativo via verificarRetornoPagamento
    let tent=0; const iv=setInterval(async()=>{
      tent++;
      const user=api.getUser(); if(!user||!user.username||!user.username.includes('@')){ clearInterval(iv); return; }
      const cli=await api.getClienteByEmail(user.username).catch(()=>null); if(!cli) return;
      const data=await api.getPedidos({cliente_id:cli.id, limit:100}).catch(()=>null); const atualizado=(data?.pedidos||[]).find(p=> String(p.id)===String(pedido.id));
      if(atualizado && ['pago','enviado','entregue'].includes((atualizado.status||'').toLowerCase())){ clearInterval(iv); this.mostrarModalSucesso(atualizado); localStorage.removeItem('ultimo_pedido'); }
      if(tent>40) clearInterval(iv);
    }, 3000);
  },
};
