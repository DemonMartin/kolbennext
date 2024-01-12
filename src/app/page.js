import PlayComponent from './components/PlayComponent';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="scroll-smooth overflow-hidden">

      {/* Left Section */}
      <div className="absolute left-0 w-1/2 flex flex-col items-center">
        <PlayComponent id="minti" imgSrc={"/minti.png"} />
        
      </div>

      {/* Right Section */}
      <div className="absolute right-0 w-1/2 flex flex-col items-center">
        <PlayComponent id="pipetta" imgSrc={"/pipetta.png"} />
        
      </div>

      {/* Bottom Images */}
      <Image src="/gyho.png" alt='gyho' width={400} height={300} className="absolute bottom-1 left-1 max-w-[400px]" />
      <Image src="/mint-ec.jpg" alt='mint-ec' width={400} height={300} className="absolute bottom-1 right-1 max-w-[400px]" />

    </div>
  );
}
