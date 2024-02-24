

import ProtectedRoute from "@/utils/ProtectedRoute";

import MainNavbar from "@/components/MainNavbar/MainNavbar";


import ShowBannerSlide from "@/components/Cards/ShowCard/ShowBannerSlide/ShowBannerSlide";
import ShowCard from "@/components/Cards/ShowCard/ShowCard";




const DramaPage = () => {


    return (
        <ProtectedRoute>
            <div>
                <MainNavbar />

                <section className="max-w-7xl mx-auto h-screen">





                    <div >
                        <ShowBannerSlide />
                        <div >
                            <ShowCard />
                        </div>

                    </div>




                </section >
            </div >
        </ProtectedRoute>
    );
};

export default DramaPage;
