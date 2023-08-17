import Table from "../../components/Category/Table"

const index = () => {
    return (
        <div className="felx flex-row gap-8 px-8">
            <div className="flex justify-between py-8">
                <div>
                    <input type='text' placeholder='جست و جو' className="input input-accent"/>
                </div>
                <button className="btn btn-accent">اضافه کردن</button>
            </div>
            <Table />
        </div>
    )
}

export default index