interface IProps {
    children: JSX.Element
}

const ModalContainer = ({ children }: IProps) => {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-60 z-50 ">
            <section className="p-2 rounded-xl shadow-sm shadow-accent absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white dark:bg-base-100">
                {children}
            </section>
        </div>
    )
}

export default ModalContainer
