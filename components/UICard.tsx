type UICardProps = {
    children: React.ReactNode;
};

const UICard = ({children}: UICardProps) => {
    return (
        <div className="m-5 card rounded-lg border-gray-200 bg-white border-2">
            <div className="card-body">
            {children}
            </div>
        </div>
    );
};

export default UICard;