import { Category } from '../../models/Types';
import Row from './Row';

interface IProps{
    categories:Category[]
}

const Table = ({categories}:IProps) => {
 

    return (
        <div className="relative overflow-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left shadow-md " >
                <thead className=" text-white flex bg-accent  text-[.9rem]">
                    <tr className="flex w-full justify-around text-center">
                        <th scope="col" className="px-6 py-3">
                            آیکون
                        </th>
                        <th scope="col" className="px-6 py-3">
                            نام
                        </th>
                        <th scope="col" className="px-6 py-3">
                            عملیات
                        </th>
                    </tr>
                </thead>

                <tbody className="text-center max-h-[60vh] flex flex-col overflow-y-auto w-full">
                    {categories.length > 0 ? categories.map(item => <Row key={item._id} category={item} />) : null}
                </tbody>

            </table>
        </div>
    )
}

export default Table

