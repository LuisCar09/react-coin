import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Row from "./tableRow/Row";
const Favorites = () => {
    
    const [coins,setCoins] = useState(JSON.parse(localStorage.getItem('coins')))
    const addToFavorites = (currencyCoin) => {
        
        const existCoins = localStorage.getItem('coins', currencyCoin)
        
        const favorites = !existCoins ? [] : JSON.parse(existCoins)
        const isAlreadySaved = favorites.findIndex(fav => fav.name === currencyCoin.name)

        if (isAlreadySaved === -1) {
            favorites.push(currencyCoin)
            localStorage.setItem('coins', JSON.stringify(favorites))
            setCoins(JSON.parse(localStorage.getItem('coins')))
        }else{
            localStorage.setItem('coins', JSON.stringify(favorites.filter(fav => fav.name !==  currencyCoin.name)))
            setCoins(JSON.parse(localStorage.getItem('coins')))
        }
         
    }
    
    return (
        <section>
            {coins && <table>
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
                        const { name, id, marketCapUsd, changePercent24Hr, rank, symbol, priceUsd, supply } = coin
                        const properties = { name, id, marketCapUsd, changePercent24Hr, rank, symbol, priceUsd, supply }
                        return (
                            <Row key={id} addToFavoritesFunction={addToFavorites} {...properties} isFav />
                        )
                    })}

                </tbody>
            </table>
            }
        </section>
    )
}

export default Favorites