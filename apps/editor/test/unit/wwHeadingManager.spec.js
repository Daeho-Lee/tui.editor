/**
 * @fileoverview test wysiwyg heading manager
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import WysiwygEditor from '@/wysiwygEditor';
import EventManager from '@/eventManager';
import WwHeadingManager from '@/wwHeadingManager';

describe('WwHeadingManager', () => {
  let container, em, wwe;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    em = new EventManager();

    wwe = new WysiwygEditor(container, em);

    wwe.init();

    wwe._headingMgr = new WwHeadingManager(wwe);
  });

  // we need to wait squire input event process
  afterEach(done => {
    setTimeout(() => {
      document.body.removeChild(container);
      done();
    });
  });

  it('wrap inner contents of h1 with div when wysiwygSetValueAfter event fire', () => {
    wwe.getEditor().setHTML('<h1>text1</h1>');
    em.emit('wysiwygSetValueAfter');
    expect(wwe.getBody().querySelectorAll('h1').length).toEqual(1);
    expect(wwe.getBody().querySelectorAll('h1 div').length).toEqual(1);
    expect(wwe.getBody().querySelectorAll('h1 div')[0].textContent).toEqual('text1');
  });
});
