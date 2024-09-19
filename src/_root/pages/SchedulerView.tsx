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
import { EventType } from "@/firebase/service/eventType";
import { addEvent, deleteEvent, getAllEvents, updateEvent } from "@/firebase/service/eventApi";
import LogoComponent from "@/components/LogoComponent";
import AccountMenu from "@/components/AccountMenu";
import { appointmentFormMessages, confirmationDialogMessages, todayButtonMessages } from "@/translation/messages";

const SchedulerView: FC = () => {
  const [data, setData] = useState<EventType[]>([]);

  const onCommitChanges = async (changes: ChangeSet) => {
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
          opacity: 0.8,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            position: "relative",
          }}
        >
          <Box>
            <LogoComponent />
          </Box>
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              padding: 4,
            }}
          >
            <AccountMenu />
          </Box>
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
