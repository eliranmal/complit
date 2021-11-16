import fuzzysort from 'fuzzysort'
import {LitElement, html, css} from 'lit'
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
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

    input {
      font-size: 1rem;
    }

    ol li {
      cursor: pointer;
    }

    ol li b {
      color: red;
    }
  `

  @state()
  protected _data: string[] = []

  @state()
  protected _taggedResults: string[] = []

  @property({type: String})
  term: string = ''

  @property()
  dataResource: string = ''

  @property()
  results: string[] = []


  override connectedCallback() {
    super.connectedCallback()

    if (this.dataResource) {
      fetch(this.dataResource)
        .then(response => response.json())
        .then(data => {
          this._data = data
        })
        .then(() => this._search(this.term))
        .catch(err => console.error(err, 'data fetch failed'))
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback()

    this._data = []
  }

  override render() {
    return html`
      <input type="search" part="term" value="${this.term}"
        @input=${this._onInput}
      />
      <ol part="list">
        ${this._taggedResults.map(
          datum => html`<li
            @click=${this._onItemClick}
          >${unsafeHTML(datum)}</li>`
        )}
      </ol>
    `
  }

  private _onInput({currentTarget}: Event) {
    this._search((currentTarget as HTMLInputElement)?.value)
  }

  private _onItemClick({currentTarget}: Event) {
    console.log((currentTarget as HTMLInputElement)?.textContent)
  }

  private async _search(term: string) {
    if (!term) {
      return
    }
    const results = this._parseSearchResults(
      fuzzysort.go(term, this._data),
      result => fuzzysort.highlight(result, '<b part="highlight">', '</b>')
    )
    this.results = results.bare
    this._taggedResults = results.tagged
    this.dispatchEvent(new CustomEvent('results-changed'))
  }


  private _parseSearchResults(
    results: Fuzzysort.Results,
    taggingTransformer: (result: Fuzzysort.Result) => string | null)
      : {bare: string[], tagged: string[]} {
    return {
      bare: results.map(({target}) => target),
      tagged: results.map(taggingTransformer)
        .filter(r => r ?? false) as string[],
    }
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'comp-lit': Complit
  }
}
