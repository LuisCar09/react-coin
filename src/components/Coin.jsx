import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import { useParams } from 'react-router-dom';
const Coin =() => {
    const {id} = useParams()
    const path = id.split(':').join('')
   
    
    const [currencyCoin,setCurrencyCoin] = useState([])
    
    const fetchCoins = async () => {
        
        try {
            const getCoins = await axios.get('https://api.coincap.io/v2/assets/' + path)
            
            
            if (getCoins.status !== 200) {
                throw new Error(`Error fetching data from API`)
            }

            
            const {name,id,marketCapUsd,maxSuply,changePercent24Hr,rank,symbol,priceUsd,supply} = getCoins.data.data
            setCurrencyCoin({name,id,marketCapUsd,maxSuply,changePercent24Hr,rank,symbol,priceUsd,supply})
            
        } catch (error) {
            console.error(error.message);

        }

    }
    useEffect(()=> {
        fetchCoins()
    },[])
    

    
    return (
        <>
            <section>
            <table>
            <thead>
                <tr>
                    <th></th>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Precio</th> 
                    <th>24 h %</th>
                    <th>Cap. de Mercado</th>
                    <th>Acciones en circulacion</th>
                </tr>
            </thead>
            <tbody>
                
                    
                        <tr key={currencyCoin.id}>
                        <td> <GradeRoundedIcon color='primary' />  </td>
                        <td>{currencyCoin.rank}</td>
                        <td> {currencyCoin.name} {currencyCoin.symbol}</td>
                        
                        <td>{currencyCoin.priceUsd}</td>
                        <td>{currencyCoin.changePercent24Hr}</td>
                        <td>{currencyCoin.marketCapUsd}</td>
                        <td>{currencyCoin.supply}</td>
                       
                        </tr>
                   
              
                
            </tbody>
            </table>
        </section>
        </>
    )
}

export default Coin