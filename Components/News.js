import React, { Component } from 'react';
import { } from 'react-native';
import FilmList from './FilmList';
import { getBestFilmsFromApi } from '../API/TMDBApi'

class News extends Component {
  constructor(props) {
    super(props)
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      films: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this._loadFilms()
  }

  _loadFilms = () => {
    this.setState({ isLoading: true })
    getBestFilmsFromApi(this.page+1)
      .then(data => {
        this.page = data.page;
        this.totalPages = data.totalPages;
        this.setState({
          films: [...this.state.films, ...data.results ],
          isLoading: false
        })
      })
  }

  render() {
    return(
      <FilmList
        films={this.state.films}
        navigation={this.props.navigation}
        loadFilms={this._loadFilms}
        page={this.page}
        totalpages={this.totalPages}
        favoriteList={false}
      />
    )
  }
}

export default News;