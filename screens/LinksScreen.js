import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import { getValue, subscribe } from '../features/session';

class LinksScreen extends React.Component {

  state = {
    count: getValue('count') || 0
  }

  componentDidMount(){
    subscribe('count', count=> this.setState({ count }));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>{this.state.count}</Text>
        <ExpoLinksView />
      </ScrollView>
    );
  }
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

export default LinksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
