import React from "react";

// const useVrm = () => {
//     const { current: loader } = useRef(new GLTFLoader());
//     const [vrm, setVrm] = useState(null);

//     const loadVrm = (url) => {
//         loader.load(url, async (gltf) => {
//             const vrm = await VRM.from(gltf);
//             setVrm(vrm);
//         });
//     };

//     // Look at camera
//     useEffect(() => {
//         if (!vrm || !vrm.lookAt) return;
//         vrm.lookAt.target = camera;
//     }, [camera, vrm]);

//     return { vrm, loadVrm };
// };

export default function Login() {
    return (
        <main
            className="flex flex-col h-screen bg-black"
        >
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="md:row-start-1 md:col-start-2 md:col-end-2 p-12">
                    <div className="flex flex-col justify-center h-full">
                        {/* <img
                            src="../../images/logo.svg"
                            className="w-24 mb-14"
                        /> */}
                        <svg
                            id="logo"
                            className="cursor-pointer w-24 h-24 mb-14"
                            width="306"
                            height="306"
                            viewBox="0 0 306 306"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="198.951"
                                y="0.972168"
                                width="60"
                                height="140"
                                rx="30"
                                transform="rotate(45 198.951 0.972168)"
                                fill="#79DE79"
                            />
                            <rect
                                x="107.028"
                                y="305.028"
                                width="60"
                                height="140"
                                rx="30"
                                transform="rotate(-135 107.028 305.028)"
                                fill="#FCFC99"
                            />
                            <rect
                                x="305.019"
                                y="198.962"
                                width="60"
                                height="140"
                                rx="30"
                                transform="rotate(135 305.019 198.962)"
                                fill="#A8E4EF"
                            />
                            <rect
                                x="0.961914"
                                y="107.038"
                                width="60"
                                height="140"
                                rx="30"
                                transform="rotate(-45 0.961914 107.038)"
                                fill="#FB6962"
                            />
                        </svg>
                        <h1 className="text-5xl lg:text-7xl font-bold mb-12">
                            HÃY TƯỞNG TƯỢNG MỘT NƠI…
                        </h1>
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-8">
                            …Nơi mà giúp bạn dễ dàng trò chuyện hàng ngày và gặp
                            mặt thường xuyên hơn.
                        </h2>
                        <div className="flex flex-col">
                            <button
                                className="
                  p-4
                  mb-4
                  font-bold
                  rounded-full
                  text-sm
                  lg:w-2/5
                  text-black
                  bg-white
                "
                            >
                                Đăng ký
                            </button>
                            <button
                                className="
                  p-4
                  mb-4
                  border
                  font-bold
                  rounded-full
                  text-sm
                  lg:w-2/5
                  border-white
                "
                            >
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className="md:row-start-1 md:col-start-1 md:col-end-1"
                    style={{ height: "95vh" }}
                >
                    <div
                        className="bg-cover bg-no-repeat h-full bg-center"
                        style={{
                            backgroundImage:
                                // "url(../../images/Unsplash.png)",
                                "url(https://source.unsplash.com/random)",
                        }}
                    >
                        {/* <div className="flex justify-center items-center h-full">
                            <img src="../../images/logo.svg" />
                        </div> */}
                    </div>
                </div>
            </div>
            <nav className="p-2">
                <ul className="flex flex-wrap justify-center">
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Acerca de
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Centro de ayuda
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Condiciones de Servicio
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Política de Privacidad
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Política de cookies
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Información de anuncios
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Blog
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Estado
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Empleos
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Recursos para marcas
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Publicidad
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Marketing
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Twitter para empresas
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Desarrolladores
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Guía
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            Configuración
                        </a>
                    </li>
                    <li className="text-xs text-gray-500 mx-2 my-1">
                        <a
                            className="border-b-2 border-transparent hover:border-gray-400"
                            href="/"
                        >
                            © 2021 Twitter, Inc.
                        </a>
                    </li>
                </ul>
            </nav>
        </main>
    );
}
