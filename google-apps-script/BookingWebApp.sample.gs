/**
 * JusLawns booking web app — sample helpers for Calendar events
 *
 * Copy the functions below into your deployed Apps Script project, then replace
 * wherever you set the calendar event title (e.g. "cash - pending") with:
 *   var title = buildBookingCalendarTitle_(payload);
 *   var description = buildBookingCalendarDescription_(payload);
 *
 * Payload from the website (BookService.jsx) includes:
 *   date, service (comma-separated labels), firstName, lastName, phone, email,
 *   street, city, zip, notes, paymentMethod (often empty — do not use for titles)
 */

/**
 * Event title: services only, readable in the month view.
 * Splits payload.service on commas (multi-select bookings).
 */
function buildBookingCalendarTitle_(payload) {
  var raw = (payload.service || '').toString().trim();
  if (!raw) return 'JusLawns — Booking request';

  var services = raw.split(',').map(function (s) {
    return s.trim();
  }).filter(function (s) {
    return s.length > 0;
  });

  if (services.length === 0) return 'JusLawns — Booking request';

  // Use middle dot between services; trim if calendar title gets long
  var title = 'JusLawns — ' + services.join(' · ');
  if (title.length > 120) {
    title = title.substring(0, 117) + '…';
  }
  return title;
}

/**
 * Event description: services as a list, then full customer details.
 */
function buildBookingCalendarDescription_(payload) {
  var lines = [];

  lines.push('SERVICES');
  var raw = (payload.service || '').toString().trim();
  var services = raw ? raw.split(',').map(function (s) {
    return s.trim();
  }).filter(function (s) {
    return s.length > 0;
  }) : [];

  if (services.length === 0) {
    lines.push('(none specified)');
  } else {
    for (var i = 0; i < services.length; i++) {
      lines.push('• ' + services[i]);
    }
  }

  lines.push('');
  lines.push('CUSTOMER');
  lines.push('Name: ' + (payload.firstName || '') + ' ' + (payload.lastName || ''));
  lines.push('Phone: ' + (payload.phone || ''));
  lines.push('Email: ' + (payload.email || ''));
  lines.push('');
  lines.push('ADDRESS');
  lines.push((payload.street || '') + ', ' + (payload.city || '') + ' ' + (payload.zip || ''));

  var notes = (payload.notes || '').toString().trim();
  if (notes) {
    lines.push('');
    lines.push('NOTES / ACCESS');
    lines.push(notes);
  }

  lines.push('');
  lines.push('Preferred service date: ' + (payload.date || ''));

  return lines.join('\n');
}

/**
 * Example: after parsing JSON in doPost(e):
 *
 *   var payload = JSON.parse(e.postData.contents);
 *   var title = buildBookingCalendarTitle_(payload);
 *   var description = buildBookingCalendarDescription_(payload);
 *
 * CalendarApp (all-day or timed) — adjust times to match your business rules:
 *
 *   var cal = CalendarApp.getCalendarById('your-calendar-id@group.calendar.google.com');
 *   var parts = payload.date.split('-'); // YYYY-MM-DD
 *   var start = new Date(parts[0], parts[1] - 1, parts[2], 7, 0, 0);
 *   var end = new Date(parts[0], parts[1] - 1, parts[2], 17, 0, 0);
 *   cal.createEvent(title, start, end, { description: description });
 *
 * Remove any line that builds the title from paymentMethod, "cash", or "pending".
 */
