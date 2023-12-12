import SectionTitle from "../../components/SectionTitle";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const Blog = () => {
  return (
    <div>
      <SectionTitle title="Blog"></SectionTitle>

      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto my-10 gap-10" data-aos="fade-up"
                    data-aos-delay="1000">


        <div className="flex flex-col  md:flex-row justify-around gap-10 items-center" >
          <img className="w-2/5" src="https://domf5oio6qrcr.cloudfront.net/medialibrary/2293/l0908b16207233934035.jpg" alt="" />

          <div className="space-y-3 pb-4">

            <h1 className="text-4xl text-teal-600 font-semibold">
              The Importance of Regular Exercise
            </h1>
            <ul className="text-lg border-y py-4">
              <li>
                Explore how exercise improves cardiovascular health, helps
                maintain a healthy weight, and supports muscle and joint health.
              </li>
              <li>
                Discuss the role of exercise in reducing stress, anxiety, and
                depression.
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-3 pb-4 flex flex-col  md:flex-row justify-around gap-10 items-center">
          <img className="w-2/5" src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chan-walrus-958545.jpg&fm=jpg" alt="" />
          <div>
            <h1 className="text-4xl text-teal-600 font-semibold">
              Healthy Eating Habits
            </h1>
            <ul className="text-lg border-y py-4">
              <li>
                Break down popular diets like the Mediterranean diet,
                vegetarianism, and plant-based diets.
              </li>
              <li>
                Share nutritious and easy-to-make recipes. Provide cooking tips
                for preserving the nutritional value of foods.
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-3 pb-4 flex flex-col  md:flex-row justify-around gap-10 items-center">

          <img className="w-2/5" src="https://cineecg.com/wp-content/uploads/2022/11/digital-health-trends-1024x562-1.jpg" alt="" />
          <div>
            <h1 className="text-4xl text-teal-600 font-semibold">
              Digital Health Trends
            </h1>
            <ul className="text-lg border-y py-4 text-gray-600">
              <li>
                Explore the variety of health apps available for fitness
                tracking, mental health support, and medical information.
              </li>
              <li>
                {" "}
                Discuss how wearables like fitness trackers and smartwatches
                contribute to health monitoring.
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-3 pb-4 flex flex-col  md:flex-row justify-around gap-10 items-center">

          <img className="w-2/5" src="https://media.post.rvohealth.io/wp-content/uploads/2020/08/woman-sleeping-in-bed-facebook-1200x628.jpg" alt="" />

          <div>
            <h1 className="text-4xl text-teal-600 font-semibold">
              Sleep Hygiene
            </h1>
            <ul className="text-lg border-y py-4 text-gray-600">
              <li>
                Share tips for creating a healthy sleep routine. Discuss the
                impact of screens, caffeine, and environment on sleep quality.
              </li>
              <li>Explore common sleep disorders and their management.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Blog;
