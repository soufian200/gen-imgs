import { FC } from "react";
import Image from "next/image"
import Link from "next/link"
import Center from "../common/Center";
import Container from "../common/Contianer";
import balls from "../../assets/balls.svg"
import routes from "../../constants/routes";



interface HomeSectionProps { }


const HomeSection: FC<HomeSectionProps> = () => {

    const btnClass = `py-4 px-20 capitalize font-bold hover:opacity-90`;

    return <section className={`bg-blue-50`}>
        <Container>
            <div className={` p-20 `}>
                <Center>
                    <div className={`flex`}>
                        <div className={`bg-blue-50 w-1/2`}>

                            <div className={`p-10 pt-24`} >
                                <h1 className={`text-6xl font-bold capitalize mb-10`} >create up to 10,000  NFTs art easyl and in seconds</h1>

                                <h2 className={`text-xl capitalize text-gray-800 mb-20`}>on the world's first & largest NFT marketplace. In this unit, you'll learn about the main value types in Solidity. Value types are passed by value and are copied when they're used. </h2>
                                <div className={`flex`}>

                                    <Link href={routes.LOGIN} >
                                        <button
                                            className={`bg-blue-500 text-white mr-10 ${btnClass}`}>login</button>
                                    </Link>
                                    <Link href={routes.SIGNUP}>
                                        <button className={`text-blue-500 border-2 border-blue-500 ${btnClass}`}>sign up</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={`bg-blue-20 w-1/2 `}>
                            <Center>
                                <Image alt="balls" width="600px" height="600px" src={balls} className="animate-spin-slow" />
                                {/* <div className={`flex justify-center items-center flex-wrap h-full w-full `}>
                                    {
                                        [1, 2, 3, 4, 5, 6].map((i, index) => <div
                                            key={index}
                                            className={`bg-blue-200 w-60 h-40 mt-10 rounded-md mx-5`} >{i}</div>)
                                    }
                                </div> */}
                            </Center>
                        </div>
                    </div>
                </Center>
            </div>
        </Container>
    </section>
}

export default HomeSection;