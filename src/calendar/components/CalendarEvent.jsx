

export const CalendarEvent = ({ event }) => {
    // console.log(event); // para ver que propiedades tiene
    const { title, user } = event;


  return (
    <>
      <strong>{ title }</strong>
      <span> - { user.name }</span>
    </>
  )
}


