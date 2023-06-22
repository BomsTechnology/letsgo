import PlannedAlert from "@screens/alert/PlannedAlert";
import DoneEvents from "@screens/alert/DoneEvents";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notification from "@screens/alert/Notification";


export type AlertNavigator = {
    PlannedAlerts: undefined;
    DoneEvents: undefined;
    Notification: undefined;
    
};

const Stack = createNativeStackNavigator<AlertNavigator>();


const StackNavigator = () => {
    return (
      <Stack.Navigator>
           <Stack.Screen name="PlannedAlerts" component={PlannedAlert} options={{ headerShown: false }} />
           <Stack.Screen name="DoneEvents" component={DoneEvents} options={{ headerShown: false }} />
           <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      </Stack.Navigator>
      );
    };
export default StackNavigator;