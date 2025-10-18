import NameAndLogo from "./Header";
import { useQuery, gql, useMutation } from '@apollo/client';

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

const DELETE = gql`
mutation DeleteOrder($index: String!, $nameId: ID!, $tnumberId: ID!) {
  deleteOrder(index: $index, nameId: $nameId, tnumberId: $tnumberId) {
    code
    success
    message
  }
}
`

function Orders () {
    const {loading, error, data, refetch } = useQuery(ORDER);
    const [ deleteOrder ] = useMutation(DELETE);

    if(loading) return 'Loading...';

    if(error) return `ERROR! ${error.message}`;

    console.log(data)

    const handleDeleteOrder = async(index, nameId, tnumberId) => {
        try{
            const { data } = await deleteOrder({
              variables: {
                index,
                nameId,
                tnumberId
              }
            })

            if( data.deleteOrder.success){
                alert("Order deleted from dataBase");
                refetch();
            }else{
                alert("Failed to delete Order:" + data.deleteOrder.message);
            }
        }catch(err){
            alert("Error deleting Order:" + err);
        }
    }

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
                                                            const ind = na.name+nu.tnumber;
                                                            return(
                                                                <div key={k}>
                                                                    <p>{na.name} from table number {nu.tnumber}</p>
                                                                    {
                                                                        n.order.map((or, l) => {
                                                                            if(or.index === ind){
                                                                                return(
                                                                                    <div key= {l}>
                                                                                        <ul>{or.dname} X {or.count}</ul>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }
                                                                    <button  onClick={() => handleDeleteOrder(ind, na._id, nu._id)}>order served</button>
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