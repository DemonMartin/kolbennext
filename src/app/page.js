import PlayComponent from './components/PlayComponent';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-6 p-6 bg-gradient-to-r from-blue-100 via-blue-50 to-green-100 h-screen">
      <div className="flex flex-col items-center justify-center space-y-6">
        <PlayComponent id="minti" imgSrc={"/minti2.png"} />
      </div>

      {/* VS. Section */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-bold text-white bg-black px-4 py-2 rounded-lg">VS.</span>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6">
        <PlayComponent id="pipetta" imgSrc={"/pipetta.png"} />
      </div>

      <div className="col-span-2 flex justify-between items-end self-end">
        <div className="w-1/12 min-w-[100px]">
          <Image src="/gyho.png" alt='gyho' layout="responsive" width={100} height={75} className="rounded-lg" />
        </div>
        <div className="w-1/12 min-w-[100px] flex justify-end">
          <Image src="/mint-ec.png" alt='mint-ec' layout="responsive" width={100} height={75} className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}