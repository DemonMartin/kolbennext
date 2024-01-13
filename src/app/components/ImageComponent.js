import Image from "next/image";
import styles from '../styles/ImageComponent.module.css'; // Assume you have CSS module for custom styles

const ImageComponent = ({ src, id, fluidLevel = 0, audioLevel = 0, running = false }) => {
    const fluidHeight = `${Math.max(0, Math.min(fluidLevel, 1)) * 100}%`;

    return (
        <div className="flex min-h-[60vh] items-center justify-center relative rounded-3xl overflow-hidden shadow-lg border-gray-200 bg-white bg-opacity-25">
            {/* White background behind Water */}
            {/* <div className="z-2 absolute bottom-0 left-0 w-full h-full bg-white"></div> */}

            {/* Water */}
            <div className={`z-1 absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-100 ease-in-out ${styles.water}`}
                style={{
                    height: fluidHeight,
                }}
            >
                <div className={`absolute bottom-0 left-0 w-full h-full ${styles.waterGradient}`}>

                </div>
            </div>

            {/* Image */}

            <div className="z-3 relative">
                <Image src={src} alt={id} width={1920} height={1080} className="object-fit w-full max-h-[60vh]" />
            </div>

        </div>
    );
};

export default ImageComponent;