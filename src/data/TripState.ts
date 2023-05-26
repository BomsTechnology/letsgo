export interface TripStateProps {
    label: string;
    value: string;
}

 const tripStates: TripStateProps[] = [
    {
        label: "Published",
        value: "published"
    },
    {
        label: "Reserved",
        value: "reserved"
    },
    {
        label: "Confirmed",
        value: "confirmed"
    },
    {
        label: "Completed",
        value: "completed"
    },
];

export default tripStates;