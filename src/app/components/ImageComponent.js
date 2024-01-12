import Image from "next/image";

const ImageComponent = ({ src, id, fluidLevel }) => {
    const fluidHeight = `${fluidLevel * 100}%`;

    return (
        <div className="flex min-h-[60vh] items-center justify-center relative">
            <div className="z-3 absolute bottom-0 left-0 w-full" style={{ height: fluidHeight, background: 'blue' }} />
            <div className="z-10 relative">
                <Image src={src} alt={id} layout="responsive" width={1920} height={1080} className="object-fit w-full max-h-[60vh]" />
            </div>
        </div>
    );
};

export default ImageComponent;  