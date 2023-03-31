
type DashboardCardProps = {
    children: React.ReactNode;
};

const DashboardCard = ({children}: DashboardCardProps) => {
    return (
        <div className="bg-white shadow rounded-md p-8">
            {children}
        </div>
    );
};

export default DashboardCard;