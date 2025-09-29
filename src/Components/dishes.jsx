import { useQuery, gql } from '@apollo/client';
import { useState, useEffect } from 'react';
import '../styling/dishes.scss';

const DISH = gql`
query Menu($menuId: Int!) {
  menu(id: $menuId) {
    id
    menuName
    dish {
      _id
      dname
      price
      id
    }
  }
}
`

const Dish = (props) => {

    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
            return saved ? JSON.parse(saved) : [];
    });

    const handleAddNew = (dish) => {
        const newDish = {
            _id : dish._id,
            dname : dish.dname,
            price : dish.price,
            count : 1
        };
        setCart([...cart,newDish]);
    }

    const handleAdd = (dish) => {
        setCart( cart.map((item) => 
            item._id === dish._id ? { ...item,count : item.count + 1 } : item
        ))
    }

    const handleSub = (dish) => {
        setCart( cart.map((item) =>
            item._id === dish._id ? { ...item, count : item.count - 1 } : item
            ).filter((item) => item.count > 0)
        )
    }

    useEffect(() => {
        localStorage.setItem('cart',JSON.stringify(cart));
    },[cart]);

    const { loading, error, data } = useQuery(DISH,{
        variables: { menuId: props.id }
    });

    if(loading) return ('Loading Dishes...');

    if(error) return (`ERROR! ${error}`);

    console.log(cart);

    return(
        <div>
            <div>
                <p>{data.menu.menuName}</p>
            </div>
            <div>
                {
                    data.menu.dish.map((dish,index) => {
                        let count;
                        const found = cart.find((orc) => orc._id === dish._id)
                        found ? count=found.count : count=0
                        return (<div key={index} className='dish-info'>
                            <ul className='dish-row'>
                                <p>{dish.dname}</p>
                                <p>{dish.price}</p>
                                {(count === 0) ? (<button onClick={() => handleAddNew(dish)}>ADD</button>):(<div className='counter'><button onClick={() => handleSub(dish)}>-</button> <p>{count}</p> <button onClick={() => handleAdd(dish)}>+</button></div>)}
                            </ul>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Dish;