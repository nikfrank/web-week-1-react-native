import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  ToastAndroid,
  Picker,
  Dimensions,
} from 'react-native';

import { getValue, publish, subscribe } from '../features/session';

const { height, width } = Dimensions.get('window');

class LinksScreen extends React.Component {

  state = {
    latlng: getValue('latlng'),
    title: '',
    description: '',
    icon: '',
  }

  componentDidMount(){
    subscribe('latlng', latlng=> this.setState({ latlng }));
  }

  setTitle = title => this.setState({ title })
  setDescription = description => this.setState({ description })
  setIcon = icon=> this.setState({ icon })


  addToMap = ()=> {
    publish('events', [
      ...(getValue('events') || []),
      {
        latlng: this.state.latlng,
        title: this.state.title,
        description: this.state.description,
        icon: this.state.icon,
      },
    ]);

    publish('latlng', undefined);
    this.setState({ latlng: undefined, title: '', description: '', icon: '' });

    ToastAndroid.show(
      'Adding event to map...',
      ToastAndroid.LONG,
    );

    setTimeout(()=> this.props.navigation.navigate('Home'), 2500);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.latlng ? (
          <Text>{this.state.latlng.latitude}N - {this.state.latlng.longitude}E</Text>
        ) : null }

        <TextInput
          style={styles.input}
          onChangeText={this.setTitle}
          value={this.state.title}
          placeholder='Title'
          placeholderTextColor='#227'
        />
        <TextInput
          style={styles.input}
          onChangeText={this.setDescription}
          value={this.state.description}
          placeholder='Description'
          placeholderTextColor='#227'
          multiline={true}
          numberOfLines={2}
        />

        <Picker
          selectedValue={this.state.icon}
          style={{height: 50, width }}
          onValueChange={this.setIcon}>
          <Picker.Item label="Bike" value="bike" />
          <Picker.Item label="Animal" value="animal" />
        </Picker>

        <Button
          onPress={this.addToMap}
          style={styles.hoverButton}
          title="Add to Map"
          color="#841584"
          accessibilityLabel="Add to Map"
          disabled={!this.state.latlng ||
                    !this.state.title ||
                    !this.state.description ||
                    !this.state.icon}
        />
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
  input: {
    margin: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  hoverButton: {
    marginTop: 5,
    height: 80,
  },
});
