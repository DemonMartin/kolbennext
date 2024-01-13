import Image from "next/image";
import styles from '../styles/ImageComponent.module.css'; // Assume you have CSS module for custom styles
import { Shake } from 'reshake'

const ImageComponent = ({ src, id, fluidLevel = 0, audioLevel = 0, running = false }) => {
    const fluidHeight = `${Math.max(0, Math.min(fluidLevel, 1)) * 100}%`;
    const shakeLevel = running ? Math.max(0.5, Math.min(audioLevel, 25)) : 0;

    return (
        <div className="flex min-h-[60vh] items-center justify-center relative rounded-3xl overflow-hidden shadow-lg border-gray-200 bg-white bg-opacity-25">
            {/* White background behind Water */}
            {/* <div className="z-2 absolute bottom-0 left-0 w-full h-full bg-white"></div> */}

            {/* Water */}
            <div className={`z-1 absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-500 ease-in-out ${styles.water}`}
                style={{
                    height: fluidHeight,
                }}
            >
                <div className={`absolute bottom-0 left-0 w-full h-full ${styles.waterGradient}`}>

                </div>
            </div>

            {/* Image */}
            <Shake
             // shake based on audioLevel (0-100)
                h={shakeLevel}
                v={shakeLevel}
                r={shakeLevel / 2}
                dur={1000}
                int={10}
                max={100}
                fixed={true}
            >
                <div className="z-3 relative">
                    <Image src={src} alt={id} width={1920} height={1080} className="object-fit w-full max-h-[60vh]" />
                </div>
            </Shake>
        </div>
    );
};

export default ImageComponent;