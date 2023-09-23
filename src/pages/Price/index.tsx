import { editProductPriceAndQuantity, getAllProducts } from '../../services/api/product';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useSearchParams } from "react-router-dom";
import { MainContext } from '../../context/Store';
import Table from '../../components/Price/Table';
import { BiPlusCircle } from 'react-icons/bi';
import { useState, useContext } from 'react';
import { TiCancel } from 'react-icons/ti';
import { useEffect } from 'react';


const index = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get('page'));
    const { quantitiesProdutList, pricesProdutList, clearQuantitesAndPrices } = useContext(MainContext);
    let { data, isLoading } = useQuery({ queryKey: ['products', page], queryFn: () => getAllProducts(Number(page === '0' ? '1':page)) });

    const handleChangePage = (number: number) => {
        if(number === 0)
        number =1
        searchParams.set('page', String(number));
        setSearchParams(searchParams);
        setPage(String(number))
    }

    const promises: Promise<any>[] = [];
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: () => Promise.all(promises).then(() => { clearQuantitesAndPrices() }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    })

    const handleSubmit = () => {

        if (quantitiesProdutList.length) {
            quantitiesProdutList.forEach((item) => {
                const formData = new FormData();
                formData.append('quantity', `${item.quantity}`);
                const promis = editProductPriceAndQuantity(item.id, formData);
                promises.push(promis);
            })
        }

        if (pricesProdutList.length) {
            pricesProdutList.forEach((item) => {
                const formData = new FormData();
                formData.append('price', `${item.price}`);
                const promis = editProductPriceAndQuantity(item.id, formData);
                promises.push(promis);
            })
        }
        mutation.mutate();
    }

    useEffect(() => {
        if (!isLoading)
            if (data?.products.length === 0)
                handleChangePage(data?.totalPages)

    }, [data?.products.length])

    return (
        <div className="felx flex-row gap-8 px-8 ">
            <div className="flex flex-col  lg:flex-row-reverse gap-4 justify-between py-8">

                <div className='flex items-center gap-2 '>
                    {!quantitiesProdutList.length && !pricesProdutList.length ?
                        <button disabled className={`btn btn-accent flex items-center gap-2 order-1 lg:order-2`} > ذخیره
                            <BiPlusCircle className="text-xl" />
                        </button> :
                        <button onClick={handleSubmit}
                            className={`btn btn-accent flex items-center gap-2 order-1 lg:order-2`} > ذخیره
                            <BiPlusCircle className="text-xl" />
                        </button>
                    }
                    {!quantitiesProdutList.length && !pricesProdutList.length ?
                        <button disabled className={`btn btn-error flex items-center gap-2 order-1 lg:order-2`} > انصراف
                            <TiCancel className="text-xl" />
                        </button> :
                        <button onClick={clearQuantitesAndPrices}
                            className={`btn btn-error flex items-center gap-2 order-1 lg:order-2`} > انصراف
                            <TiCancel className="text-xl" />
                        </button>
                    }
                </div>

            </div>
            <div className="flex flex-col ">
                {!isLoading && <Table products={data?.products} />}

                <div className="join flex flex-row-reverse justify-center mt-4">
                    {data?.totalPages && Array.from({ length: data?.totalPages }, (v, k) => k + 1).map(number =>
                        <button onClick={() => handleChangePage(number)} key={number} className={`join-item btn btn-accent btn-md
                         ${Number(page) === number ? 'btn-active' : ''}`}>{number}</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default index
