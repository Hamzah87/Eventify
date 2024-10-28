import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";

function CreateEvent(){
    return(
        <ThemeProvider>
            <Navbar/>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              

                <div>Create your event here!</div>
                

                

            </div>
        </ThemeProvider>
    );
}

export default CreateEvent;