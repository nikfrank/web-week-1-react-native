import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Button,
  ToastAndroid,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import { MonoText } from '../components/StyledText';
import styles from './Home.styles';
import { publish, subscribe } from '../features/session';

import bike from '../bike.png';
import deadCat from '../dead-cat.png';

const { height, width } = Dimensions.get('window');

class HomeScreen extends React.Component {

  state = {
    count: 0,
    items: [],
  }

  incCount = ()=> this.setState({ count: this.state.count + 1 }, ()=>{
    publish('count', this.state.count);

    if( this.state.count >= 10 )
      this.props.navigation.navigate('Links');
  })

  addItem = ()=> this.setState(state => ({ items: [...state.items, Math.random()] }))

  flyToTLV = ()=> {
    this.map.animateToRegion({
      latitude: 32.0805,
      longitude: 34.7794,
      latitudeDelta: 0.0615,
      longitudeDelta: 0.0281,
    }, 100)
  }

  addMarker = (event)=> {
    publish('latlng', event.nativeEvent.coordinate);

    ToastAndroid.show(
      'Recording event location...',
      ToastAndroid.LONG,
    );

    setTimeout(()=> this.props.navigation.navigate('Links'), 2500);

  }

  componentDidMount(){
    subscribe('latlng', marker=> this.setState({ marker }));

    subscribe('events', events=> this.setState({ events }));
  }

  render() {
    const { events=[] } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          style={{ height: height - 100, width }}
          ref={map => this.map = map}
          initialRegion={{
            latitude: 32.0805,
            longitude: 34.7794,
            latitudeDelta: 0.0615,
            longitudeDelta: 0.0281,
          }}
          onLongPress={this.addMarker}>

          {this.state.marker ? (
            <Marker
              coordinate={this.state.marker}
              title='blah'
              description={'hmm'}
            />
          ) : null }

          {events.map((event, i)=> (
            <Marker
              key={i}
              coordinate={event.latlng}
              title={event.title}
              description={event.description}
            >
            <Image source={ (event.icon === 'bike') ? bike : deadCat} style={{ height: 35, width: 35 }}/>
          </Marker>
          ))}

        </MapView>
        <Button
          onPress={this.flyToTLV}
          style={styles.hoverButton}
          title="TLV"
          color="#841584"
          accessibilityLabel="Fly to TLV"
        />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;
