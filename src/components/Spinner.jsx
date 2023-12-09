
const Spinner = () => {
    return (
        <div className="flex items-end gap-8 justify-center py-40 xl:py-80">
            <div className="flex justify-center items-center mt-48 md:mt-80">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        </div>
    );
};

export default Spinner;