import Image from "next/image";
import styles from '../styles/ImageComponent.module.css'; // Assume you have CSS module for custom styles

function shakeStyle(audioLevel) {
    // generate higher values for higher audio levels [AudioLevel = 0 - 100]
    const shake = audioLevel * 0.1;
    const randomFactorX = Math.random() * 2 - 1; // generates a random number between -1 and 1
    const randomFactorY = Math.random() * 2 - 1; // generates a random number between -1 and 1
    const shakeWithRandomnessX = shake * randomFactorX;
    const shakeWithRandomnessY = shake * randomFactorY;
    return { transform: `translate(${shakeWithRandomnessX}px, ${shakeWithRandomnessY}px)` };
}

const ImageComponent = ({ src, id, fluidLevel = 0, audioLevel = 0, running = false }) => {
    const fluidHeight = `${Math.max(0, Math.min(fluidLevel, 1)) * 100}%`;

    return (
        <div className="flex items-center justify-center relative rounded-3xl overflow-hidden shadow-lg border-gray-200 bg-white bg-opacity-25">
            {/* White background behind Water */}
            {/* <div className="z-2 absolute bottom-0 left-0 w-full h-full bg-white"></div> */}

            {/* Water */}
            <div className={`z-1 absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-100 ease-in-out ${styles.water}`}
                style={{
                    height: fluidHeight,
                }}
            >
                <div className={`absolute bottom-0 left-0 w-full h-full ${id != "pipetta" ? styles.waterGradient : styles.waterGradientRed}`}>

                </div>
            </div>

            {/* Image */}
            <div className="z-3 relative">
                <Image src={src} alt={id} width={1920} height={1080} className="object-contain w-full max-h-[30vh] md:max-h-[40vh] lg:max-h-[50vh] xl:max-h-[60vh]" 
                style={shakeStyle(audioLevel)}/>
            </div>

        </div>
    );
};

export default ImageComponent;