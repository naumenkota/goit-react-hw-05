import { searchMovies } from "../../movies-api";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') ?? '';
    const [searchMovie, setSearchMovie] = useState(null);

    useEffect(() => {
        const fetchSearchMovie = async () => {
            try {
                const searchMovie = await searchMovies(query);
                setSearchMovie(searchMovie.results);
               
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchSearchMovie();
    }, [query]);

    const handleChangeQuery = newValue => {
        if (!newValue) {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('query');
            return setSearchParams(newParams);
        }
        const newParams = new URLSearchParams(searchParams);
        newParams.set('query', newValue);
        setSearchParams(newParams);
    }
   
     
    return (
        <div>   
        <SearchBar onSubmit={handleChangeQuery} /> 
        {query && searchMovie && (
         searchMovie.length > 0 ? (
    <MovieList movies={searchMovie} />
  ) : (
    <div>No movies found</div>
  )
)}
            </div>
    )
}