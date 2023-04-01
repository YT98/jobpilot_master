type UICardProps = {
    children: React.ReactNode;
};

const UICard = ({children}: UICardProps) => {
    return (
        <div className="bg-white shadow rounded-md p-8 m-5">
            {children}
        </div>
    );
};

export default UICard;