
import { useQueryClient } from "react-query";
import { getAllCategories } from "../../services/api/category"
import Row from './Row';
import { motion } from 'framer-motion';
import { useQuery } from "react-query";

interface IProps {
    searchText: string
}

const Table = ({ searchText }: IProps) => {

    let { status, data } = useQuery('categories', getAllCategories, {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
    if (searchText)
        data = data?.filter(item => item.name.includes(searchText));

    // const queryClient = useQueryClient();
    // queryClient.invalidateQueries({
    //     queryKey: ['categories']
    // })

    if (status === 'loading') {
        return <div>Loading ....</div>
    }

    if (status === 'error') {
        return <div>error</div>
    }

    if (data)
        return (
            <div className="relative overflow-auto shadow-md sm:rounded-lg">
                <motion.table layout className="w-full text-left shadow-md " >
                    <motion.thead layout className=" text-white flex bg-accent  text-[.9rem]">
                        <motion.tr className="flex w-full justify-around text-center">
                            <th scope="col" className="px-6 py-3">
                                آیکون
                            </th>
                            <th scope="col" className="px-6 py-3">
                                نام
                            </th>
                            <th scope="col" className="px-6 py-3">
                                عملیات
                            </th>
                        </motion.tr>
                    </motion.thead>

                    <motion.tbody className="text-center max-h-[60vh] flex flex-col overflow-y-auto w-full">
                        {data.length > 0 ? data.map(item => <Row key={item._id} category={item} />) : null}
                    </motion.tbody>

                </motion.table>
            </div>
        )
}

export default Table
