import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { getValue, subscribe } from '../features/session';

class LinksScreen extends React.Component {

  state = {
    marker: getValue('marker')
  }

  componentDidMount(){
    subscribe('marker', marker=> this.setState({ marker }));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.marker ? (
          <Text>{this.state.marker.latitude}N - {this.state.marker.longitude}E</Text>
        ) : null }
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
