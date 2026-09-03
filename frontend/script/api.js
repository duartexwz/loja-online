const API_BASE = (window.API_BASE_URL || '/api').replace(/\/$/, '');

const api = {
  // sessionStorage = por aba (permite 2 contas em 2 abas no mesmo navegador)
  _store: window.sessionStorage,
  getToken() {
    return this._store.getItem('access_token') || localStorage.getItem('access_token');
  },

  setToken(token) {
    this._store.setItem('access_token', token);
    // limpa legado localStorage para não vazar entre abas
    localStorage.removeItem('access_token');
  },

  clearToken() {
    this._store.removeItem('access_token');
    this._store.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  getUser() {
    const u = this._store.getItem('user') || localStorage.getItem('user');
    const user = u ? JSON.parse(u) : null;
    if (user) {
      try {
        const token = this.getToken();
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.acesso && user.acesso !== payload.acesso) {
            user.acesso = payload.acesso;
            this.setUser(user);
          }
        }
      } catch (_) {}
    }
    return user;
  },

  setUser(user) {
    this._store.setItem('user', JSON.stringify(user));
    localStorage.removeItem('user');
  },

  isLoggedIn() {
    return !!this.getToken();
  },

  async request(path, options = {}) {
    const url = `${API_BASE}${path}`;
    const headers = { ...options.headers };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (options.body && !(options.body instanceof FormData)) {
      if (!headers['Content-Type'] && !(options.body instanceof URLSearchParams)) {
        headers['Content-Type'] = 'application/json';
      }
    }

    try {
      const res = await fetch(url, { ...options, headers });

      if (res.status === 401 && !path.includes('/login')) {
        this.clearToken();
        window.location.href = '/pages/login.html';
        throw new Error('Sessao expirada. Faca login novamente.');
      }

      const data = await res.json();

      if (!res.ok) {
        const msg = data?.detail?.[0]?.msg || data?.message || data?.detail || 'Erro na requisicao';
        throw new Error(msg);
      }

      return data;
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        throw new Error('Erro de conexao com o servidor.');
      }
      throw err;
    }
  },

  // ======================== AUTH ========================

  async login(username, password) {
    const body = new URLSearchParams({ username, password });
    const data = await this.request('/login/', {
      method: 'POST',
      body,
    });
    this.setToken(data.access_token);

    let acesso = 'comum';
    try {
      const payload = JSON.parse(atob(data.access_token.split('.')[1]));
      if (payload.acesso) acesso = payload.acesso;
    } catch (_) {}

    this.setUser({ username, acesso });
    return data;
  },

  async refreshLogin() {
    return this.request('/login/refresh_login', { method: 'POST' });
  },

  // ======================== USUARIOS ========================

  async createUsuario({ username, password, acesso, nome_completo }) {
    return this.request('/usuarios/', {
      method: 'POST',
      body: JSON.stringify({ username, password, acesso, nome_completo }),
    });
  },

  async getUsuarios(params = {}) {
    const query = this.buildQuery(params);
    return this.request(`/usuarios/${query}`);
  },

  async updateUsuario(usuario_id, data) {
    return this.request(`/usuarios/${usuario_id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async deleteUsuario(usuario_id) {
    return this.request(`/usuarios/${usuario_id}`, { method: 'DELETE' });
  },

  // ======================== PRODUTOS ========================

  async createProduto(data) {
    return this.request('/produtos/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getProdutos(params = {}) {
    const query = this.buildQuery(params);
    return this.request(`/produtos/${query}`);
  },

  async getProduto(id) {
    const data = await this.getProdutos({});
    return data.produtos.find(p => p.id === id);
  },

  async updateProduto(produto_id, data) {
    return this.request(`/produtos/${produto_id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async deleteProduto(produto_id) {
    return this.request(`/produtos/${produto_id}`, { method: 'DELETE' });
  },

  // ======================== CLIENTES ========================

  async createCliente(data) {
    return this.request('/clientes/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getClientes(params = {}) {
    const query = this.buildQuery(params);
    return this.request(`/clientes/${query}`);
  },

  async getClienteByEmail(email) {
    const data = await this.getClientes({ email });
    return data.clientes?.[0] || null;
  },

  async updateCliente(cliente_id, data) {
    return this.request(`/clientes/${cliente_id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async deleteCliente(cliente_id) {
    return this.request(`/clientes/${cliente_id}`, { method: 'DELETE' });
  },

  // ======================== PEDIDOS ========================

  async createPedido(data) {
    return this.request('/pedidos/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getPedidos(params = {}) {
    const query = this.buildQuery(params);
    return this.request(`/pedidos/${query}`);
  },

  async getMeusPedidos() {
    return this.request('/pedidos/meus');
  },

  async updatePedido(id_pedido, data) {
    return this.request(`/pedidos/${id_pedido}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async deletePedido(id_pedido) {
    return this.request(`/pedidos/${id_pedido}`, { method: 'DELETE' });
  },

  // ======================== ITENS PEDIDO ========================

  async createItemPedido(data) {
    return this.request('/itens_pedido/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getItensPedido(params = {}) {
    const query = this.buildQuery(params);
    return this.request(`/itens_pedido/${query}`);
  },

  async updateItemPedido(item_pedido_id, data) {
    return this.request(`/itens_pedido/${item_pedido_id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async deleteItemPedido(item_pedido_id) {
    return this.request(`/itens_pedido/${item_pedido_id}`, { method: 'DELETE' });
  },

  // ======================== WEBHOOK / PAGAMENTO ========================

  async criarPreferencia(pedido_id) {
    return this.request(`/webhook/criar-preferencia?pedido_id=${pedido_id}`, {
      method: 'POST',
    });
  },

  async rastrear(codigo) {
    return this.request(`/rastreio/${codigo}`);
  },
  async calcularFrete(data) {
    return this.request('/frete/calcular', { method: 'POST', body: JSON.stringify(data) });
  },
  async consultarCep(cep) {
    const numeros = String(cep).replace(/\D/g, '');
    return this.request(`/endereco/cep/${numeros}`);
  },

  // ======================== PASSWORD RESET ========================

  async esqueciSenha(email) {
    return this.request('/login/esqueci-senha', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async redefinirSenha(token, nova_senha) {
    return this.request('/login/redefinir-senha', {
      method: 'POST',
      body: JSON.stringify({ token, nova_senha }),
    });
  },

  // ======================== UPLOAD ========================

  async uploadImagem(file) {
    const formData = new FormData();
    formData.append('file', file);

    return this.request('/upload/imagem', {
      method: 'POST',
      body: formData,
    });
  },

  // ======================== ADMIN ========================

  async createAdmin({ username, password, nome_completo }) {
    return this.request('/admins/', {
      method: 'POST',
      body: JSON.stringify({ username, password, nome_completo }),
    });
  },

  async getAdmins(params = {}) {
    const query = this.buildQuery(params);
    return this.request(`/admins/${query}`);
  },

  async updateAdmin(admin_id, data) {
    return this.request(`/admins/${admin_id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async deleteAdmin(admin_id) {
    return this.request(`/admins/${admin_id}`, { method: 'DELETE' });
  },

  // ======================== HELPERS ========================

  buildQuery(params) {
    const entries = Object.entries(params).filter(([, v]) => v !== null && v !== undefined && v !== '');
    if (entries.length === 0) return '';
    return '?' + new URLSearchParams(entries).toString();
  },

  formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  },
};
