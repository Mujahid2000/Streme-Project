import useUserInfo from '@/hooks/useUser';
import Link from 'next/link';
const Navbar = () => {
 const userInfo=useUserInfo()



    return (
      <div className='flex justify-between max-w-[1400px]  mx-10 lg:mx-auto'>
      <div>
        {/* <h1 className="text-lg font-bold lg:text-2xl text-[#00b84b]">STREME</h1> */}
        <img className="w-[120px] pt-3 md:pt-0 md:w-[190px]" src={"https://i.ibb.co/B396qB4/Screenshot-2024-02-07-031511-removebg-preview.png"}></img>
      </div>
      <div className="mt-6 mr-3">
        {userInfo && userInfo.email?<Link href="/home"><span className="font-bold  py-2 xl:py-3 text-xs md:text-base lg:text-lg xl:text-xl hover:scale-95 duration-300 px-4 lg:px-10 text-white mt-5 bg-[#00b84b] z-[100000]">Lets Enjoy</span></Link> 
        : <Link href="/login"><span className="font-bold  py-2 xl:py-3 text-xs md:text-base lg:text-lg xl:text-xl hover:scale-95 duration-300 px-4 lg:px-10 text-white mt-5 bg-[#00b84b] z-[100000]">Login </span></Link> 
         }
      
     
      </div>
    </div>
    );
};

export default Navbar;