import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Vict from "./Victory";
import Login from "./Login";
import Employees from "./Employees";
import LeaveRequest from "./LeaveRequest";
  const Tab = createMaterialBottomTabNavigator();
  const BottomTabNav=()=>{
    return(
          <Tab.Navigator shifting={true} barStyle={{}}>
            <Tab.Screen
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26}/>
                ),
                title: "Home",
              }}
              name="Vict"
              component={Vict}
            />
            <Tab.Screen
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="calendar-check"
                    color={color}
                    size={26}
                  />
                ),
                // tabBarBadge: 2,
                // tabBarBadgeStyle: { backgroundColor: 'grey', color: 'white' },
              }}
              name="Login"
              component={Login}
            />
               <Tab.Screen
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="file-document-edit-outline"
                    color={color}
                    size={26}
                  />
                ),
              }}
              name="Leaves"
              component={LeaveRequest}
            />
               <Tab.Screen
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={26}
                  />
                ),
              }}
              name="Employees"
              component={Employees}
            />
          </Tab.Navigator>
    )
  }
  export default BottomTabNav;