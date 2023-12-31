import React from 'react';
import './pokemon.css'
import { Detail } from '../App';
import {useState,useEffect} from 'react';
interface Props{
    viewDetail:Detail;
    setDetail: React.Dispatch<React.SetStateAction<Detail>>
    name:string;
    id:number;
    image:string;
    abilities:{
        name:string;
        ability:string;
    }[]|undefined;
}
const PokemonList:React.FC<Props> = (props) => {
    const {name,id,image,abilities,viewDetail,setDetail}=props;
    const [isSelected,setSelected]= useState(false);
    useEffect(()=>{
             setSelected(id===viewDetail?.id);
    },[viewDetail])

    const closeDetail=()=>{
        setDetail({
            id:0,
            isOpened:false
        })
    }
    return (
        <div className="">
            {isSelected?(
                   <section className='pokemon-list-detailed'>
                    <div className='detail-container'>
                        <p className='detail-close' onClick={closeDetail}>
                            X
                        </p>
                        <div className='detail-info'>
                            <img src={image} className='detail-img'/>
                            <p className='detail-name'>{name}</p>
                        </div>
                        <div  className='detail-skill'>
                             <p className='detail-ability'>Abilities:</p>
                             {abilities?.map((ab:any)=>{
                return (
                    <div className="">
                      {ab.ability.name}
                    </div>
                )

               })}
                        </div>
                    </div>
                   </section>
            ):
            ( <section className='pokemon-list-container'>
            
            <p className='pokemon-name'>{name}</p>
            <img src={image} alt='pokemon'/>
            
            </section>)}
            
        </div>
    );
};

export default PokemonList;