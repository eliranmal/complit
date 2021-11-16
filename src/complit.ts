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

    ol li.highlight {
      background-color: green;
    }

    ol li b {
      color: red;
    }
  `

  @state()
  protected _data: string[] = []

  @state()
  protected _taggedResults: string[] = []

  @state()
  protected _highlightedItemIndex: number = -1

  @property({type: String})
  term: string = ''

  @property()
  dataResource: string = ''

  @property()
  results: string[] = []


  override connectedCallback() {
    this._fetchData()
    super.connectedCallback()
    document.addEventListener('keydown', this._keyboardListener.bind(this))
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('keydown', this._keyboardListener.bind(this))
    this._data = []
  }

  override render() {
    return html`
      <input type="search" part="term" value="${this.term}"
        @input=${this._onInput}
      />
      <ol part="list">
        ${this._taggedResults.map(
          (datum, index) => {
            const highlighted = this._highlightedItemIndex === index ? 'highlight' : ''
            return html`
            <li
              part="item ${highlighted}"
              class="${highlighted}"
              @click=${this._onItemClick}
            >${unsafeHTML(datum)}</li>
            `
          }
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

  private _fetchData() {
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


  private _keyboardListener(e: KeyboardEvent) {
    this._handleArrowNavigation(e)
    this._handleItemEnter(e)
  }

  private _handleItemEnter({key}: KeyboardEvent) {
    switch (key) {
      case 'Enter':
        if (this._highlightedItemIndex !== -1) {
          console.log('selected item:', this.results[this._highlightedItemIndex])
        }
        break
      default:
        break
    }
  }

  private _handleArrowNavigation({key}: KeyboardEvent) {
    let index
    switch (key) {
      case 'ArrowDown':
        index = (this._highlightedItemIndex + 1) % this.results.length
        break
      case 'ArrowUp':
        index = (this._highlightedItemIndex - 1) % this.results.length
        break
      default:
        break
    }
    if (typeof index !== 'undefined') {
      this._highlightedItemIndex = index < 0 ? this.results.length + index : index
    }
  }

  private async _search(term: string) {
    if (!term) {
      return
    }
    const results = this._parseSearchResults(
      fuzzysort.go(term, this._data),
      result => fuzzysort.highlight(result, '<b part="match">', '</b>')
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
