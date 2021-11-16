import {Complit} from '../complit.js'

import {fixture, assert/*, oneEvent*/} from '@open-wc/testing'
import {html} from 'lit/static-html.js'

suite('complit', () => {
  test('is defined', () => {
    const el = document.createElement('comp-lit')
    assert.instanceOf(el, Complit)
  })

  test('renders with default values', async () => {
    const el = await fixture(html`<comp-lit />`)
    assert.shadowDom.equal(
      el,
      `
      <input part="term" type="search" value="" />
      <ol part="list"></ol>
    `
    )
  })

  test('renders with a set term', async () => {
    const el = await fixture(html`<comp-lit term="test" ._data=${['yo']} />`) as Complit
    assert.shadowDom.equal(
      el,
      `
      <input part="term" type="search" value="test" />
      <ol part="list">
        <li>yo</li>
      </ol>
    `
    )
    assert(el.term === 'test')
  })

  // test.only('handles enter key', async () => {
  //   const el = (await fixture(html`<comp-lit term="test" />`)) as Complit
  //   // const input = el.shadowRoot!.querySelector('input')!
  //   // input.focus()
  //   // input.value = 'wat'
  //   // console.log('input.value:', input.value)
  //   await el.updateComplete
  //   // const dispatched = await document.dispatchEvent(new KeyboardEvent('keydown', {key: 13, code: 'Enter'}))
  //   // console.log('dispatched:', dispatched)
  //   const result = await oneEvent(el, 'results-changed')
  //   console.log('result:', result)
  //   assert(result)
  //   assert.shadowDom.equal(
  //     el,
  //     `
  //     <input part="term" type="search" value="" />
  //     <ol part="list"></ol>
  //   `
  //   )
  // })

  test('styling applied', async () => {
    const el = (await fixture(html`<comp-lit></comp-lit>`)) as Complit
    await el.updateComplete
    assert.equal(getComputedStyle(el).paddingTop, '16px')
  })
})
