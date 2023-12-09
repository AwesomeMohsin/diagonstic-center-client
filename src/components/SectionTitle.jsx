
// eslint-disable-next-line react/prop-types
const SectionTitle = ({title}) => {
    return (
        <div className="pt-16">
            <h2 className="text-center text-3xl md:text-5xl lg:text-6xl font-semibold font-fontTitle pb-4">{title}</h2>
            <hr className="mx-auto w-2/5" />
            <hr className="mx-auto w-2/5 pb-20" />

            
        </div>
    );
};

export default SectionTitle;