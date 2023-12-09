import SectionTitle from "../../components/SectionTitle";

const Faq = () => {
  return (
    <div>
      <SectionTitle title="FAQ"></SectionTitle>
      
      <div className="max-w-7xl mx-auto px-5 space-y-4 my-10">
        <div className="collapse bg-blue-50 shadow-lg">
          <input type="radio" name="my-accordion-1" checked="checked" />
          <div className="collapse-title text-xl font-medium">
            What services does the diagnostic center offer?
          </div>
          <div className="collapse-content">
            <p>
              Detail the range of diagnostic services available, including
              imaging, laboratory tests, and specialized screenings.
            </p>
          </div>
        </div>
        <div className="collapse bg-blue-50 shadow-lg">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl font-medium">
            How long does it take to receive test results?
          </div>
          <div className="collapse-content">
            <p>
              Outline the typical turnaround time for different types of tests
              and how patients will be notified of their results.
            </p>
          </div>
        </div>
        <div className="collapse bg-blue-50 shadow-lg">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl font-medium">
            Are the staff at the diagnostic center certified and experienced?
          </div>
          <div className="collapse-content">
            <p>
              Assure patients that tests are conducted by qualified
              professionals and provide brief profiles of key staff members.
            </p>
          </div>
        </div>
        <div className="collapse bg-blue-50 shadow-lg">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl font-medium">
            Can I access my test results online?
          </div>
          <div className="collapse-content">
            <p>
              Explain the availability of online portals for accessing test
              results securely and the steps to set up an account.
            </p>
          </div>
        </div>
        <div className="collapse bg-blue-50 shadow-lg">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl font-medium">
            Is the diagnostic center equipped with the latest technology?
          </div>
          <div className="collapse-content">
            <p>
              Highlight any advanced equipment or technology that sets the
              diagnostic center apart in terms of accuracy and efficiency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
