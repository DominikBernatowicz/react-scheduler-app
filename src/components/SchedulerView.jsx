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
import { initialData } from "../data/data";
import { useState } from "react";

const messages = {
  today: "Dziś",
};

const appointmentFormMessages = {
  detailsLabel: 'Szczegóły',
  allDayLabel: 'Cały dzień',
  titleLabel: "Tytuł",
  commitCommand: 'Zapisz',
  moreInformationLabel: 'Więcej informacji',
  repeatLabel: 'Powtórz',
  notesLabel: 'Notatki',
  never: 'Nigdy',
  daily: 'Dziennie',
  weekly: 'Tygodniowo',
  monthly: 'Miesięcznie',
  yearly: 'Rocznie',
  repeatEveryLabel: 'Powtarzaj co',
  daysLabel: 'dzień/dni',
  endRepeatLabel: 'Koniec powtarzania',
  onLabel: 'W dniu',
  afterLabel: 'Po',
  occurrencesLabel: 'wystąpieniu',
  weeksOnLabel: 'tygodniach w dniu:',
  monthsLabel: 'miesiącach',
  ofEveryMonthLabel: 'każdego miesiąca',
  theLabel: 'W',
  firstLabel: 'Pierwszy',
  secondLabel: 'Drugi',
  thirdLabel: 'Trzeci',
  fourthLabel: 'Czwarty',
  lastLabel: 'Ostatni',
  yearsLabel: 'latach',
  ofLabel: 'z',
  everyLabel: 'Każde'
};

const confirmationDialogMessages = {
  discardButton: 'Odrzuć',
  deleteButton: 'Usuń',
  cancelButton: 'Anuluj',
  confirmDeleteMessage: 'Czy na pewno chcesz usunąć tę wizytę?',
  confirmCancelMessage: 'Odrzucić niezapisane zmiany?'
}

const SchedulerView = () => {
  const [currentDate, setCurrentDate] = useState("2018-07-01");
  const [currentView, setCurrentView] = useState("Week");
  const [data, setData] = useState(initialData);
  const [addedAppointment, setAddedAppointment] = useState({});
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const [editingAppointment, setEditingAppointment] = useState(undefined);

  const onCommitChanges = ({ added, changed, deleted }) => {
    setData((prevData) => {
      let newData = prevData;

      if (added) {
        const startingAddedId =
          prevData.length > 0 ? prevData[prevData.length - 1].id + 1 : 0;
        newData = [...prevData, { id: startingAddedId, ...added }];
      }

      if (changed) {
        newData = prevData.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }

      if (deleted !== undefined) {
        newData = prevData.filter((appointment) => appointment.id !== deleted);
      }

      return newData;
    });
  };

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
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
          currentViewName={currentView}
          onCurrentViewNameChange={setCurrentView}
        />

        <DayView startDayHour={9} endDayHour={18} displayName="Dzień" />
        <WeekView startDayHour={10} endDayHour={19} displayName="Tydzień" />
        <MonthView displayName="Miesiąc" />

        <Toolbar />
        <DateNavigator />
        <TodayButton messages={messages} />
        <ViewSwitcher />

        <AllDayPanel />
        <EditRecurrenceMenu />
        <ConfirmationDialog messages={confirmationDialogMessages} />

        <Appointments />
        <AppointmentTooltip
          showCloseButton
          showOpenButton
          showDeleteButton
        />
        <AppointmentForm messages={appointmentFormMessages} />
      </Scheduler>
    </Card>
  );
};

export default SchedulerView;
