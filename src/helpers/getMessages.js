// Este archivo es para convertir al español los texto que no son cambiados automáticamente
// el usar es del objeto locales en calendarLocalizer.js

export const getMessages = ( language ) => {
    if( language === 'es' ) {
        return {
            allDay: 'Todo el día',
            previous: '<',
            next: '>',
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            agenda: 'Agenda',
            date: 'Fecha',
            time: 'Hora',
            event: 'Evento',
            noEventsInRange: 'No hay eventos en este rango',
            showMore: total => `+ Ver más (${total})`
        };
    } else if ( language === 'en-US') {
        return {
            allDay: 'AllDay',
            previous: '<',
            next: '>',
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day',
            agenda: 'Agenda',
            date: 'Date',
            time: 'Time',
            event: 'Event',
            noEventsInRange: 'No events in this range',
            showMore: total => `+ See more (${total})`
        };
    }
}
