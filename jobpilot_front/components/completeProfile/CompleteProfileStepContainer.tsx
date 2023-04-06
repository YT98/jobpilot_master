type CompleteProfileStepContainerProps = {
    children: React.ReactNode;
    current_step: number;
    element_step: number;
    handleChangeStep: (step: number) => void;
    handleSubmit?: () => void;
}

const CompleteProfileStepContainer = ({children, current_step, element_step, handleChangeStep, handleSubmit} : CompleteProfileStepContainerProps) => {

    const translateX = -(current_step - element_step) * 100;

    return (
        <div 
            className="w-full flex overflow-y-scroll h-full flex-col pb-20"
            style={{position: "absolute", left: `${translateX}%`, top: 0, transition: "left 0.3s ease-in-out" }}
        >
            <div className="w-full flex justify-center">
                <div className="prose p-10">
                    {children}
                    <button 
                        className={element_step == 1 ? "hidden" : "btn btn-outline mt-10 mr-5"}
                        onClick={() => handleChangeStep(current_step-1)}    
                    > 
                        PREVIOUS
                    </button>
                    <button 
                        className={element_step == 5 ? "hidden" : "btn btn-outline mt-10"}
                        onClick={() => handleChangeStep(current_step+1)}
                    >
                        NEXT
                    </button>
                    <button 
                        className={element_step == 5 ? "btn btn-primary" : "hidden"}
                        onClick={() => handleSubmit ? handleSubmit() : ""}
                    >
                        SUBMIT
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default CompleteProfileStepContainer;