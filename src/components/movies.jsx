import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like'
class Movies extends Component {
    state = {  
        movies: getMovies()
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

    render() { 
        const {length: count} = this.state.movies;
        
        if(count === 0)
            return <p>There are no movies in the database</p>


        return (
            <React.Fragment>
            <p>Showing {count} movies in the database.</p>
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
                { this.state.movies.map(movie => (
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
            </React.Fragment>)
    }
}
 
export default Movies;