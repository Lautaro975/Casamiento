const CALENDAR_TITLE = "Casamiento Estefy & Debora";
const CALENDAR_LOCATION =
    "Perpiñan Eventos, Av. Pedro Luro 10820, Mar del Plata, Buenos Aires";

const calendarParams = new URLSearchParams({
    action: "TEMPLATE",
    text: CALENDAR_TITLE,
    dates: "20261114T203000/20261115T053000",
    details: "La celebración",
    location: CALENDAR_LOCATION,
    ctz: "America/Argentina/Buenos_Aires",
});

const mapsParams = new URLSearchParams({
    api: "1",
    query: "Perpiñan Eventos, Av. Pedro Luro 10820, Mar del Plata, Buenos Aires",
});

export const EVENT_DETAILS = {
    title: "Dónde y cuándo",
    celebration: "La celebración",
    dateLabel: "Sábado, 14 de noviembre de 2026",
    time: "20:30 a 05:30 hs",
    venue: "Perpiñan Eventos",
    address: "Av. Pedro Luro 10820, B7600 Mar del Plata, Provincia de Buenos Aires",
    calendarUrl: `https://calendar.google.com/calendar/render?${calendarParams.toString()}`,
    mapsUrl: `https://www.google.com/maps/search/?${mapsParams.toString()}`,
} as const;
