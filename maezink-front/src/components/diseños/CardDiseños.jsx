
import { FaEuroSign } from "react-icons/fa";
import { SlSizeFullscreen } from "react-icons/sl";


const CardDiseños = ({ title, description, price, size, imageUrl }) => {
return (
    <div className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-sm text-white border border-neutral-700">
    <div className="h-[300px] w-full overflow-hidden">
        <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover rounded-t-2xl"
        />
    </div>
    <div className="p-4 flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <hr />
        <p className="text-neutral-300">{description}</p>
        <div className="flex mx-auto gap-2">
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700  text-sm font-medium px-3 py-1 shadow-lg">
                <FaEuroSign className="size-4" />
                <span>{price}</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-sm font-medium px-3 py-1 shadow-lg">
                <SlSizeFullscreen className="size-4" />
                <span>{size}</span>
            </span>
        </div>
        <div className="flex mx-auto mt-4">
            <a href="#" className="bg-neutral-900 p-2 rounded-lg hover:scale-110 hover:bg-neutral-700 transition-all duration-300 ease-in-out">Reservar</a>
        </div>
    </div>
    </div>
);
};

export default CardDiseños;