import { ref, onValue, push, set, update, remove } from 'firebase/database'
import { database } from '../config/firebase'

// Dodawanie wydarzenia
export const addEvent = (eventData) => {
  const data = {
    allDay: eventData?.allDay,
    endDate: eventData?.endDate.toISOString(),
    notes: eventData?.notes || '',
    rRule: eventData?.rRule || '',
    startDate: eventData?.startDate.toISOString(),
    title: eventData?.title || ''
  }

  const eventsRef = ref(database, 'events')
  const newEventRef = push(eventsRef)
  return set(newEventRef, data)
}

// Funkcja aktualizująca wydarzenie
export const updateEvent = (eventId, updatedData) => {
  const eventRef = ref(database, `events/${eventId}`)
  return update(eventRef, updatedData)
}

// Pobieranie wszystkich wydarzeń
export const getAllEvents = () => {
  return new Promise((resolve, reject) => {
    const eventsRef = ref(database, 'events');
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const eventsArray = Object.keys(data).map((key) => ({
          id: key,
          startDate: new Date(data[key].startDate),
          endDate: new Date(data[key].endDate),
          ...data[key],
        }));
        resolve(eventsArray)
      } else {
        resolve([])
      }
    }, (error) => {
      reject(error)
    })
  })
}

// Usuwanie wydarzenia
export const deleteEvent = (eventId) => {
  const eventRef = ref(database, `events/${eventId}`)
  return remove(eventRef)
}
