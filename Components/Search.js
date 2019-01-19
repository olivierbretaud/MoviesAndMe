import React, {Component} from  'react';
import { StyleSheet, View, TouchableOpacity, TextInput, ActivityIndicator, Text} from 'react-native';
import { connect } from 'react-redux'
import FilmList from './FilmList'
import { getMoviesFromApiOnSearch } from '../API/TMDBApi';

class Search extends Component {
  constructor(props) {
    super(props)
    this.page = 0,
    this.index = 0
    this.totalPages = 0,
    this.state = {
      films: [],
      searchedText: "",
      isLoading: false,
    }
  }

  _loadFilms = () => {
    if (this.state.searchedText.length > 0 ) {
      this.setState({ isLoading: true })
      getMoviesFromApiOnSearch(this.state.searchedText, this.page + 1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          films : [ ...this.state.films, ...data.results],
          isLoading: false
        })
        //render all the component on the methode call
      });
    } 
  }
  _setSearchedText = (text) => {
    this.setState({ searchedText: text})
  }

  _searchFilms = () => {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    }, () => {
      this._loadFilms()
    })
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

  render() {

    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder="Titre du Film"
          onChangeText={(text) => this._setSearchedText(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this._searchFilms()}
        >
          <Text style={styles.text_button}>Rechercher</Text>
        </TouchableOpacity>
        <FilmList
          films={this.state.films}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.page}
          totalPages={this.totalPages}
          favoriteList={false}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    padding: 5,
    justifyContent: 'center'
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    borderRadius: 15,
    marginBottom: 5,
    height: 40,
    fontSize: 15,
    fontWeight: 'bold',
    borderColor: '#8d8d8d',
    borderWidth: 1,
    color: "#912d98",
    textAlign: "center"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 15,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 3,
    backgroundColor: "#8d8d8d"
  },
  text_button: {
    fontWeight: 'bold',
		fontSize: 18,
		color: '#FFFFFF'
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}


export default connect(mapStateToProps)(Search);