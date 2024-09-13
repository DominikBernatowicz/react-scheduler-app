import { Box, Card } from "@mui/material";
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
import { ChangeSet, EditingState, ViewState } from "@devexpress/dx-react-scheduler";
import { useState, useEffect, FC } from "react";
import {
  getAllEvents,
  addEvent,
  updateEvent,
  deleteEvent
} from "../firebase/service/eventApi";
import {
  todayButtonMessages,
  appointmentFormMessages,
  confirmationDialogMessages,
} from "../translation/messages";
import LogoComponent from "./LogoComponent";
import { EventType } from "@/firebase/service/eventType";

const SchedulerView: FC = () => {
  const [data, setData] = useState<EventType[]>([]);

  const onCommitChanges = async (changes: ChangeSet ) => {
    try {
      if (changes.added) {
        await addEvent(changes.added as EventType);
      }

      if (changes.changed) {
        const changedId = Object.keys(changes.changed);
        await updateEvent(changedId[0], changes.changed[changedId[0]]);
      }

      if (changes.deleted !== undefined) {
        await deleteEvent(changes.deleted);
      }

      const eventsArray = await getAllEvents();
      setData(eventsArray);
    } catch (error) {
      const errorAsError = error as Error;
      console.error("Error committing changes:", errorAsError.message);
    }
  };

  useEffect(() => {
    getAllEvents()
      .then((eventsArray) => {
        setData(eventsArray);
      })
      .catch((error) => {
        console.error("Error fetching events:", error.message);
      });
  }, []);

  return (
    <>
      <Card
        sx={{
          margin: { md: 2, xs: 0 },
          borderRadius: 5,
          maxWidth: "80rem",
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <LogoComponent />
      </Box>
        <Scheduler data={data} locale={"pl-PL"} height={700}>
          <EditingState
            onCommitChanges={onCommitChanges}
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
    </>
  );
};

export default SchedulerView;
