import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Alert, Platform } from 'react-native'
import { getFilmDetailsFromApi, getFilmCreditsFromApi } from '../API/TMDBApi'
import { connect } from 'react-redux'
import EnLargeHeart from '../Animations/EnlargeHeart'

class FilmDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      filmCredit: undefined,
      isLoading: true
    }
  }

  _displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
         <ActivityIndicator size='large' />
        </View>
      )
    }
  }
  
  componentDidMount() {

    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
    if (favoriteFilmIndex !== -1) {
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex],
        isLoading: false
      })
    }

    getFilmDetailsFromApi(this.props.navigation.state.params.idFilm)
    .then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
    })

    getFilmCreditsFromApi(this.props.navigation.state.params.idFilm)
    .then(data => {
      this.setState({
        filmCredit: data,
        isLoading: false
      })
    })
  }

  _displayFilmDirectors() {
    if (this.state.filmCredit !== undefined) {
      return (
        <Text style={styles.text_director_actor}>Réalisateur(s):
          {this.state.filmCredit.crew.map((dir) => {
            if (dir.job === "Director") {
              return  " " + dir.name + " "
            }
          })}
        </Text>
      )
    }
  }

  _displayFilmActors() {
    if (this.state.filmCredit !== undefined) {
      return (
        <Text style={styles.text_director_actor}>Acteurs:
        {this.state.filmCredit.cast.map((actor) => {
          if (actor.order < 8 ) {
            return  " " + actor.name + " "
          }
        })}
        </Text>
      )
    }
  }

  _shareFilm() {
    const { film } = this.state
    const titleUpperCase = film.title
    const messageToSubmit = `Voilà un film qui pourrait te plaire ;) \n ${titleUpperCase.toUpperCase()} \n synopsis:"${film.overview}"`

    Share.share({title: film.title, message: messageToSubmit })
      .then(
        Alert.alert(
          'Succés',
          'Film partagé',
          [
            {text: 'OK', onPress: () => {}},
          ]
        )
      )
      .catch(err =>
        Alert.alert(
          'Echec',
          'Film non partagé',
          [
            {text: 'OK', onPress: () => {}},   
          ]
        )
      )
  }

  _displayFloatingButton() {
    const { film } = this.state
    if (film !== undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingButton}
          onPress={() => this._shareFilm()}>
            <Image
              style={styles.share_image}
              source={require('../Images/share.android.png')}/>
        </TouchableOpacity>
      )
    }
  }

  _toggleFavorite() {
    const action = {type: 'TOGGLE_FAVORITE', value: this.state.film}
    this.props.dispatch(action)
  }

  _displayFilmFavoriteImage() {
    let sourceImage = require('../Images/love-grey.png');
    let shouldEnLarge = false;
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      sourceImage = require('../Images/love-purple.png')
      shouldEnLarge = true
    }
    return (
      <EnLargeHeart
        shouldEnLarge={shouldEnLarge} >
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      </EnLargeHeart>
    )
  }

  _displayFilm() {
    if (this.state.film !== undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
        <View style={styles.poster_container}>
          <Image
            source={{uri: "https://image.tmdb.org/t/p/w500" + this.state.film.poster_path}}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.title_text}>{this.state.film.title}</Text>
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}>
            {this._displayFilmFavoriteImage()}
          </TouchableOpacity>
          <View style={styles.text_container}>
            <Text style={styles.vote_text}>Note : {this.state.film.vote_average}</Text>
            <Text>Date de sortie : {this.state.film.release_date}</Text>
            <Text>Durée : {this.state.film.runtime} min</Text>
            <Text style={styles.text_MoviesStyles}> 
              {this.state.film.genres.map((genre) => {
                return genre.name;
              }).join(" / ")}
            </Text>
            <Text style={styles.text_main}>{this.state.film.overview}</Text>
            {this._displayFilmDirectors()}
            {this._displayFilmActors()}
          </View>
        </View>
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
        {this._displayFloatingButton()}
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action)}
  }
}

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmDetails);

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  scrollview_container:{
    flex: 1,
  },
  poster_container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text_container: {
    paddingLeft: 40,
    paddingRight: 40,
    alignItems: 'center',
  },
  text_MoviesStyles: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text_main: {
    paddingTop: 20,
    paddingBottom:10,
    textAlign: 'center',
  },
  text_director_actor: {
    paddingTop: 10,
    paddingBottom:10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image:{
    resizeMode: 'cover',
    width: '100%',
    height: 300,
  },
  favorite_container: {
    alignItems: 'center'
  },
  favorite_image:{
    flex: 1,
    margin: 2,
    width: null,
    height: null
  },
  share_touchable_floatingButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 30,
    top: 30,
    borderRadius: 30,
    backgroundColor: '#912d98',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 20,
    height: 20
  },
  title_text: {
    paddingLeft: 20,
    paddingRight: 20,
		fontFamily: 'OleoScript-Bold',
		fontWeight: 'bold',
		fontSize: 24,
		flex: 1,
		color: '#912d98',
    flexWrap: 'wrap',
    textAlign: 'center'
  },
  vote_text:{
		fontWeight: 'bold',
		fontSize: 20,
		color: '#8d8d8d'
	}

})