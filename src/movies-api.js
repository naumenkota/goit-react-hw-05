import axios from 'axios';

const url = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDgyMzU2YzBlNDRkMzRkYWQ5YWE5YjJkZTk1MWZjNiIsIm5iZiI6MS43NDYwOTg2Nzk3MTgwMDAyZSs5LCJzdWIiOiI2ODEzNTlmN2RlMDI4NDcyNjdhMGYyMjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.W4MhFxdJOD4lGgnnB1aG6tKI-7k_fqPvIByUXPrDrko'
  }
};

  
export const getTrendingMovies = async () => {
    const response = await axios.get(`${url}/trending/movie/day`, options);
    return response.data;
}

export const searchMovies = async query => {
    const response = await axios.get(`${url}/search/movie`, {
        ...options,
        params: {
            query,
            include_adult: false,
            language: 'en-US',
            page: 1,
        },
    });
    return response.data;
}

export const getMovieDetails = async movieId => {
    const response = await axios.get(`${url}/movie/${movieId}`, options);
    return response.data;
}

export const getMovieCredits = async movieId => {
    const response = await axios.get(`${url}/movie/${movieId}/credits`, options);
    return response.data;
}

export const getMovieReviews = async movieId => {
    const response = await axios.get(`${url}/movie/${movieId}/reviews`, options);
    return response.data;
}