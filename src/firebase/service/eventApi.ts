import { ref, onValue, push, set, update, remove } from 'firebase/database'
import { database } from '../config/firebase'
import { EventType } from './eventType'
import { auth } from '../config/firebase'

// Dodawanie wydarzenia
export const addEvent = (eventData: EventType): Promise<void> => {
  const user = auth.currentUser

  if (!user) {
    return Promise.reject(new Error("Użytkownik nie jest zalogowany"))
  }

  const data = {
    uid: user.uid,
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
export const updateEvent = (eventId: string, updatedData: EventType) => {
  const user = auth.currentUser

  if (!user) {
    return Promise.reject(new Error("Użytkownik nie jest zalogowany"))
  }

  const eventRef = ref(database, `events/${eventId}`)
  return new Promise((resolve, reject) => {
    onValue(eventRef, (snapshot) => {
      const event = snapshot.val()
      if (event && event.uid === user.uid) {
        update(eventRef, updatedData)
          .then(resolve)
          .catch(reject)
      } else {
        reject(new Error("Nie masz uprawnień do aktualizacji tego wydarzenia"))
      }
    }, reject)
  })
}

// Pobieranie wszystkich wydarzeń
export const getAllEvents = (): Promise<EventType[]> => {
  const user = auth.currentUser

  if (!user) {
    return Promise.reject(new Error("Użytkownik nie jest zalogowany"))
  }

  return new Promise((resolve, reject) => {
    const eventsRef = ref(database, 'events');
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const eventsArray: EventType[] = Object.keys(data).map((key) => ({
          id: key,
          startDate: new Date(data[key].startDate),
          endDate: new Date(data[key].endDate),
          ...data[key],
        }))
          .filter(event => event.uid === user.uid)

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
export const deleteEvent = (eventId: string | number) => {
  const user = auth.currentUser

  if (!user) {
    return Promise.reject(new Error("Użytkownik nie jest zalogowany"))
  }

  const eventRef = ref(database, `events/${eventId}`)
  return new Promise((resolve, reject) => {
    onValue(eventRef, (snapshot) => {
      const event = snapshot.val()
      if (event && event.uid === user.uid) {
        remove(eventRef)
          .then(resolve)
          .catch(reject)
      } else {
        reject(new Error("Nie masz uprawnień do usunięcia tego wydarzenia"))
      }
    }, reject)
  })
}
