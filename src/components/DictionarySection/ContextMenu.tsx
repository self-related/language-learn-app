export default function ContextMenu() {
    

    return (
        <div className="absolute right-[2rem] bottom-0 flex items-center gap-2 w-max rounded-sm bg-[#656565] text-white text-sm ">
            <p className="px-1.5 py-1 rounded-sm hover:bg-[#808080] active:bg-[#505050]">
                change
            </p>
            <p className="px-1.5 py-1 rounded-sm hover:bg-[#808080] active:bg-[#505050]">
                reverse
            </p>
        </div>
    );
}