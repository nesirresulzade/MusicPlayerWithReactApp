import React from 'react'
import Logo from "../img/Music_logo.png"
function HomeTitle() {
    return (
        <>
            <div className="w-full px-5 mt-6 mb-5">
                <div className="max-w-[300px] mx-auto w-full py-4 bg-[#0A091E] flex items-center rounded-lg">
                    {/* Şəkil */}
                    <img
                        src={Logo}
                        alt="Music Cover"
                        className="w-[55px] h-[50px] rounded-full object-cover"
                    />

                    {/* Yazılar */}
                    <div className="ml-4">
                        <div className="text-[#F2F2F2] text-[22px] font-semibold leading-[20px] tracking-[-0.24px] font-[Nunito]">
                            Music Player App
                        </div>
                        <div className="text-[#DEDEDE] text-[17px] font-normal leading-[20px] tracking-[-0.24px] font-[Nunito] mt-2">
                            Preparer: R.Nasir
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeTitle
