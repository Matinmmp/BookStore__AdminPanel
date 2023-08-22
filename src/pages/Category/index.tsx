import Table from "../../components/Category/Table"
import {BiPlusCircle} from 'react-icons/bi'
import Modal from "../../components/Modal/Modal"


const index = () => {
    return (
        <div className="felx flex-row gap-8 px-8">
            <Modal>
                <div/>
            </Modal>
            <div className="flex justify-between py-8">
                <div>
                    <input type='text' placeholder='جست و جو' className="input input-accent"/>
                </div>
                <button className="btn btn-accent flex items-center gap-2">اضافه کردن <BiPlusCircle className="text-xl"/></button>
            </div>
            <Table />
        </div>
    )
}

export default index