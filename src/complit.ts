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
      display: flex;
      flex-direction: column;
      width: max-content;
      max-width: 800px;
      padding: 1em;
      border: solid 2px #aaa;
      border-radius: 0 2em;
      font-size: 1em;
    }

    input {
      padding: 0 1em;
      line-height: 2;
      font-size: 1em;
      border-radius: 0 1em;
    }

    ol {
      overflow: auto;
      max-height: 200px;
      margin-block-end: 0;
      list-style-type: none;
    }

    ol li {
      position: relative;
      cursor: pointer;
    }

    ol li.highlight:before {
      content: '\\0000bb';
      position: absolute;
      left: -1em;
    }

    ol li:hover {
      text-decoration: underline;
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
    document.addEventListener('keydown', this._onKeyboardEvent.bind(this))
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('keydown', this._onKeyboardEvent.bind(this))
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
    const item = (currentTarget as HTMLInputElement)?.textContent
    this._handleItemSelection(item as string)
  }

  private _onKeyboardEvent(e: KeyboardEvent) {
    this._handleArrowNavigation(e)
    this._handleItemEnter(e)
  }

  private _handleItemSelection(item: string = '') {
    console.log('selected item:', item)
  }

  private _handleItemEnter({key}: KeyboardEvent) {
    switch (key) {
      case 'Enter':
        if (this._highlightedItemIndex !== -1) {
          this._handleItemSelection(this.results[this._highlightedItemIndex])
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
