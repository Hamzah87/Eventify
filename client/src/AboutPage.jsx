import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";
import welcome from "../images/welcome.jpg";
import planning from "../images/planning.jpg";
import vision from "../images/vision.jpg";

function About() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />

        <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-700 dark:to-indigo-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About Eventify
              </h1>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                At Eventify, we believe that planning an event should be a
                joyful experience, not a stressful one. Our mission is to
                provide users with an intuitive platform that simplifies the
                event planning process.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src={planning}
                alt="Planning events"
                className="w-full h-[500px] object-cover rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Eventify is a dedicated team of event enthusiasts, designers,
                and developers who understand the challenges of planning an
                event. We come from diverse backgrounds, bringing our unique
                skills together to create a seamless experience for our users.
                Whether it’s a birthday party, wedding, corporate gathering, or
                any celebration in between, we’re here to help you bring your
                vision to life.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <img
                src={vision}
                alt="Our vision"
                className="w-full h-[500px] object-cover rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                We envision a world where everyone can host unforgettable events
                without the hassle of juggling countless details. Our platform
                is designed to help you plan efficiently, keeping everything
                organized in one place. From guest lists to venue selection,
                budgeting, and timelines, Eventify ensures that you can focus on
                what truly matters like enjoying the moments with your friends,
                family, or colleagues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default About;
