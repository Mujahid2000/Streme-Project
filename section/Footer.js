const Footer = () => {
    return (
        <div>
            <footer class="bg-[#101010] text-white py-12">
                <div class="container mx-auto flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-between">
                    <div class="max-w-96 ">
                        <h3 class="text-base ml-6  text-center md:text-lg lg:text-lg xl:text-lg 2xl:text-2xl font-bold mb-4 text-yellow-500 ">About Us</h3>
                        <p class="text-gray-300 ml-5 md:ml-1 lg:ml-5 xl:ml-1 2xl:ml-1 mb-3 text-center text-base md:text-base lg:text-lg xl:text-lg 2xl:text-lg">Your go-to destination for limitless entertainment. Discover, stream, and enjoy premium content effortlessly.</p>
                    </div>
                    <div class=" ">
                        <h3 class="text-base text-center md:text-lg lg:text-lg xl:text-lg 2xl:text-2xl font-bold mb-4 text-yellow-500">Quick Links</h3>
                        <ul class="flex text-center gap-4 justify-center ">
                            <li><a href="#" class="text-gray-300 hover:text-yellow-500">Home</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-yellow-500">Services</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-yellow-500">Contact</a></li>
                        </ul>
                    </div>
                    <div class="">
                        <h3 class="text-base text-center md:text-lg lg:text-lg xl:text-lg 2xl:text-2xl font-bold mb-4 text-yellow-500">Follow Us</h3>
                       
                            <ul class=" justify-center flex text-center gap-4">
                                <li>
                            <a href="" class="text-gray-300 hover:text-yellow-500" target="_blank">Facebook</a>
                                </li>
                                <li>
                            <a href="" class="text-gray-300 hover:text-yellow-500" target="_blank">Twitter</a>
                                </li>
                                <li>
                            <a href="" class="text-gray-300 hover:text-yellow-500" target="_blank">Instagram</a>
                                </li>
                            </ul>
                       
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;