export interface AlertStateProps {
    label: string;
    value: string;
}

const alertStates: AlertStateProps[] = [
    {
        label: "Planned Alerts",
        value: "planned alerts"
    },
    {
        label: "Done Events",
        value: "doneevents"
    },
    {
        label: "Notifications",
        value: "notifications"
    },
];

export default alertStates;