<template>
  <Qalendar 
    :events="eventStore.events"
    :config="config"
    @delete-event="deleteEvent"
    @date-was-clicked="dateWasClicked"
    @datetime-was-clicked="dateWasClicked"
    @edit-event="editEvent"
  />

  <!-- Add/Edit Event Dialog -->
  <v-dialog v-model="dialog" max-width="400px">
    <v-card>
      <v-card-title>
        {{ isEditing ? 'Edit Event' : 'Add Event' }}
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="newEvent.title" label="Event Title" maxlength="30" :rules="[rules.required]" required></v-text-field>
        <v-text-field v-model="newEvent.with" label="With" required></v-text-field>
        <v-textarea v-model="newEvent.description" label="Description"></v-textarea>

        <v-date-input
          v-model="newEvent.time" 
          label="Enter Event time"
          multiple="range"
          prepend-icon=""
          prepend-inner-icon="$calendar"
          ></v-date-input>

          <v-radio-group
            v-model="newEvent.color"
            label="Select Color"
            inline
          >
            <v-radio
              label="Blue"
              value="blue"
              color="blue"
            ></v-radio>
            <v-radio
              label="Yellow"
              value="yellow"
              color="yellow"
            ></v-radio>
            <v-radio
              label="Green"
              value="green"
              color="green"
            ></v-radio>
            <v-radio
              label="Red"
              value="red"
              color="red"
            ></v-radio>
          </v-radio-group>

      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="saveEvent">Save</v-btn>
        <v-btn @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup>
import { Qalendar } from "qalendar";
import { ref } from 'vue';
import { useDate } from 'vuetify';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { useEventStore } from '@/store/store';

const eventStore = useEventStore();

// Field validation rules
const rules = ref({
  required: value => !!value || 'Field is required',
});

// Configuration
const config = ref({
  defaultMode: 'month',
  locale: 'en-US',
  style: {
  },
});

// Variables for dialog
const dialog = ref(false);
const isEditing = ref(false);
const newEvent = ref({
  title: '',
  with: '',
  time: [],
  color: 'blue',
  description: '',
});

const dateWasClicked = (date) => {
  newEvent.value.time = [ toDateFormat(date) ];
  isEditing.value = false;
  dialog.value = true;
}

// Save new event
const saveEvent = () => {

  if(isEditing.value) {
    eventStore.deleteEvent(newEvent.value.id);
  }

  eventStore.createEvent({
    title: newEvent.value.title,
    description: newEvent.value.description,
    with: newEvent.value.with,
    time: {
      start: `${getFirstAndLastDate(newEvent.value.time)[0]}`,
      end: `${getFirstAndLastDate(newEvent.value.time)[1]}`,
    },
    color: newEvent.value.color,
    isEditable: true,
    id: Date.now().toString(),
  })
  
  dialog.value = false;
}

const deleteEvent = (eventId) => {
  eventStore.deleteEvent(eventId);
}

const editEvent = (eventId) => {
  dialog.value = true;
  isEditing.value = true;

  const event = eventStore.getEvent(eventId);
  newEvent.value.title = event.title;
  newEvent.value.with = event.with;
  newEvent.value.time = [ event.time.start, event.time.end ];
  newEvent.value.color = event.color;
  newEvent.value.description = event.description;
  newEvent.value.id = event.id;
}

const formatDate = (date) => {
  const localDate = new Date(date);
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  return localDate.toISOString().split('T')[0];
};

const getFirstAndLastDate = (dates) => {
  
  if (!dates.length) return [];
  const formattedDates = dates.map(formatDate);
  
  const firstDate = formattedDates[0];
  const lastDate = formattedDates[formattedDates.length - 1];

  return [firstDate, lastDate];
};

const toDateFormat = (dateString) => {
  const date = new Date(dateString + 'T00:00:00Z');
  return date;
}

</script>

<style>
@import "qalendar/dist/style.css";

.calendar-root-wrapper {
  height: 100vh;
}
</style>
