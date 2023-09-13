import { useEffect ,useState} from "react";


export const DeatailRow = ({item,order}:any) => {
    const [product,setProduct] = useState(null)
     useEffect(()=>{
        const data = fetch(`http://localhost:8000/api/products/${item.product}`).then((res)=>res.json())
        .then((res)=>setProduct(res.data.product));
     })

    return (
        <tr className=" flex items-center hover:bg-accent-focus w-full hover:text-white transition-all">

            <td className="px-6 py-4 w-4/12">
                {product && product?.name}
            </td>

            <td className="px-6 py-4 w-4/12">
                {product && product.price * item.count}
            </td>

            <td className=" text-center w-4/12">
            {item.count}
            </td>
        </tr>
    )
}
