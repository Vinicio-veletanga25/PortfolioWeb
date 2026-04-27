/**
 * <project-card> — Web Component
 *
 * Atributos:
 *   name        — nombre del proyecto
 *   description — descripción
 *   url         — enlace (preferiblemente GitHub)
 *   keywords    — JSON array de tecnologías, e.g. '["Python","FastAPI"]'
 *   entity      — tipo de proyecto ("Personal Project", "Open Source Contribution", …)
 *   show-image  — presencia activa → muestra OG-image de GitHub
 */
class ProjectCard extends HTMLElement {
  connectedCallback() {
    this.className =
      'flex flex-col overflow-hidden rounded-2xl border border-border bg-card/80 shadow-lg shadow-black/10 transition-shadow hover:shadow-glow';
    const entity = this.getAttribute('entity') || '';
    if (entity) this.dataset.entity = entity;
    this._render();
  }

  _ghImage(url) {
    const m = (url || '').match(/github\.com\/([^/?#\s]+\/[^/?#\s]+)/);
    return m ? `https://opengraph.githubassets.com/1a/${m[1]}` : null;
  }

  _esc(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  _render() {
    const name        = this.getAttribute('name')        || '';
     const image        = this.getAttribute('image')        || '';
    const description = this.getAttribute('description') || '';
    const url         = this.getAttribute('url')         || '#';
    const entity      = this.getAttribute('entity')      || '';
    const showImage   = this.hasAttribute('show-image');

    let keywords = [];
    try { keywords = JSON.parse(this.getAttribute('keywords') || '[]'); } catch { /* noop */ }

    const imgSrc  = showImage ? this._ghImage(url) : null;
    const imgHtml = imgSrc
      ? `<div class="">
           <img src="${imgSrc}" alt="${this._esc(name)}" loading="lazy"
                class="h-auto w-full object-contain transition-transform duration-300 hover:scale-105">
         </div>`
      : '';

    const tagsHtml = keywords.slice(0, 5)
      .map(k => `<span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">${this._esc(k)}</span>`)
      .join('');

    const entityHtml = entity
      ? `<span class="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">${this._esc(entity)}</span>`
      : '';

    this.innerHTML = `
      ${imgHtml}
      <div class="">

        <div class="flex flex-wrap items-start justify-between gap-2">
        
          <h3 class="text-xl font-bold leading-snug">${this._esc(name)}</h3>
          ${entityHtml}
        </div>

        <p class="flex-1 text-sm text-muted-foreground">${this._esc(description)}</p>
        <div class="flex flex-wrap gap-2">${tagsHtml}</div>

        <img   src="${this._esc(image)}" alt="Avatar" style="height: 100%; justify-content: center; width: 100%;   ">
          
        </a>
      </div>`;
  }
}

customElements.define('project-card', ProjectCard);
