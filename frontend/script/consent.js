const Consent = {
  KEY: 'jp_consent_v1',
  get(){ try{ return JSON.parse(localStorage.getItem(this.KEY)||'null'); }catch{ return null; } },
  save(pref){
    const dados={...pref, data:new Date().toISOString(), versao:'1.0', ip:'local'};
    localStorage.setItem(this.KEY, JSON.stringify(dados));
    // opcional: envia ao backend se logado
    if(window.api && api.isLoggedIn()){
      fetch((window.API_BASE_URL||'/api')+'/consentimento', {method:'POST', headers:{'Content-Type':'application/json', 'Authorization':'Bearer '+api.getToken()}, body: JSON.stringify(dados)}).catch(()=>{});
    }
    this.esconderBanner();
  },
  aceitarTudo(){ this.save({necessarios:true, analiticos:true, marketing:true, aceitou:true}); Componentes.toast('Preferências salvas','success'); },
  rejeitar(){ this.save({necessarios:true, analiticos:false, marketing:false, aceitou:false}); },
  abrirPainel(){
    const cur=this.get()||{necessarios:true, analiticos:false, marketing:false};
    const html=`<div style="display:flex;flex-direction:column;gap:10px">
      <label style="display:flex;justify-content:space-between;align-items:center"><span><strong>Necessários</strong> <small>(sempre ativos)</small></span><input type="checkbox" checked disabled></label>
      <label style="display:flex;justify-content:space-between;align-items:center"><span>Analíticos</span><input type="checkbox" id="cAnaliticos" ${cur.analiticos?'checked':''}></label>
      <label style="display:flex;justify-content:space-between;align-items:center"><span>Marketing</span><input type="checkbox" id="cMarketing" ${cur.marketing?'checked':''}></label>
      <a href="/pages/politica-privacidade.html" target="_blank" style="font-size:.85rem">Ver política completa (LGPD)</a>
    </div>`;
    document.getElementById('consentPainelBody').innerHTML=html;
    document.getElementById('consentPainel').classList.add('ativo');
  },
  salvarPainel(){
    const cur=this.get()||{};
    this.save({necessarios:true, analiticos: document.getElementById('cAnaliticos').checked, marketing: document.getElementById('cMarketing').checked, aceitou: true});
    document.getElementById('consentPainel').classList.remove('ativo');
  },
  mostrarBanner(){
    if(this.get()) return;
    const b=document.getElementById('consentBanner');
    if(b) b.style.display='flex';
  },
  esconderBanner(){
    const b=document.getElementById('consentBanner');
    if(b) b.style.display='none';
  },
  init(){
    // injeta banner + painel se não existir
    if(!document.getElementById('consentBanner')){
      const banner=document.createElement('div');
      banner.id='consentBanner';
      banner.style.cssText='position:fixed;bottom:16px;left:16px;right:16px;max-width:980px;margin:0 auto;background:#111;color:#fff;padding:14px 16px;border-radius:12px;display:none;align-items:center;justify-content:space-between;gap:12px;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.2)';
      banner.innerHTML='<div style="flex:1"><strong>Privacidade & LGPD</strong><br><small>Usamos cookies necessários e, com seu consentimento, analíticos e marketing. <a href="/pages/politica-privacidade.html" style="color:#c6a15a;text-decoration:underline">Saiba mais</a></small></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button onclick="Consent.rejeitar()" style="background:#fff;color:#111;border:none;padding:8px 12px;border-radius:999px;cursor:pointer">Rejeitar</button><button onclick="Consent.abrirPainel()" style="background:transparent;color:#fff;border:1px solid #fff;padding:8px 12px;border-radius:999px;cursor:pointer">Gerenciar</button><button onclick="Consent.aceitarTudo()" style="background:#c6a15a;color:#111;border:none;padding:8px 14px;border-radius:999px;font-weight:700;cursor:pointer">Aceitar tudo</button></div>';
      document.body.appendChild(banner);
    }
    if(!document.getElementById('consentPainel')){
      const p=document.createElement('div');
      p.id='consentPainel'; p.className='modal-overlay';
      p.innerHTML='<div class="modal" style="max-width:520px"><div class="modal-header"><h3>Gerenciar cookies</h3><button class="modal-close" onclick="document.getElementById(\'consentPainel\').classList.remove(\'ativo\')">&times;</button></div><div class="modal-body" id="consentPainelBody"></div><div class="modal-footer"><button class="btn btn-ghost" onclick="document.getElementById(\'consentPainel\').classList.remove(\'ativo\')">Cancelar</button><button class="btn btn-primary" onclick="Consent.salvarPainel()">Salvar preferências</button></div></div>';
      document.body.appendChild(p);
    }
    this.mostrarBanner();
  }
};
window.Consent=Consent;
document.addEventListener('DOMContentLoaded',()=> Consent.init());
