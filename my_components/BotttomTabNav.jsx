import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Vict from "./Victory";
import Employees from "./Employees";
import Approvedrequest from "./Approvedrequest";
import EmpProfile from "./EmpProfile";
import MenuItem from "./MenuItem";
import MarkAtt from "./MarkAtt";
  const Tab = createMaterialBottomTabNavigator();
  const BottomTabNav=()=>{
    return(
          <Tab.Navigator barStyle={{backgroundColor:'white',borderColor:'black',borderTopWidth:1}} shifting={true}>
            <Tab.Screen
              options={{
                tabBarIcon: ({ focused,color }) => (
                  <MaterialCommunityIcons name="google-maps" color={focused?"white":color} size={26}/>
                ),
                title: "Punch",
                
              }}
              name="MarkAtt"
              component={MarkAtt}
            />
            <Tab.Screen
              options={{
                tabBarIcon: ({ focused,color }) => (
                  <MaterialCommunityIcons name="view-list" color={focused?"white":color} size={26}/>
                ),
                title: "Records",
                
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
                tabBarIcon: ({ focused,color }) => (
                  <MaterialCommunityIcons
                    name="account"
                    color={focused?"white":color}
                    size={26}
                  />
                ),
              }}
              name="Profile"
              component={EmpProfile}
            />
          </Tab.Navigator>
    )
  }
  export default BottomTabNav;