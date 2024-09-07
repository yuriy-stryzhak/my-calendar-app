
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_DOMEN;

const token = `Bearer ${import.meta.env.VITE_TOKEN}`;

export const useEventStore = defineStore('eventStore', () => {
 
  const events = ref([
    {
        title: "Advanced algebra",
        with: "Chandler Bing",
        time: { start: "2024-09-16 12:05", end: "2024-09-16 13:35" },
        color: "yellow",
        isEditable: true,
        id: "753944708f0f",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!"
    },
    {
        title: "Ralph on holiday",
        with: "Rachel Greene",
        time: { start: "2024-09-10", end: "2024-09-22" },
        color: "green",
        isEditable: true,
        id: "5602b6f589fc"
    },
    {
        title: "Vacation",
        with: "Dm Koh",
        time: { start: "2024-09-08", end: "2024-09-08" },
        color: "red",
        isEditable: true,
        id: "5602b6f189fc"
    }
  ]);

    const createEvent= (eventData) => {
      try {
        events.value = [...events.value, eventData];
        
      } catch (error) {
        console.error('Error creating event:', error);
      }
    }

    const deleteEvent = (id) => {
      try {
        events.value = events.value.filter((event) => event.id !== id);
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }

    const getEvent = (id) => {
      return events.value.find((event) => event.id === id);
    }

    // const fetchEvents = async() => {
    //   try {
    //     const response = await axios.get(`${baseURL}/api/Event/All`, {
    //       headers: {
    //         Authorization: token,
    //       },
    //     });
    //     events.value = response.data;
    //   } catch (error) {
    //     console.error('Error fetching events:', error);
    //   }
    // }

    // const createEvent= async(eventData) => {
    //   try {
    //     await axios.post(`${baseURL}/api/Event/Create`, eventData, {
    //       headers: {
    //         Authorization: token,
    //       },
    //     });
    //     fetchEvents();
    //   } catch (error) {
    //     console.error('Error creating event:', error);
    //   }
    // }

    return {
      events,
      // fetchEvents,
      createEvent,
      deleteEvent,
      getEvent,
    }

})
