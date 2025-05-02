import { useEffect, useState, useRef } from "react";
import { NavLink, useParams, Outlet, Link, useLocation, } from "react-router-dom";
import { getMovieDetails } from "../../movies-api";
import s from "./MovieDetailsPage.module.css";


export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const location = useLocation();
    const goBackRef = useRef(location.state?.from ?? '/movies');
    
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const movieDetails = await getMovieDetails(movieId);
                setMovieDetails(movieDetails);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDetails();
    }, [movieId]);
    

    if (!movieDetails) {return <div>Loading...</div>;}
 
    const base_url = 'https://image.tmdb.org/t/p/w500/';
    const defaultImg =  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
     return (
        <div>
            <Link  className={s.goBackBtn} to={goBackRef.current}>Go back</Link>
            
            <div className={s.detailsWrapper}>
                <img 
                    className={s.poster} 
                    alt={movieDetails.title} 
                    src={movieDetails.backdrop_path ? `${base_url}${movieDetails.backdrop_path}` : defaultImg}
                />
                
                <div className={s.infoWrapper}>
                    <h2 className={s.title}>{movieDetails.title || movieDetails.name} ({movieDetails.release_date.slice(0, 4)})</h2>
                    <p className={s.vote}><span className={s.span}>User score:</span> {(movieDetails.vote_average * 10).toFixed(1)}%</p>
                    <p className={s.overview}><span className={s.span}>Overview:</span> {movieDetails.overview}</p>
                    <p className={s.genres}><span className={s.span}>Genres:</span> {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
                </div>
            </div>


            <div className={s.additionalInfoWrapper}>
                <div className={s.additionalInfo}>
                    <h3>Additional information</h3>
                    <nav>
                        <NavLink to="cast"  className={({ isActive }) => isActive ? s.activeLink : s.link} state={{ from: goBackRef.current }}>Cast</NavLink>
                        <NavLink to="reviews"  className={({ isActive }) => isActive ? s.activeLink : s.link} state={{ from: goBackRef.current }}>Reviews</NavLink>
                    </nav>
                </div>
            </div>

            <Outlet />
        </div>
    );
}