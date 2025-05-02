import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../movies-api";
import s from './MovieReviews.module.css';

export default function MovieReviews() {
     const { movieId } = useParams();
    const [reviews, setReviews] = useState(null); 

    
    useEffect(() => {
        const fetchReviews= async () => {
            try {
                const reviews = await getMovieReviews(movieId);
                setReviews(reviews.results);
                
            } catch (error) {
                console.error(error);
            }
        };
        fetchReviews();
    }, [movieId]);
    
    if (!reviews || reviews.length === 0) {
  return <div>No reviews available</div>;
}
    
    return (
        <div>
            <ul className={s.reviewList}>
                {reviews.map(review =>
                    <li className={s.reviewItem} key={review.id}>
                        <p className={s.reviewAuthor}><span className={s.span}>Author: </span>{review.author}</p>
                        <p className={s.reviewContent}>{review.content}</p>
                   </li>
               )} 
          </ul>
        </div>
    )
}