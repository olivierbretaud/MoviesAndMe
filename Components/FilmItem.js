import React, {Component}  from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import FadeIn from '../Animations/FadeIn';

class FilmItem extends Component {

	_displayFavoriteImage() {
		if (this.props.isFilmFavorite) {
			return (
				<Image
					style={styles.favorite_image}
					source={require('../Images/love-purple.png')}
				/>
			)
		}
	}

  render() {
		const film = this.props.film
		const displayDetails = this.props.displayDetails
		return (
			<FadeIn>
				<TouchableOpacity
					onPress = {() => displayDetails(film.id)}
					style={film.poster_path !== null && film.overview.length > 0 ? styles.main_container : styles.displayNone}>
					<Image
						source={{uri: "https://image.tmdb.org/t/p/w500" + film.poster_path}}
						style={styles.image}
					/>
					<View style={styles.content_container}>
						<View style={styles.header_container}>
						  <Text style={styles.title_text}>{film.title}</Text>
							{this._displayFavoriteImage()}
							<Text style={styles.vote_text}>{film.vote_average}</Text>
						</View>
						<View style={styles.descritption_container}>
							<Text style={styles.descritption_text} numberOfLines={6}>{film.overview}</Text>
						</View>
						<View style={styles.date_container}>
							<Text style={styles.date_text}>Sorti le {film.release_date}</Text>
						</View>
					</View>
				</TouchableOpacity>
			</FadeIn>
		)

  }
}


const styles = StyleSheet.create({
	displayNone: {
		display: "none"
	},
	main_container: {
		height: 190,
		flexDirection:'row'
	},
	image:{
		width: 120,
		height: 180,
		margin: 5,
	},
	content_container: {
		flex: 1,
		margin: 5
	},
	header_container: {
		flex: 3,
		flexDirection: 'row'
	},
	title_text: {
		fontFamily: 'OleoScript-Bold',
		fontWeight: 'bold',
		fontSize: 21,
		flex: 1,
		color: '#912d98',
		flexWrap: 'wrap',
		paddingRight: 5
	},
	vote_text:{
		fontWeight: 'bold',
		fontSize: 24,
		color: '#8d8d8d'
	},
	descritption_container: {
		flex: 7,
	},
	descritption_text: {
		fontStyle: 'italic',
		color: "#666666"
	},
	date_container: {
		flex: 1,
	},
	date_text:{
		textAlign: 'right',
		fontSize: 14
	},
	favorite_image:{
		width: 25,
		height: 25,
		margin: 5
	}
})

export default FilmItem;