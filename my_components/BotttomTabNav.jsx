import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Vict from "./Victory";
import Employees from "./Employees";
import Approvedrequest from "./Approvedrequest";
import EmpProfile from "./EmpProfile";
import MenuItem from "./MenuItem";
  const Tab = createMaterialBottomTabNavigator();
  const BottomTabNav=()=>{
    return(
          <Tab.Navigator barStyle={{backgroundColor:'white',borderColor:'black',borderTopWidth:1}} shifting={true}>
            <Tab.Screen
              options={{
                tabBarIcon: ({ focused,color }) => (
                  <MaterialCommunityIcons name="home" color={focused?"white":color} size={26}/>
                ),
                title: "Home",
                
              }}
              name="Vict"
              component={Vict}
            />
            
               <Tab.Screen
              options={{
                tabBarIcon: ({focused, color }) => (
                  <MaterialCommunityIcons
                    name="file-document-edit-outline"
                    color={focused?"white":color}
                    size={26}
                  />
                ),
              }}
              name="Leaves"
              component={Approvedrequest}
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
              component={MenuItem}
            />
          </Tab.Navigator>
    )
  }
  export default BottomTabNav;