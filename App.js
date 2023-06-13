import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './src/Screens/Welcome';
import Login from './src/Screens/Login';
import Signup from './src/Screens/Signup';
import Patient from './src/Screens/Patient';
import BookRoom from './src/Screens/BookRoom';
import Rooms from './src/Screens/Rooms';
import Appointment from './src/Screens/Appointment';
import Dortors from './src/Screens/Dortors';
import BookDoctor from './src/Screens/BookDoctor';
import Prescription from './src/Screens/Prescription';
import LabReport from './src/Screens/LabReport';
import XrayReport from './src/Screens/XrayReport';
import ForgetPasswor from './src/Screens/ForgetPasswor';
import RestPassword from './src/Screens/RestPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {PatientProvider} from './src/Context/PatientContext';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <PatientProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="Login" component={Login}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="Signup" component={Signup}
          options={
            {
              headerShown: false
            }
          }

        />

        <Stack.Screen name="Patient" component={Patient}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="BookRoom" component={BookRoom}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="Dortors" component={Dortors}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="Rooms" component={Rooms}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="Appointment" component={Appointment}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="BookDoctor" component={BookDoctor}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="Prescription" component={Prescription}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="XrayReport" component={XrayReport}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="LabReport" component={LabReport}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="ForgetPasswor" component={ForgetPasswor}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="RestPassword" component={RestPassword}
          options={
            {
              headerShown: false
            }
          }

        />

        

      </Stack.Navigator>
    </NavigationContainer>
    </PatientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
