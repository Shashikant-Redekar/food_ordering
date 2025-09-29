import { useQuery, gql } from '@apollo/client';
import Dish from './dishes';
import { useState } from 'react';
import '../styling/maincontent.scss';

const MENU = gql`
query MenuForResturant {
  menuForResturant {
    id
    menuName
  }
}
`

const Menu = () => {
    const {loading, error, data } = useQuery(MENU);
    const [selectedId, setSelectedId] = useState(null);

    if(loading) return 'Loading...';

    if(error) return `ERROR! ${error.message}`;

    return(
        <div className='menu-container'>
            <div className='mainmenu'>{
                data.menuForResturant.map((menu,index) => (
                    <div key={index}>
                        <ul>
                            <button onClick={() => setSelectedId(menu.id)}>{menu.menuName}</button>
                        </ul>
                    </div>
                ))
            }</div>
            <div className='dish-container'>
                {
                    selectedId ? (
                        <Dish id={selectedId}/>
                    ) : (
                        <p>Please select from menu to display the dishes...</p>
                    )
                }
            </div>
        </div>
    )
}

export default Menu;

