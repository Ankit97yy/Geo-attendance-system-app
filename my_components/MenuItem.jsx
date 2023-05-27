import * as React from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';


const MenuItem = () => {
  const [visible, setVisible] = React.useState(false);
  console.log("🚀 ~ file: MenuItem.jsx:7 ~ MenuItem ~ visible:", visible)

  const openMenu = async() => {
      await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Look at that notification',
            body: "I'm so proud of myself!",
          },
          trigger:null,
        });

  };

  const closeMenu = () => setVisible(false);
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Button onPress={openMenu}>Show menu</Button>
    {/* <Provider>
      <View
        style={{
        //   paddingTop: 50,
        //   flexDirection: 'row',
        //   justifyContent: 'center',
          backgroundColor:'red',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={{x:400,y:0}}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </Provider> */}
    </View>

  );
};

export default MenuItem;