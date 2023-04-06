interface CompleteProfileHeaderProps {
    step: number;
    handleChangeStep: (step: number) => void;
}

const CompleteProfileHeader = ({step, handleChangeStep} : CompleteProfileHeaderProps) => {

    // TODO: Add transition to border
    const activeStepClasses = "prose border-b-4 border-blue-500 mr-2 ml-2 pb-1 pl-3 pr-3 cursor-pointer";
    const inactiveStepClasses = "prose border-b-2 border-blue-500 mr-2 ml-2 pb-1 pl-3 pr-3 opacity-70 cursor-pointer hover:opacity-100 transition-opacity duration-200";

    return (
        <div className="fixed top-0 left-0 h-[74px] z-10 bg-white hidden sm:hidden md:hidden lg:flex flex-row w-full justify-center p-5 border-b-2 border-gray-200">
            <div 
                className={step === 1 ? activeStepClasses : inactiveStepClasses}
                onClick={() => handleChangeStep(1)}
            >
                <h4> 1. Personal Information </h4>
            </div>
            <div 
                className={step === 2 ? activeStepClasses : inactiveStepClasses}
                onClick={() => handleChangeStep(2)}
            >
                <h4> 2. Work Experience </h4>
            </div>
            <div 
                className={step === 3 ? activeStepClasses : inactiveStepClasses}
                onClick={() => handleChangeStep(3)}
            >
                <h4> 3. Education </h4>
            </div>
            <div 
                className={step === 4 ? activeStepClasses : inactiveStepClasses}
                onClick={() => handleChangeStep(4)}
            >
                <h4> 4. Skills and Languages </h4>
            </div>
            <div 
                className={step === 5 ? activeStepClasses : inactiveStepClasses}
                onClick={() => handleChangeStep(5)}
            >
                <h4> 5. Review </h4>
            </div>
        </div>
    )
};

export default CompleteProfileHeader;