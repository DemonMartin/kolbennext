import Image from "next/image";

const ImageComponent = ({ src, id, fluidLevel = 0 }) => {
    const fluidHeight = `${fluidLevel > -0.01 && fluidLevel < 1 ? (fluidLevel * 100) : (1 * 100)}%`;

    return (
        <div className="flex min-h-[60vh] items-center justify-center relative">
            {/* Water */}
            <div className="z-3 absolute bottom-0 left-0 w-full overflow-hidden" 
                 style={{ 
                     height: fluidHeight, 
                 }} 
            >
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}>
                    <path d="M-19.60,114.95 C150.00,150.00 349.20,-50.00 500.00,114.95 L500.00,150.00 L0.00,150.00 Z" style={{stroke: 'none', fill: '#007cf0'}}></path>
                </svg>
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%', position: 'absolute', top: 0, transform: 'rotate(180deg)'}}>
                    <path d="M-19.60,114.95 C150.00,150.00 349.20,-50.00 500.00,114.95 L500.00,150.00 L0.00,150.00 Z" style={{stroke: 'none', fill: '#00b0ff'}}></path>
                </svg>
            </div>
            <div className="z-10 relative">
                <Image src={src} alt={id} width={1920} height={1080} className="object-fit w-full max-h-[60vh]" />
            </div>
        </div>
    );
};

export default ImageComponent;