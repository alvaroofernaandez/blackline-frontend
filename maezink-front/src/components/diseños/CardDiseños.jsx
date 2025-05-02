
import { FaEuroSign } from "react-icons/fa";
import { SlSizeFullscreen } from "react-icons/sl";
import { IoTimeOutline } from "react-icons/io5";



const CardDiseños = ({ title, description, price, size, time, imageUrl }) => {
return (
    <div className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden w-full max-w-xs text-white border border-neutral-700">
    <div className="h-[150px] w-full overflow-hidden">
        <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover rounded-t-xl"
        />
    </div>
    <div className="p-3 flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <hr />
        <p className="text-neutral-300 text-sm">{description}</p>
        <div className="flex mx-auto gap-2">
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 shadow-lg">
                <FaEuroSign className="size-3" />
                <span>{price}</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-medium px-2 py-1 shadow-lg">
                <SlSizeFullscreen className="size-3" />
                <span>{size}</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-700 text-xs font-medium px-2 py-1 shadow-lg">
                <IoTimeOutline className="size-4" />
                <span>{time}</span>
            </span>
        </div>
        <div className="flex mx-auto">
            <a href="#" className="bg-neutral-900 p-2 rounded-lg hover:scale-105 hover:bg-neutral-700 transition-all duration-300 ease-in-out text-sm">Reservar</a>
        </div>
    </div>
    </div>
);
};

export default CardDiseños;