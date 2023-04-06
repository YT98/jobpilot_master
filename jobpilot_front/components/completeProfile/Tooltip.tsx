interface TooltipProps {
    text: string;
}

const Tooltip = ({text}: TooltipProps) => {
    return (
        <span
            className="bg-gray-100 rounded-full pt-0.5 pb-0.5 pr-2 pl-2 text-xs tooltip tooltip-right"
            data-tip={text}
        >
            ?
        </span>
    )
}

export default Tooltip;