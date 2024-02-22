
const Footer = () => {
    return (
        <div>
            <footer class="bg-[#101010] text-white py-12">
                <div class="container mx-auto flex justify-between">
                    <div class="w-1/3 m-2">
                        <h3 class="text-2xl font-bold mb-4 text-yellow-500 ">About Us</h3>
                        <p class="text-gray-300 max-w-[350px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur, sem sit amet aliquet tempor.</p>
                    </div>
                    <div class="w-1/3">
                        <h3 class="text-2xl font-bold mb-4 text-yellow-500">Quick Links</h3>
                        <ul class="list-none">
                            <li><a href="#" class="text-gray-300 hover:text-yellow-500">Home</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-yellow-500">Services</a></li>
                            <li><a href="#" class="text-gray-300 hover:text-yellow-500">Contact</a></li>
                        </ul>
                    </div>
                    <div class="w-1/3">
                        <h3 class="text-2xl font-bold mb-4 text-yellow-500">Follow Us</h3>
                        <div class="flex space-x-4">
                            <a href="#" class="text-gray-300 hover:text-yellow-500" target="_blank">Facebook</a>
                            <a href="#" class="text-gray-300 hover:text-yellow-500" target="_blank">Twitter</a>
                            <a href="#" class="text-gray-300 hover:text-yellow-500" target="_blank">Instagram</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;