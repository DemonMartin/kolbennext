import PlayComponent from './components/PlayComponent';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-6 p-6 h-screen">
      <div className="flex flex-col items-center justify-center space-y-6">
        <PlayComponent id="minti" imgSrc={"/minti4.png"} />
      </div>

      <div className="flex flex-col items-center justify-center space-y-6">
        <PlayComponent id="pipetta" imgSrc={"/pipetta2.png"} />
      </div>

      <div className="col-span-2 flex justify-between items-end self-end">
        <div className="w-1/6 min-w-[100px]">
          <Image
            src="/gyho.png"
            alt='gyho'
            width={1000}
            height={750}
            className="rounded-lg w-full h-full object-contain"
          />
        </div>
        <div className="w-1/6 min-w-[100px] flex justify-end">
          <Image
            src="/mint-ec.png"
            alt='mint-ec'
            width={1000}
            height={750}
            className="rounded-lg w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}