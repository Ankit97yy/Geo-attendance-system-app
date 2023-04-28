import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const Fab = ({screen,navigation}) => (
  <FAB
    icon="plus"
    animated={true}
    color="white"
    style={styles.fab}
    onPress={() => navigation.navigate(screen)}
  />
);

//TODO:


const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 10,
    backgroundColor:'navy',
    color:'white'
  },
})


export default Fab;