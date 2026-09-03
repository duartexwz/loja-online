const Carrinho = {
  _itens: {},
  _listeners: [],

  init() {
    const salvo = sessionStorage.getItem('carrinho') || localStorage.getItem('carrinho');
    if (salvo) {
      try {
        this._itens = JSON.parse(salvo);
        // migra para sessionStorage (por aba)
        sessionStorage.setItem('carrinho', JSON.stringify(this._itens));
        localStorage.removeItem('carrinho');
      } catch {
        this._itens = {};
      }
    }
  },

  _chave(produto, tamanho = '') {
    return `${String(produto.id)}::${tamanho || ''}`;
  },

  _salvar() {
    sessionStorage.setItem('carrinho', JSON.stringify(this._itens));
    this._notificar();
  },

  _notificar() {
    this._listeners.forEach(fn => fn(this._itens));
  },

  onMudar(fn) {
    this._itens = { ...this._itens };
    this._listeners.push(fn);
  },

  getItens() {
    return { ...this._itens };
  },

  getArrayItens() {
    return Object.entries(this._itens).map(([chave, item]) => ({
      produto_id: parseInt(chave.split('::')[0]),
      chave,
      ...item,
    }));
  },

  totalItens() {
    return Object.values(this._itens).reduce((sum, item) => sum + item.quantidade, 0);
  },

  subtotal() {
    return Object.values(this._itens).reduce(
      (sum, item) => sum + item.preco * item.quantidade, 0
    );
  },

  adicionar(produto, tamanho = '') {
    const chave = this._chave(produto, tamanho);
    if (this._itens[chave]) {
      const maxqtd = produto.tamanhos
        ? (produto.tamanhos.find(t => t.tamanho === tamanho)?.stock ?? produto.stock ?? 99)
        : (produto.stock ?? 99);
      this._itens[chave].quantidade = Math.min(this._itens[chave].quantidade + 1, maxqtd);
    } else {
      this._itens[chave] = {
        nome: produto.nome,
        preco: produto.preco_promocional ?? produto.preco,
        tamanho: tamanho || produto.tamanho || null,
        stock: produto.tamanhos
          ? (produto.tamanhos.find(t => t.tamanho === tamanho)?.stock ?? produto.stock ?? 0)
          : (produto.stock ?? 0),
        imagem: produto.imagem || null,
        quantidade: 1,
      };
    }
    this._salvar();
  },

  alterarQuantidade(chave, novaQtd) {
    if (!this._itens[chave]) return;

    if (novaQtd <= 0) {
      delete this._itens[chave];
    } else {
      this._itens[chave].quantidade = Math.min(novaQtd, this._itens[chave].stock || 99);
    }
    this._salvar();
  },

  remover(chave) {
    delete this._itens[chave];
    this._salvar();
  },

  limpar() {
    this._itens = {};
    this._salvar();
  },

  temItem(produtoId) {
    return Object.keys(this._itens).some(k => k.split('::')[0] === String(produtoId));
  },

  getQuantidade(produtoId) {
    return Object.entries(this._itens)
      .filter(([k]) => k.split('::')[0] === String(produtoId))
      .reduce((sum, [, item]) => sum + item.quantidade, 0);
  },
};

Carrinho.init();
