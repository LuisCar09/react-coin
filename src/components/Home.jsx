// - La subruta `/` renderizará el componente `Home`. Este componente mostrará la lista de las principales criptomonedas del mercado.
// 2. **Home:**

import axios from "axios";
import { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import Row from "./tableRow/Row";
// El componente `Home` es el componente principal de nuestra aplicación. Este componente muestra la lista de las principales criptomonedas del mercado. Para ello, hace una petición a la API de CoinCap y muestra la información de las criptomonedas en una lista. Cada elemento de la lista es un enlace a la ruta `/coin/:id`, donde `:id` es el identificador de la criptomoneda.

const Home = () => {
    const [coins,setCoins] = useState([])
  
    const fetchCoins = async () => {
        
        try {
            const getCoins = await axios.get('https://api.coincap.io/v2/assets/')
            // const isCliked
            
            if (getCoins.status !== 200) {
                throw new Error(`Error fetching data from API`)
            }

            setCoins(getCoins.data.data)
            
            
            
        } catch (error) {
            console.error(error.message);

        }

    }
    const addToFavorites = (currencyCoin) => {
        const existCoins = localStorage.getItem('coins', currencyCoin)
        // setIsClicked(prevValue => !prevValue)
        const favorites = !existCoins ? [] : JSON.parse(existCoins)
        const isAlreadySaved = favorites.findIndex(fav => fav.name === currencyCoin.name)

        if (isAlreadySaved === -1) {
            favorites.push(currencyCoin)
            localStorage.setItem('coins', JSON.stringify(favorites))
        }else{
            localStorage.setItem('coins', JSON.stringify(favorites.filter(fav => fav.name !==  currencyCoin.name)))
        }
        

    }
    
    
    useEffect(() => {
        fetchCoins()
    }, [])
    return (
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
                    {/* <th>Favorites</th> */}
                </tr>
            </thead>
            <tbody>
                {coins.map(coin => {
                    const {name,id,marketCapUsd,changePercent24Hr,rank,symbol,priceUsd,supply} = coin
                    const properties = { name, id, marketCapUsd, changePercent24Hr, rank, symbol, priceUsd, supply }
                    return (
                        <Row key={id} addToFavoritesFunction={addToFavorites} {...properties}/>
                    )
                })}
                
            </tbody>
            </table>
        </section>
    )
}

export default Home;

{/* <tr key={id}>
<td> <GradeRoundedIcon color={isCliked ? 'primary' : 'inherit'} onClick={() => addToFavorites(id)}/> </td>
<td>{rank}</td>
<td><Link to={`/coin/:${id}`} > {name} {symbol}</Link></td>

<td>$ {parseFloat(priceUsd).toFixed(2)}</td>
<td>{parseFloat(changePercent24Hr).toFixed(2)}</td>
<td>{ parseInt(marketCapUsd).toFixed(0) }</td>
<td>{parseInt(supply)}</td>

</tr> */}