import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const apiKey = process.env.TMDB_API_KEY;
const moviesPath = path.resolve('movies.json');

const exister = (path) => {
    let exist = true;
    try{
        fs.statSync(path)
    }catch (error){
        exist = false;
    }
    return exist;
};

const searchTypes = ['popular', 'top_rated', 'now_playing'];
const arg = process.argv[2];




(async () => {

    try{
        if(searchTypes.includes(arg)){
            const response = await fetch(`https://api.themoviedb.org/3/movie/${arg}?api_key=${apiKey}`);
            const obj = await response.json();
            const moviesJson = JSON.stringify(obj.results);
            fs.writeFileSync(moviesPath, moviesJson);  
            console.log('arg fetch')
        }

        else{
            if(!exister(moviesPath)){
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
                const obj = await response.json();
                const moviesJson = JSON.stringify(obj.results);
                fs.writeFileSync(moviesPath, moviesJson);  
                console.log('Fetch effettuato!')
        }}
    }catch(error){console.error(error)};
   
})()




