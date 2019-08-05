import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MapView } from 'expo';

import { MonoText } from '../components/StyledText';

import styles from './Home.styles';

import { publish } from '../features/session';

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

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this.incCount} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>
                The Count is at {this.state.count}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.addItem} activeOpacity={0.75}>
              <View style={styles.itemsList}>
                {
                  this.state.items.map((item, i)=> (
                    <Text style={styles.listItem} key={i}>{item}</Text>
                  ))
                }
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            This is a tab bar. You can edit it in:
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>
              navigation/MainTabNavigator.js
            </MonoText>
          </View>
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;
