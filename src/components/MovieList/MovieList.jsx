import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

export default function MovieList({ movies }) {
    const location = useLocation();
     const base_url = 'https://image.tmdb.org/t/p/w500/';
    const defaultImg =  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
   
    return (
        <div>
            <ul className={s.movieList}>
                {movies.map(movie => (
                    <li key={movie.id} className={s.movieItem}>
                        <Link to={`/movies/${movie.id}`} state={{ from: location }} className={s.movieLink}>
                            <div className={s.movieImageContainer}>
                                <img 
                                    className={s.movieImage} 
                                    alt={movie.title || movie.name} 
                                    src={movie.backdrop_path ? `${base_url}${movie.backdrop_path}` : defaultImg} 
                                />
                            </div>
                            <div className={s.title}>
                                {movie.title || movie.name}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}