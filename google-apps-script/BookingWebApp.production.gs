/**
 * JusLawns booking web app — production-style script.
 * bookingKind: "service" (default) | "general" (legacy wizard) | "contact" (contact form; no slot check).
 * Deploy as Web app; bound to the Sheet.
 */

const CALENDAR_ID = 'primary'; // uses the account's main calendar
const MAX_SLOTS_PER_DAY = 12;
const SHEET_NAME = 'Sheet1';

const COLOR_SERVICE_BOOKING = '10';   // green
const COLOR_GENERAL_CALLBACK = '7'; // peacock
const COLOR_CONTACT_FORM = '5';      // banana

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var kind = normalizeBookingKind_(data.bookingKind);
    var confirmationId = 'JL-' + new Date().getTime().toString(36).toUpperCase();

    if (kind === 'contact') {
      var effectiveDate = todayYyyyMmDd_();
      var dataForLog = clonePayloadWithDate_(data, effectiveDate);
      createCalendarEvent(dataForLog, confirmationId, kind);
      logBooking(dataForLog, confirmationId, kind);
      return jsonResponse({ success: true, confirmationId: confirmationId });
    }

    var remaining = getRemainingSlots(data.date);
    if (remaining <= 0) {
      return jsonResponse({ success: false, error: 'No slots available for this date.' });
    }

    createCalendarEvent(data, confirmationId, kind);
    logBooking(data, confirmationId, kind);

    return jsonResponse({ success: true, confirmationId: confirmationId, remaining: remaining - 1 });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function doGet(e) {
  var date = e.parameter.date;
  if (!date) {
    return jsonResponse({ error: 'Missing date parameter' });
  }
  var remaining = getRemainingSlots(date);
  return jsonResponse({ remaining: remaining });
}

function todayYyyyMmDd_() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

function clonePayloadWithDate_(data, ymd) {
  var out = JSON.parse(JSON.stringify(data));
  out.date = ymd;
  return out;
}

function getRemainingSlots(dateStr) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  var data = sheet.getDataRange().getValues();
  var count = 0;
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === dateStr) count++;
  }
  return MAX_SLOTS_PER_DAY - count;
}

function normalizeBookingKind_(raw) {
  var k = (raw || 'service').toString().toLowerCase().trim();
  if (k === 'contact') return 'contact';
  if (k === 'general') return 'general';
  return 'service';
}

function buildBookingCalendarTitle_(payload, kind) {
  if (kind === 'contact') {
    return 'JusLawns — Website message (not a booking)';
  }
  if (kind === 'general') {
    return 'JusLawns — Callback / questions (not a service booking)';
  }

  var raw = (payload.service || '').toString().trim();
  if (!raw) return 'JusLawns — Booking request';

  var services = raw.split(',').map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 0; });
  if (services.length === 0) return 'JusLawns — Booking request';

  var title = 'JusLawns — ' + services.join(' · ');
  if (title.length > 120) {
    title = title.substring(0, 117) + '…';
  }
  return title;
}

function buildBookingCalendarDescription_(payload, confirmationId, kind) {
  var lines = [];

  lines.push('Confirmation: ' + confirmationId);
  lines.push('');

  if (kind === 'contact') {
    lines.push('REQUEST TYPE: Website contact form (not a lawn service booking)');
    lines.push('Follow up by phone or email.');
    lines.push('');
    var msg = (payload.notes || '').toString().trim();
    lines.push('MESSAGE');
    lines.push(msg || '(empty)');
    lines.push('');
  } else if (kind === 'general') {
    lines.push('REQUEST TYPE: General callback (not a lawn service booking)');
    lines.push('Follow up by phone/email — not a crew dispatch unless you schedule one later.');
    lines.push('');
  }

  lines.push('TOPIC / SERVICES');
  var raw = (payload.service || '').toString().trim();
  var services = raw
    ? raw.split(',').map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 0; })
    : [];

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

  if (kind !== 'contact') {
    var notes = (payload.notes || '').toString().trim();
    lines.push('');
    lines.push('NOTES / ACCESS');
    lines.push(notes || 'None');
  }

  lines.push('');
  lines.push('Sheet / event date: ' + (payload.date || ''));

  return lines.join('\n');
}

function calendarColorForKind_(kind) {
  if (kind === 'contact') return COLOR_CONTACT_FORM;
  if (kind === 'general') return COLOR_GENERAL_CALLBACK;
  return COLOR_SERVICE_BOOKING;
}

function createCalendarEvent(data, confirmationId, kind) {
  var calendar = CalendarApp.getCalendarById(CALENDAR_ID);
  var date = new Date(dateStr(data.date));

  var title = buildBookingCalendarTitle_(data, kind);
  var description = buildBookingCalendarDescription_(data, confirmationId, kind);

  var event = calendar.createAllDayEvent(title, date, { description: description });
  event.setColor(calendarColorForKind_(kind));
}

function logBooking(data, confirmationId, kind) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  var status = 'submitted';
  var bookingKind = kind === 'contact' ? 'contact' : kind === 'general' ? 'general' : 'service';

  sheet.appendRow([
    confirmationId,
    data.date,
    data.service,
    data.firstName,
    data.lastName,
    data.phone,
    data.email,
    data.street,
    data.city,
    data.zip,
    data.notes || '',
    data.paymentMethod || '',
    status,
    new Date().toISOString(),
    bookingKind,
  ]);
}

function dateStr(d) {
  return d + 'T00:00:00';
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
