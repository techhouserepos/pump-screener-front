const Loading = () => {
    return (
        <>
            <div className="flex justify-center items-center space-x-1 pt-2">

                Loading Content...


                <div className="h-2.5 w-2.5 bg-maincolor rounded-full animate-dot-flashing"></div>
                <div
                    className="h-2.5 w-2.5 bg-maincolor rounded-full animate-dot-flashing"
                    style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                    className="h-2.5 w-2.5 bg-maincolor rounded-full animate-dot-flashing"
                    style={{ animationDelay: "0.2s" }}
                ></div>
            </div>
        </>
    );
};

export default Loading;