/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import td from 'testdouble';

import {captureHandlers} from '../helpers/foundation';
import {setupTest, testFoundation} from './helpers';
import {cssClasses, strings, numbers} from '../../../packages/mdc-ripple/constants';

suite('MDCRippleFoundation - Activation Logic');

testFoundation('does nothing if component if isSurfaceDisabled is true',
  ({foundation, adapter, mockRaf}) => {
    const handlers = captureHandlers(adapter, 'registerInteractionHandler');
    foundation.init();
    mockRaf.flush();

    td.when(adapter.isSurfaceDisabled()).thenReturn(true);

    handlers.mousedown();

    td.verify(adapter.addClass(cssClasses.FG_ACTIVATION), {times: 0});
  });

testFoundation('adds activation classes on mousedown', ({foundation, adapter, mockRaf}) => {
  const handlers = captureHandlers(adapter, 'registerInteractionHandler');
  foundation.init();
  mockRaf.flush();

  handlers.mousedown();
  mockRaf.flush();
  td.verify(adapter.addClass(cssClasses.FG_ACTIVATION));
});

testFoundation('sets FG position from the coords to the center within surface on mousedown',
  ({foundation, adapter, mockRaf}) => {
    const handlers = captureHandlers(adapter, 'registerInteractionHandler');
    const left = 50;
    const top = 50;
    const width = 200;
    const height = 100;
    const maxSize = Math.max(width, height);
    const initialSize = maxSize * numbers.INITIAL_ORIGIN_SCALE;
    const pageX = 100;
    const pageY = 75;

    td.when(adapter.computeBoundingRect()).thenReturn({width, height, left, top});
    foundation.init();
    mockRaf.flush();

    handlers.mousedown({pageX, pageY});
    mockRaf.flush();

    const startPosition = {
      x: pageX - left - (initialSize / 2),
      y: pageY - top - (initialSize / 2),
    };

    const endPosition = {
      x: (width / 2) - (initialSize / 2),
      y: (height / 2) - (initialSize / 2),
    };

    td.verify(adapter.updateCssVariable(
      strings.VAR_FG_TRANSLATE_START, `${startPosition.x}px, ${startPosition.y}px`
    ));
    td.verify(adapter.updateCssVariable(
      strings.VAR_FG_TRANSLATE_END, `${endPosition.x}px, ${endPosition.y}px`
    ));
  });

testFoundation('adds activation classes on touchstart', ({foundation, adapter, mockRaf}) => {
  const handlers = captureHandlers(adapter, 'registerInteractionHandler');
  foundation.init();
  mockRaf.flush();

  handlers.touchstart({changedTouches: [{pageX: 0, pageY: 0}]});
  mockRaf.flush();
  td.verify(adapter.addClass(cssClasses.FG_ACTIVATION));
});

testFoundation('sets FG position from the coords to the center within surface on touchstart',
  ({foundation, adapter, mockRaf}) => {
    const handlers = captureHandlers(adapter, 'registerInteractionHandler');
    const left = 50;
    const top = 50;
    const width = 200;
    const height = 100;
    const maxSize = Math.max(width, height);
    const initialSize = maxSize * numbers.INITIAL_ORIGIN_SCALE;
    const pageX = 100;
    const pageY = 75;

    td.when(adapter.computeBoundingRect()).thenReturn({width, height, left, top});
    foundation.init();
    mockRaf.flush();

    handlers.touchstart({changedTouches: [{pageX, pageY}]});
    mockRaf.flush();

    const startPosition = {
      x: pageX - left - (initialSize / 2),
      y: pageY - top - (initialSize / 2),
    };

    const endPosition = {
      x: (width / 2) - (initialSize / 2),
      y: (height / 2) - (initialSize / 2),
    };

    td.verify(
      adapter.updateCssVariable(strings.VAR_FG_TRANSLATE_START, `${startPosition.x}px, ${startPosition.y}px`)
    );
    td.verify(
      adapter.updateCssVariable(strings.VAR_FG_TRANSLATE_END, `${endPosition.x}px, ${endPosition.y}px`)
    );
  });

testFoundation('adds activation classes on pointerdown', ({foundation, adapter, mockRaf}) => {
  const handlers = captureHandlers(adapter, 'registerInteractionHandler');
  foundation.init();
  mockRaf.flush();

  handlers.pointerdown();
  mockRaf.flush();
  td.verify(adapter.addClass(cssClasses.FG_ACTIVATION));
});

testFoundation('sets FG position from the coords to the center within surface on pointerdown',
  ({foundation, adapter, mockRaf}) => {
    const handlers = captureHandlers(adapter, 'registerInteractionHandler');
    const left = 50;
    const top = 50;
    const width = 200;
    const height = 100;
    const maxSize = Math.max(width, height);
    const initialSize = maxSize * numbers.INITIAL_ORIGIN_SCALE;
    const pageX = 100;
    const pageY = 75;

    td.when(adapter.computeBoundingRect()).thenReturn({width, height, left, top});
    foundation.init();
    mockRaf.flush();

    handlers.pointerdown({pageX, pageY});
    mockRaf.flush();

    const startPosition = {
      x: pageX - left - (initialSize / 2),
      y: pageY - top - (initialSize / 2),
    };

    const endPosition = {
      x: (width / 2) - (initialSize / 2),
      y: (height / 2) - (initialSize / 2),
    };

    td.verify(adapter.updateCssVariable(
      strings.VAR_FG_TRANSLATE_START, `${startPosition.x}px, ${startPosition.y}px`
    ));
    td.verify(adapter.updateCssVariable(
      strings.VAR_FG_TRANSLATE_END, `${endPosition.x}px, ${endPosition.y}px`
    ));
  });

testFoundation('adds activation classes on keydown when surface is made active on same frame',
  ({foundation, adapter, mockRaf}) => {
    const handlers = captureHandlers(adapter, 'registerInteractionHandler');
    td.when(adapter.isSurfaceActive()).thenReturn(true);
    foundation.init();
    mockRaf.flush();

    handlers.keydown();
    td.verify(adapter.addClass(cssClasses.FG_ACTIVATION));
  });

testFoundation('adds activation classes on keydown when surface only reflects :active on next frame for space keydown',
  ({foundation, adapter, mockRaf}) => {
    const handlers = captureHandlers(adapter, 'registerInteractionHandler');
    td.when(adapter.isSurfaceActive()).thenReturn(false, true);
    foundation.init();
    mockRaf.flush();

    handlers.keydown({key: ' '});
    td.verify(adapter.addClass(cssClasses.FG_ACTIVATION), {times: 0});

    mockRaf.flush();
    td.verify(adapter.addClass(cssClasses.FG_ACTIVATION), {times: 1});
  });

testFoundation('does not add activation classes on keydown when surface is not made active',
  ({foundation, adapter, mockRaf}) => {
    const handlers = captureHandlers(adapter, 'registerInteractionHandler');
    td.when(adapter.isSurfaceActive()).thenReturn(false, false);
    foundation.init();
    mockRaf.flush();

    handlers.keydown({key: ' '});
    mockRaf.flush();

    td.verify(adapter.addClass(cssClasses.FG_ACTIVATION), {times: 0});
  });

testFoundation('sets FG position to center on non-pointer activation', ({foundation, adapter, mockRaf}) => {
  const handlers = captureHandlers(adapter, 'registerInteractionHandler');
  const left = 50;
  const top = 50;
  const width = 200;
  const height = 100;
  const maxSize = Math.max(width, height);
  const initialSize = maxSize * numbers.INITIAL_ORIGIN_SCALE;

  td.when(adapter.computeBoundingRect()).thenReturn({width, height, left, top});
  td.when(adapter.isSurfaceActive()).thenReturn(true);
  foundation.init();
  mockRaf.flush();

  handlers.keydown();
  mockRaf.flush();

  const position = {
    x: (width / 2) - (initialSize / 2),
    y: (height / 2) - (initialSize / 2),
  };

  td.verify(adapter.updateCssVariable(strings.VAR_FG_TRANSLATE_START,
    `${position.x}px, ${position.y}px`));
  td.verify(adapter.updateCssVariable(strings.VAR_FG_TRANSLATE_END,
    `${position.x}px, ${position.y}px`));
});

testFoundation('adds activation classes on programmatic activation', ({foundation, adapter, mockRaf}) => {
  td.when(adapter.isSurfaceActive()).thenReturn(true);
  foundation.init();
  mockRaf.flush();

  foundation.activate();
  mockRaf.flush();

  td.verify(adapter.addClass(cssClasses.FG_ACTIVATION));
});

testFoundation('programmatic activation immediately after interaction', ({foundation, adapter, mockRaf}) => {
  const handlers = captureHandlers(adapter, 'registerInteractionHandler');
  const documentHandlers = captureHandlers(adapter, 'registerDocumentInteractionHandler');

  td.when(adapter.isSurfaceActive()).thenReturn(true);
  foundation.init();
  mockRaf.flush();

  handlers.touchstart({changedTouches: [{pageX: 0, pageY: 0}]});
  mockRaf.flush();
  documentHandlers.touchend();
  mockRaf.flush();

  foundation.activate();
  mockRaf.flush();

  td.verify(adapter.addClass(cssClasses.FG_ACTIVATION), {times: 2});
});

testFoundation('sets FG position to center on non-pointer activation', ({foundation, adapter, mockRaf}) => {
  const handlers = captureHandlers(adapter, 'registerInteractionHandler');
  const left = 50;
  const top = 50;
  const width = 200;
  const height = 100;
  const maxSize = Math.max(width, height);
  const initialSize = maxSize * numbers.INITIAL_ORIGIN_SCALE;

  td.when(adapter.computeBoundingRect()).thenReturn({width, height, left, top});
  td.when(adapter.isSurfaceActive()).thenReturn(true);
  foundation.init();
  mockRaf.flush();

  handlers.keydown();
  mockRaf.flush();

  const position = {
    x: (width / 2) - (initialSize / 2),
    y: (height / 2) - (initialSize / 2),
  };

  td.verify(adapter.updateCssVariable(strings.VAR_FG_TRANSLATE_START,
    `${position.x}px, ${position.y}px`));
  td.verify(adapter.updateCssVariable(strings.VAR_FG_TRANSLATE_END,
    `${position.x}px, ${position.y}px`));
});

testFoundation('does not redundantly add classes on touchstart followed by mousedown',
  ({foundation, adapter, mockRaf}) => {
    const handlers = captureHandlers(adapter, 'registerInteractionHandler');
    foundation.init();
    mockRaf.flush();

    handlers.touchstart({changedTouches: [{pageX: 0, pageY: 0}]});
    mockRaf.flush();
    handlers.mousedown();
    mockRaf.flush();
    td.verify(adapter.addClass(cssClasses.FG_ACTIVATION), {times: 1});
  });

testFoundation('does not redundantly add classes on touchstart followed by pointerstart',
  ({foundation, adapter, mockRaf}) => {
    const handlers = captureHandlers(adapter, 'registerInteractionHandler');
    foundation.init();
    mockRaf.flush();

    handlers.touchstart({changedTouches: [{pageX: 0, pageY: 0}]});
    mockRaf.flush();
    handlers.pointerdown();
    mockRaf.flush();
    td.verify(adapter.addClass(cssClasses.FG_ACTIVATION), {times: 1});
  });

testFoundation('removes deactivation classes on activate to ensure ripples can be retriggered',
  ({foundation, adapter, mockRaf}) => {
    const handlers = captureHandlers(adapter, 'registerInteractionHandler');
    const documentHandlers = captureHandlers(adapter, 'registerDocumentInteractionHandler');
    foundation.init();
    mockRaf.flush();

    handlers.mousedown();
    mockRaf.flush();
    documentHandlers.mouseup();
    mockRaf.flush();
    handlers.mousedown();
    mockRaf.flush();

    td.verify(adapter.removeClass(cssClasses.FG_DEACTIVATION));
  });

testFoundation('will not activate multiple ripples on same frame if one surface descends from another',
  ({foundation, adapter, mockRaf}) => {
    const secondRipple = setupTest();
    const firstHandlers = captureHandlers(adapter, 'registerInteractionHandler');
    const secondHandlers = captureHandlers(secondRipple.adapter, 'registerInteractionHandler');
    td.when(secondRipple.adapter.containsEventTarget(td.matchers.anything())).thenReturn(true);
    foundation.init();
    secondRipple.foundation.init();
    mockRaf.flush();

    firstHandlers.mousedown();
    secondHandlers.mousedown();
    mockRaf.flush();

    td.verify(adapter.addClass(cssClasses.FG_ACTIVATION));
    td.verify(secondRipple.adapter.addClass(cssClasses.FG_ACTIVATION), {times: 0});
  });

testFoundation('will not activate multiple ripples on same frame for parent surface w/ touch follow-on events',
  ({foundation, adapter, mockRaf}) => {
    const secondRipple = setupTest();
    const firstHandlers = captureHandlers(adapter, 'registerInteractionHandler');
    const secondHandlers = captureHandlers(secondRipple.adapter, 'registerInteractionHandler');
    td.when(secondRipple.adapter.containsEventTarget(td.matchers.anything())).thenReturn(true);
    foundation.init();
    secondRipple.foundation.init();
    mockRaf.flush();

    firstHandlers.touchstart({changedTouches: [{pageX: 0, pageY: 0}]});
    secondHandlers.touchstart({changedTouches: [{pageX: 0, pageY: 0}]});
    // Simulated mouse events on touch devices always happen after a delay, not on the same frame
    mockRaf.flush();
    firstHandlers.mousedown();
    secondHandlers.mousedown();
    mockRaf.flush();

    td.verify(adapter.addClass(cssClasses.FG_ACTIVATION));
    td.verify(secondRipple.adapter.addClass(cssClasses.FG_ACTIVATION), {times: 0});
  });

testFoundation('will activate multiple ripples on same frame for surfaces without an ancestor/descendant relationship',
  ({foundation, adapter, mockRaf}) => {
    const secondRipple = setupTest();
    const firstHandlers = captureHandlers(adapter, 'registerInteractionHandler');
    const secondHandlers = captureHandlers(secondRipple.adapter, 'registerInteractionHandler');
    td.when(secondRipple.adapter.containsEventTarget(td.matchers.anything())).thenReturn(false);
    foundation.init();
    secondRipple.foundation.init();
    mockRaf.flush();

    firstHandlers.mousedown();
    secondHandlers.mousedown();
    mockRaf.flush();

    td.verify(adapter.addClass(cssClasses.FG_ACTIVATION));
    td.verify(secondRipple.adapter.addClass(cssClasses.FG_ACTIVATION));
  });

testFoundation('displays the foreground ripple on activation when unbounded', ({foundation, adapter, mockRaf}) => {
  const handlers = captureHandlers(adapter, 'registerInteractionHandler');
  td.when(adapter.computeBoundingRect()).thenReturn({width: 100, height: 100, left: 0, top: 0});
  td.when(adapter.isUnbounded()).thenReturn(true);
  foundation.init();
  mockRaf.flush();

  handlers.mousedown({pageX: 0, pageY: 0});
  mockRaf.flush();

  td.verify(adapter.addClass(cssClasses.FG_ACTIVATION));
});

testFoundation('clears translation custom properties when unbounded in case ripple was switched from bounded',
  ({foundation, adapter, mockRaf}) => {
    const handlers = captureHandlers(adapter, 'registerInteractionHandler');

    td.when(adapter.isUnbounded()).thenReturn(true);
    foundation.init();
    mockRaf.flush();

    handlers.pointerdown({pageX: 100, pageY: 75});
    mockRaf.flush();

    td.verify(adapter.updateCssVariable(strings.VAR_FG_TRANSLATE_START, ''));
    td.verify(adapter.updateCssVariable(strings.VAR_FG_TRANSLATE_END, ''));
  });
