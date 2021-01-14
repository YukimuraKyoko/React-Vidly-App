import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
    state = {  
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage:1,
        sortColumn: {path: 'title', order: 'asc'}
    }

    //This method will be called when an instance of this component
    //is rendered in the DOM
    //This initializes the state properties
    componentDidMount(){
        const genres = [{_id:"", name: 'All Genres'},...getGenres()];
        this.setState({movies: getMovies(), genres});
    }
    
    handleDelete = (movie) => {

        //filter method is to get all the movies except the movie clicked (movie._id)
        const movies = this.state.movies.filter(m => m._id !== movie._id);

        //updating our state
        this.setState({ movies});
    };
    
    handleLike = (movie) => {
        //Clone the movies array
        const movies = [...this.state.movies];
        //Obtain that single movie we're getting as our index
        const index = movies.indexOf(movie);
        //Clone that single movie in the array
        movies[index] = {...movies[index]};
        //Toggle the like property; true->false and false->true
        movies[index].liked = !movies[index].liked;
        //update the state by replacing the whole movies array
        this.setState({movies});
    };

    handlePageChange = page =>{
        //set CurrentPage to the page clicked
        this.setState({currentPage: page})
    }

    handleGenreSelect = genre => {
        //We have to reset current page to 1 whenever we switch 
        //Genres, or else if it's not 1, then no lists will be shown
        //If selected genre was fewer than 2 pages.
        this.setState({selectedGenre: genre, currentPage: 1});
    };

    handleSort = sortColumn => {
        
        this.setState({ sortColumn})
    }

    render() { 
        //Object Destructuring
        const {length: count} = this.state.movies;
        const {
            pageSize,
            selectedGenre, 
            currentPage, 
            movies: allMovies,
            sortColumn,
        } = this.state;

        if(count === 0){
            return <p>There are no movies in the database</p>
        }
        
        //Filtering: If selectedGenre is true or there,
        // get all movies and filter them
        // if the genre of each movie is not equal to the selected genre
        // then we set this filtered list to allMovies
        //
        // For "All Genres": If selectedGenre && selectedGenre._id is true
        // Then we get a filtered array, otherwise we get All the movies
        const filtered = 
        selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        
        const sorted = _.orderBy(filtered, [sortColumn.path], sortColumn.order)

        const movies = paginate(sorted, currentPage, pageSize);


        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup 
                    items={this.state.genres}
                    selectedItem={this.state.selectedGenre}
                    onItemSelect={this.handleGenreSelect}></ListGroup>
                </div>
                <div className="col">
                    <p>Showing {filtered.length} movies in the database.</p>
                    <MoviesTable
                    movies={movies}
                    sortColumn={sortColumn}
                    onLike={this.handleLike}
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}
                    >
                        
                    </MoviesTable>
                    
                    <Pagination itemsCount={filtered.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange} />

                </div>
            
            </div>)
    }
}
 
export default Movies;