import { useEffect } from "react";
import { useState } from "react";
import { getTrendingMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css"

export default function HomePage () {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movies = await getTrendingMovies();
                setMovies(movies.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div>
            <h1 className={s.title}>Trending today</h1>
             <MovieList movies={movies} />
        </div>
        
    );
};