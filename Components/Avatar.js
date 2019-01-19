import React, { Component } from 'react';
import { connect } from  'react-redux';
import { StyleSheet, Image, TouchableOpacity , AppRegistry } from 'react-native';
import ImagePicker from 'react-native-image-picker';

class Avatar extends Component {

  _avatarClicked = () => {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
        console.log('L\'utilisateur à annulé')
      } else if (response.error) {
        console.log('Erreur :', response.error)
      } else {
        console.log({ uri: response.uri })
        let requireSource = { uri: response.uri }
        const action = { type: "SET_AVATAR", value: requireSource }
        this.props.dispatch(action)
      }
    })
  }

  render() {
    console.log(this.props.avatar)
    return(
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={this._avatarClicked}
      >
        <Image style={styles.avatar} source={this.props.avatar} />
      </TouchableOpacity>
    )
  }
}

AppRegistry.registerComponent('Avatar', () => Avatar);

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2
  }
})

const mapStateToProps = state => {
  return {
    avatar: state.setAvatar.avatar
  }
}

export default connect(mapStateToProps)(Avatar)