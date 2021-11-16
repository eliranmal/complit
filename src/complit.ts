import {LitElement, html, css} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'


/**
 * complit element
 *
 * @fires results-changed - indicates when a match is found and the results are fresh
 * @csspart input - the search term input element
 * @csspart list - the result list element
 */
@customElement('comp-lit')
export class Complit extends LitElement {

  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `

  @state()
  protected _data: string[] = []

  @property({type: String})
  term: string = ''

  @property()
  dataResource: string = ''


  override connectedCallback() {
    super.connectedCallback()

    if (this.dataResource) {
      fetch(this.dataResource)
        .then(response => response.json())
        .then(data => {
          this._data = data
        })
        .catch(err => console.error(err, 'data fetch failed'))
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback()

    this._data = []
  }

  override render() {
    this._search(this.term)

    return html`
      <input type="search" part="term" value="${this.term}"
        @input=${this._onInput}
      />
      <ol part="list">
        ${this._data.map(datum => html`<li>${datum}</li>`)}
      </ol>
    `
  }

  private _onInput({target}: Event) {
    this._search((target as HTMLInputElement)?.value)
  }

  private async _search(term: string) {
    if (!term) {
      return
    }
    // todo - implement fuzzy search / highlight
    this.dispatchEvent(new CustomEvent('results-changed'))
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'comp-lit': Complit
  }
}
