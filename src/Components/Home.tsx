
import Navbar from "./Navbar.tsx";
import ImageSlider from "./ImageSlider.tsx";


const Home=()=>{
    const image=['src/assets/images/A.jpg']

    return (
        <div>
            <Navbar/>
            <ImageSlider image={image}/>

        </div>
    )
}
export  default Home;