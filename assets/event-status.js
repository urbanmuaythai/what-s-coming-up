(function () {
  'use strict';
  var today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Australia/Brisbane', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date());
  document.querySelectorAll('[data-event-start][data-event-end]').forEach(function (event) {
    var start = event.getAttribute('data-event-start');
    var end = event.getAttribute('data-event-end');
    var status = today < start ? 'Upcoming' : today > end ? 'Past event' : 'Underway';
    event.setAttribute('data-event-status', status);
    event.querySelectorAll('[data-event-label]').forEach(function (label) {
      label.textContent = status;
    });
    if (event.hasAttribute('data-hide-after-event') && today > end) event.hidden = true;
  });
  document.querySelectorAll('[data-tour-phase]').forEach(function (element) {
    var phase = today < '2026-10-23' ? 'upcoming' : today > '2026-11-06' ? 'past' : 'underway';
    element.hidden = element.getAttribute('data-tour-phase') !== phase;
  });
  var highlights = document.querySelector('#panel-month .events');
  var empty = document.querySelector('#highlights-empty');
  if (highlights && empty) {
    empty.hidden = Array.prototype.some.call(highlights.children, function (event) { return !event.hidden; });
  }
})();
