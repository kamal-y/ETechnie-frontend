import { useRouter } from 'next/router';
import Link from 'next/link';


export default function Home() {

  const router = useRouter();


  return (
    <div className="w-screen h-full flex flex-col justify-between mt-20">
      <div class="grid md:grid-cols-2 items-center md:gap-4 gap-8 font-[sans-serif] w-full mx-auto p-66">
            <div class="max-md:order-1 md:ml-8 max-md:text-center">
                <h3 class="text-gray-800 md:text-3xl text-2xl md:leading-10">Mobile app development company in kolkata</h3>
                <p class="mt-4 text-sm text-gray-600 mb-14">Etechnie is the best mobile application development company in Kolkata. Our main aim is to build Mobile App & website as per the wants and standards of the customer. We help our customers to increase their business by building attractive website application. In Kolkata we are the top mobile application development company..</p>
                <Link href={'/user/login'} class="px-5 py-2.5 mt-8 rounded text-sm outline-none tracking-wide bg-blue-600 text-white hover:bg-blue-700">Explore</Link>
            </div>
            <div class="md:h-[470px] pt-3 mt-7">
                <img src="https://readymadeui.com/photo.webp" class="w-full h-full md:object-contain" />
            </div>
        </div>
    </div>
  );
}
