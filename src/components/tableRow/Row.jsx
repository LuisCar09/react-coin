import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Row = ({ addToFavoritesFunction, name, id, marketCapUsd, changePercent24Hr, rank, symbol, priceUsd, supply, isFav = false }) => {
    const [isCliked, setIsClicked] = useState(isFav)

    const handlerClick = (currencyCoin) => {

        setIsClicked(prevValue => !prevValue)
        addToFavoritesFunction({ name, id, marketCapUsd, changePercent24Hr, rank, symbol, priceUsd, supply })
    }




    useEffect(() => {
        const getFavs = JSON.parse(localStorage.getItem('coins'))

        const coinExist = getFavs ? getFavs.some(fav => fav.name === name) : null
        if (coinExist) {
            setIsClicked(true)
        }
    }, [])

    return (
        <tr >
            <td> <GradeRoundedIcon color={isCliked ? 'primary' : 'inherit'} onClick={() => handlerClick(id)} /> </td>
            <td>{rank}</td>
            <td><Link to={`/coin/:${id}`} > {name} {symbol}</Link></td>

            <td>$ {parseFloat(priceUsd).toFixed(2)}</td>
            <td>{parseFloat(changePercent24Hr).toFixed(2)}</td>
            <td>{parseInt(marketCapUsd).toFixed(0)}</td>
            <td>{parseInt(supply)}</td>
            {/* <td onClick={() => addToFavorites(id)} >Add</td> */}
        </tr>
    )
}

export default Row