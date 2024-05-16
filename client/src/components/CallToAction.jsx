import { Button } from "flowbite-react";


export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-600 justify-center items-center rounded-2xl text-center">
        <div className="flex-1 justify-center flex flex-col gap-3">
            <h2 className="text-2xl">
                Want to learn more about next js ?
            </h2>
            <p>
                chekout these resouces with 100 next js Projects
            </p>
            <Button gradientDuoTone='purpleToPink'>
                <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Nextjs.org</a>
            </Button>
        </div>        
        <div className="p-7 flex-1">
            <img src="https://static.flexmonster.com/uploads/2023/07/27093124/next-js-scheme-.png" />
        </div>        

    </div>
  )
}
