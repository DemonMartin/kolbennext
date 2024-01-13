import PlayComponent from './components/PlayComponent';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-cyan-500 to-green-300 h-screen">

      {/* Left Section */}
      <div className="flex flex-col items-center justify-center">
        <PlayComponent id="minti" imgSrc={"/minti2.png"} />
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center justify-center">
        <PlayComponent id="pipetta" imgSrc={"/pipetta.png"} />
      </div>

      {/* Bottom Images */}
      <div className="col-span-2 flex justify-between items-end">
        <Image src="/gyho.png" alt='gyho' width={400} height={300} className="rounded-lg" />
        <div className="flex justify-end w-full">
          <Image src="/mint-ec.png" alt='mint-ec' width={400} height={300} className="rounded-lg" />
        </div>
      </div>

    </div>
  );
}
