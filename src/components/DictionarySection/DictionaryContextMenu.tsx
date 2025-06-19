interface Props {
    className?: string,
    x?: number,
    y?: number
}

export default function DictionaryContextMenu({className, x, y}: Props) {
    

    return (
        <div className={`${className} flex items-center gap-2 w-max rounded-sm bg-[#656565] text-white text-sm cursor-pointer`} style={{top: y, left: x}}>
            <p className="px-1.5 py-1 rounded-sm hover:bg-[#808080] active:bg-[#505050]">
                change
            </p>
            <p className="px-1.5 py-1 rounded-sm hover:bg-[#808080] active:bg-[#505050]">
                reverse
            </p>
        </div>
    );
}