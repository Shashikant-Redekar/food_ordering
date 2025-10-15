import NameAndLogo from "./Header";
import { useQuery, gql } from '@apollo/client';

const ORDER = gql`
query Orders {
  orders {
    order {
      index
      dname
      price
      count
    }
    name {
      _id
      name
    }
    number {
      _id
      tnumber
    }
  }
}
`

function Orders () {
    const {loading, error, data } = useQuery(ORDER);

    if(loading) return 'Loading...';

    if(error) return `ERROR! ${error.message}`;

    console.log(data)

    return (
        <div>
            <NameAndLogo showCartButton={false}/>
            <div>
                {
                    data.orders.map((n, i) => {
                        return(
                            <div key={i}>
                                {
                                    n.name.map((na, j) => {
                                        return(
                                            <div key={j}>
                                                {
                                                    n.number.map((nu, k) => {
                                                        if(j === k){
                                                            return(
                                                                <div key={k}>
                                                                    <p>{na.name} from table number {nu.tnumber}</p>
                                                                    {
                                                                        n.order.map((or, l) => {
                                                                            const ind = na.name+nu.tnumber;
                                                                            if(or.index === ind){
                                                                                return(
                                                                                    <div key= {l}>
                                                                                        <ul>{or.dname} X {or.count}</ul>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }
                                                                    <button>order served</button>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Orders;