 const Loading = () => {
  return (
    <div className="flex flex-col gap-12 items-center justify-center h-full">
        <span className="loading loading-spinner text-accent w-[5rem] h-[5rem] "></span>
        <p>در حال دریافت اطلاعات</p>
    </div>
  )
}

export default Loading
