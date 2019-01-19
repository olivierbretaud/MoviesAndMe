import React, { PureComponent } from 'react';
import {StyleSheet, FlatList} from 'react-native';
import { connect } from 'react-redux';

import FilmItem from './FilmItem'

class FilmList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      films: []
    }
  }

  _setIndex = () => {
    this.index = this.index + 1
    return this.index.toString()
  }

  _displayDetailsForFilm = (id) => {
    this.props.navigation.navigate("FilmDetails", {idFilm: id})
  }

  render() {
    return (
      <FlatList
        enableEmptySections={true}
        data={this.props.films}
        keyExtractor={() => this._setIndex()}
        // legacyImplementation={true}
        //key must be a string on react native
        renderItem={({item}) =>
          <FilmItem
            film={item}
            isFilmFavorite={(this.props.favoritesFilm.findIndex( film => film.id === item.id) !== -1) ? true : false}
            displayDetails={this._displayDetailsForFilm}/>}

      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
          this.props.loadFilms()
        }
      }}
    />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = (state) => ({
  favoritesFilm: state.toggleFavorite.favoritesFilm
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmList)
