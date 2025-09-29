import logo from '../logo/sukoonsagarlogo-1.png';
import name from '../logo/SukunSagarLogo2.png';
import '../styling/nameandlogo.scss';
import { useState, useEffect } from 'react';
import "../styling/cart.scss";
import { gql, useMutation } from "@apollo/client";

const ADD_NAME = gql`
mutation AddName($name: String!) {
  addName(name: $name) {
    code
    success
    message
    name {
      name
    }
  }
}
`
const ADD_TNUMBER = gql`
mutation AddTNumber($tnumber: Int!) {
  addTNumber(tnumber: $tnumber) {
    code
    success
    message
    tnumber {
      tnumber
    }
  }
}
`
const PLACE_ORDER = gql`
mutation AddOrder($ordish: OrDishin!) {
  addOrder(ordish: $ordish) {
    code
    success
    message
    ordish {
      index
      dname
      price
      count
    }
  }
}
`

const Cart = () => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
            return saved ? JSON.parse(saved) : [];
    });
    const[tNumber, setTNumber] = useState("");
    const[pName, setPName] = useState("");

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

    const [addName] = useMutation(ADD_NAME);
    const [addTNumber] = useMutation(ADD_TNUMBER);
    const [addOrder] = useMutation(PLACE_ORDER);

    const handleSubmit = async() => {
        if(!tNumber){
            alert('Please enter the table number.')
        }
        else if (isNaN(tNumber)){
            alert('Please enter correct table number.')
        }
        else if(!pName){
            alert('Please enter your name.')
        }
        else{
            let nameNumber = pName + tNumber;
            try{
                await addName({ variables: { name: pName }});
                await addTNumber({ variables: { tnumber: parseInt(tNumber) }});
                await Promise.all(cart.map(dish => 
                    addOrder({
                        variables: {
                            ordish: {
                                index: nameNumber,
                                dname: dish.dname,
                                price: dish.price,
                                count: dish.count
                            }
                        }
                    })
                ))
                alert("Order placed successfully");
                setCart([]);
                setPName("");
                setTNumber("");
                localStorage.removeItem("cart");
            } catch (err){
                console.error(err);
                alert("Something went wrong placing the order.");
            }
        }
    }

    useEffect(() => {
            localStorage.setItem('cart',JSON.stringify(cart));
        },[cart]);

    return (
        <div>
            <div className='nameandlogo'>
                <img src={logo} className="App-logo" alt="logo" />
                <div >
                    <img src={name} className="App-name" alt="name" />
                </div>
            </div>
            <h2>Your Cart</h2>
            <p>Enter your table number:</p>
            <input id="tableNumber" name='number' type='number' placeholder='7' onChange={e => setTNumber(e.target.value)} value={tNumber}></input>
            <p>Enter your name:</p>
            <input id="personName" name='name' type='text' placeholder='Shashikant' onChange={e => setPName(e.target.value)} value={pName}></input>
            {cart.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                cart.map((item, index) => (
                <div key={index} className='item-list'>
                    <p>{item.dname}</p>
                    <p>₹{item.price}</p>
                    <div className='item-counter'>
                        <button onClick={() => handleSub(item)}>-</button>
                        <p>{item.count}</p>
                        <button onClick={() => handleAdd(item)}>+</button>
                    </div>
                </div>
                ))
            )}
            <button onClick={() => handleSubmit()} disabled={cart.length === 0}>Submit Order</button>
        </div>
    );
};

export default Cart;