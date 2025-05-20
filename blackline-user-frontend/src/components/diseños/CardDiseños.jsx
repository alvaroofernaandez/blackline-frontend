const CardDiseños = ({ id, title, description, price, size, time, imageUrl }) => {
    return (
        <div className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden w-full max-w-xs text-white border border-neutral-700">
            <div className="h-[200px] w-full overflow-hidden">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-euro-icon lucide-euro"><path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/></svg>
                        <span>{price}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-medium px-2 py-1 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minimize-icon lucide-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
                        <span>{size}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-700 text-xs font-medium px-2 py-1 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-timer-icon lucide-timer"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>
                        <span>{time}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CardDiseños;