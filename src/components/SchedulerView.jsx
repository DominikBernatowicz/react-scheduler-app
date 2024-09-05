import { Card } from "@mui/material";
import {
  Scheduler,
  WeekView,
  Appointments,
  DayView,
  ViewSwitcher,
  Toolbar,
  MonthView,
  DateNavigator,
  TodayButton,
  ConfirmationDialog,
  AppointmentTooltip,
  AppointmentForm,
  AllDayPanel,
  EditRecurrenceMenu,
} from "@devexpress/dx-react-scheduler-material-ui";
import { EditingState, ViewState } from "@devexpress/dx-react-scheduler";
import { useState, useEffect } from "react";
import { getAllEvents, addEvent, updateEvent, deleteEvent } from "../firebase/service/eventApi";
import { todayButtonMessages, appointmentFormMessages, confirmationDialogMessages } from '../translation/messages';

const SchedulerView = () => {
  const [data, setData] = useState([]);
  const [addedAppointment, setAddedAppointment] = useState({});
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const [editingAppointment, setEditingAppointment] = useState(undefined);

  const onCommitChanges = async ({ added, changed, deleted }) => {
    try {
      if (added) {
        await addEvent(added);
      }

      if (changed) {
        const changedId = Object.keys(changed);
        await updateEvent(changedId, changed[changedId]);
      }

      if (deleted !== undefined) {
        await deleteEvent(deleted);
      }

      // Refresh the data after changes
      const eventsArray = await getAllEvents();
      setData(eventsArray);
    } catch (error) {
      console.error("Error committing changes:", error.message);
    }
  };

  useEffect(() => {
    getAllEvents()
      .then((eventsArray) => {
        console.log("Fetched events:", eventsArray);
        setData(eventsArray);
      })
      .catch((error) => {
        console.error("Error fetching events:", error.message);
      });
  }, []);

  return (
    <Card
      sx={{
        margin: { md: 2, xs: 0 },
        borderRadius: 5,
        maxWidth: "80rem",
        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Scheduler data={data} locale={"pl-PL"} height={700}>
        <EditingState
          onCommitChanges={onCommitChanges}
          addedAppointment={addedAppointment}
          onAddedAppointmentChange={setAddedAppointment}
          appointmentChanges={appointmentChanges}
          onAppointmentChangesChange={setAppointmentChanges}
          editingAppointment={editingAppointment}
          onEditingAppointmentChange={setEditingAppointment}
        />
        <ViewState defaultCurrentViewName="Week" />

        <DayView startDayHour={9} endDayHour={18} displayName="Dzień" />
        <WeekView startDayHour={10} endDayHour={19} displayName="Tydzień" />
        <MonthView displayName="Miesiąc" />

        <Toolbar />
        <DateNavigator />
        <TodayButton messages={todayButtonMessages} />
        <ViewSwitcher />

        <AllDayPanel />
        <EditRecurrenceMenu />
        <ConfirmationDialog messages={confirmationDialogMessages} />

        <Appointments />
        <AppointmentTooltip showCloseButton showOpenButton showDeleteButton />
        <AppointmentForm messages={appointmentFormMessages} />
      </Scheduler>
    </Card>
  );
};

export default SchedulerView;
