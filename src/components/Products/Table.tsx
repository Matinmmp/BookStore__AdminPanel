import { Product } from "../../models/Types";
import Row from './Row';

type IProps = {
    products:Product[];
}

const Table = ({products}:IProps) => {

    return (
        <div className="relative  shadow-md sm:rounded-lg overflow-y-auto">
            <table  className="w-full text-left shadow-md min-w-[45rem]" >
                <thead  className=" text-white flex bg-accent  text-[.9rem]">
                    <tr className="flex w-full justify-around text-center">
                        <th scope="col" className="px-6 py-3 w-1/12">
                            آیکون
                        </th>
                        <th scope="col" className="px-6 py-3 w-3/12">
                            نام
                        </th>
                        <th scope="col" className="px-6 py-3 w-5/12">
                            دسته بندی
                        </th>
                        <th scope="col" className="px-6 py-3 w-3/12">
                            عملیات
                        </th>
                    </tr>
                </thead>

                <tbody className="text-center max-h-[55vh] flex flex-col overflow-auto w-full">
                    {products.length > 0 ? products.map((item) => <Row key={item._id} product={item} />) : null}
                </tbody>
            </table>
        </div>
    )
}

export default Table
