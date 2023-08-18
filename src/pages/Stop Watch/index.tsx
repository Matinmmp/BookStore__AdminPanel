import { useState, useEffect } from 'react';

const index = () => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(true);
    let interval:number = 0;
    useEffect(() => {
        if (isActive)
          {
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
          }
        else clearInterval(interval);
        return () => {
            clearInterval(interval);
        };
    }, [isActive])

    const handleStop = () => {
        console.log(isActive);
        
        setIsActive(!isActive)
    }

    const handleReset =()=>{
        setTime(0)
    }
    return (
        <div className='flex flex-col gap-5 items-center'>
            <span>{time}</span>
            <button onClick={handleStop}>{isActive ?'stop':'resume'}</button>
            <button onClick={handleReset}>reset</button>

        </div>
    )

}

export default index
