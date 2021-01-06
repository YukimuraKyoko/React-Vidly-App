import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './common/like'
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';

class Movies extends Component {
    state = {  
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage:1
    }

    //This method will be called when an instance of this component
    //is rendered in the DOM
    componentDidMount(){
        this.setState({movies: getMovies(), genres: getGenres()});
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
        this.setState({selectedGenre: genre})
    };

    render() { 
        //Object Destructuring
        const {length: count} = this.state.movies;
        const {pageSize,selectedGenre, currentPage, movies: allMovies} = this.state;

        if(count === 0){
            return <p>There are no movies in the database</p>
        }
        
        //Filtering: If selectedGenre is true or there,
        // get all movies and filter them
        // if the genre of each movie is not equal to the selected genre
        // then we set this filtered list to allMovies
        const filtered = 
        selectedGenre ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const movies = paginate(filtered,currentPage, pageSize);


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
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Stock</th>
                                <th>Rate</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                <Like liked={movie.liked} 
                                onClick={() => this.handleLike(movie)}/>  
                                </td>
                                <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger bth-sm">Delete</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Pagination itemsCount={filtered.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange} />

                </div>
            
            </div>)
    }
}
 
export default Movies;