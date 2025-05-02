import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../movies-api";
import s from './MovieCast.module.css'

export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState(null); 
    

    
    useEffect(() => {
        const fetchCast= async () => {
            try {
                const cast = await getMovieCredits(movieId);
                
                setCast(cast.cast);
                
            } catch (error) {
                console.error(error);
            }
        };
        fetchCast();
    }, [movieId]);
    
    if (!cast) { return <div>No available</div>; }
    
    const base_url = 'https://image.tmdb.org/t/p/w200/';
    const defaultImg =  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
   

    return (
        <div>
            <ul className={s.castList}>
                {cast.map(actor => 
                    <li key={actor.credit_id} className={s.castItem}>
                        <img
                            className={s.castImage}
                            alt={actor.name} src={actor.profile_path ? `${base_url}${actor.profile_path}` : defaultImg} />
                        <div className={s.castText}> 
                        <p className={s.castName}>{actor.name}</p>
                            <p className={s.castName}><span className={s.span}>Character: </span>{actor.character}</p>
                            </div>
                    </li>
                )}
            </ul>
        </div>
    )
}