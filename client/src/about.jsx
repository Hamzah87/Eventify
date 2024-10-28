import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";
import welcome from '../images/welcome.jpg';

function About(){

    return(
        <ThemeProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Navbar/>
                <div className="relative w-full h-screen">
                    <img
                        src={welcome} 
                        alt="Description of the image"
                        className="w-full h-full object-cover"
                    />
                
                
                    <div className="absolute inset-0 flex mt-32 flex-col items-center">
                        <h1 className="dark:text-gray-900 text-white text-4xl md:text-5xl lg:text-7xl font-bold inline-block p-2 bg-gray-800 bg-opacity-20 rounded-xl dark:bg-white dark:bg-opacity-30">
                            Welcome to Eventify!
                        </h1>

                        <div className="lg:mx-32 mx-14 mt-12">
                            <p className="inline-block text-white bg-gray-800 bg-opacity-40 p-2 rounded-xl md:text-2xl dark:bg-white dark:bg-opacity-70 dark:text-gray-900 lg:font-medium font-medium"> 
                            At Eventify, we believe that planning an event should be a joyful experience, not a stressful one. Our mission is to provide users with an intuitive platform that simplifies the event planning process, making it easy to organize every detail of your special occasion.

                            </p>

                        </div>
                
                    </div>
                </div>
                

                

            </div>

        </ThemeProvider>
    );

}

export default About;

// About Us
// Welcome to Eventify!
// At Eventify, we believe that planning an event should be a joyful experience, not a stressful one. Our mission is to provide users with an intuitive platform that simplifies the event planning process, making it easy to organize every detail of your special occasion.

// Who We Are
// Eventify is a dedicated team of event enthusiasts, designers, and developers who understand the challenges of planning an event. We come from diverse backgrounds, bringing our unique skills together to create a seamless experience for our users. Whether it’s a birthday party, wedding, corporate gathering, or any celebration in between, we’re here to help you bring your vision to life.

// Our Vision
// We envision a world where everyone can host unforgettable events without the hassle of juggling countless details. Our platform is designed to help you plan efficiently, keeping everything organized in one place. From guest lists to venue selection, budgeting, and timelines, Eventify ensures that you can focus on what truly matters—enjoying the moments with your friends, family, or colleagues.

// What We Offer
// User-Friendly Interface: Our platform is designed to be intuitive, ensuring that you can navigate through planning tasks effortlessly.
// Comprehensive Tools: From customizable checklists and budget trackers to RSVP management and vendor recommendations, we provide all the tools you need to plan your event.
// Inspiration and Tips: Explore our blog and resources section for tips, trends, and inspiration to make your event truly unique.
// Community Support: Join our community of planners and share experiences, ideas, and advice to enhance your planning journey.
// Join Us
// We invite you to join the Eventify community and take the stress out of event planning. Sign up today and start organizing your next event with confidence. Together, let’s create memories that will last a lifetime!