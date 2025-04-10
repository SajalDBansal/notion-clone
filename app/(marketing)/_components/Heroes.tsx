import Image from "next/image"

export const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
                    <Image
                        src="/document.jpg"
                        fill
                        className="object-contain"
                        alt="Document"
                    />
                </div>
                <div className="relative w-[445px] h-[445px] hidden md:block ml-5">
                    <Image
                        src="/reading.jpg"
                        fill
                        className="object-contain"
                        alt="Reading"
                    />
                </div>
            </div>
        </div>
    )
}