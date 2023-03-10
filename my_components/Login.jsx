import * as React from 'react';
import { TextInput,Text } from 'react-native-paper';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const Login
 = () => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
      label="Email"
      value={text}
      onChangeText={text => setText(text)}
      mode='outlined'
      right={<Text>hhhh</Text>}
    />
  );
};

export default Login;