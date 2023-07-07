import React from 'react';

import './App.css';
import axios from 'axios';
import {useState,useEffect} from 'react';
import PokemonCollection from './components/PokemonCollection';
import { Pokemon } from './interface';

interface Pokemons {
  name:string;
  url:string;
}

export interface Detail {
  id:number;
  isOpened:boolean;
}


const App:React.FC =()=> {
  const[pokemons,setPokemons]= useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl]= useState<string>("");
  const [loading,setLoading]= useState<boolean>(true);
  const [viewDetail,setDetail]= useState<Detail>({
    id:0,
    isOpened:false,
  })
  useEffect(()=>{
      const getPokemon= async()=>{
        const res= await axios.get("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20");
        setNextUrl(res.data.next);
        res.data.results.forEach(async(pokemon:Pokemons)=>{
          const poke= await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          
          setPokemons((p)=>[...p,poke.data])
          setLoading(false);
        })
      };
      getPokemon();
      
  },[])

  const nextPage = async ()=>{
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async(pokemon:Pokemons)=>{
      const poke= await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setPokemons((p)=>[...p,poke.data])
      setLoading(false);
    })
  }
  return (
    <div className="container">
       <header className='pokemon-header'>Pokemon</header>
       <PokemonCollection pokemons={pokemons} viewDetail={viewDetail} setDetail={setDetail}></PokemonCollection>
       {!viewDetail.isOpened&&(<div className='btn'>
         <button onClick={nextPage}> {loading? "Loading ...":"Load more"}</button>
       </div>)
       }
       
    </div>
  );
}

export default App;
