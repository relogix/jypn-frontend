import CaretDown from "../../../../assets/img/static/elements/caret-down.png";

const Hero = () => {
  return (
    <div className="w-full md:h-screen p-4 md:p-6" style={{ height: "90vh" }}>
      <div className="w-full h-full bg-gradient-dark text-white rounded-xl p-6 overflow-hidden">
        <div className="h-full relative flex flex-col justify-between" style={{ zIndex: 1 }}>
          <div className="flex justify-center">
            <div className="flex items-center gap-x-8">
              <div className="w-20 md:w-40" style={{ height: "1px", borderBottom: "1px solid #ccc" }} />
              <span className="font-bold text-lg">JYPn</span>
              <div className="w-20 md:w-40" style={{ height: "1px", borderBottom: "1px solid #ccc" }} />
            </div>
          </div>

          <div className="flex flex-col md:items-center gap-y-4 md:gap-y-6 px-4">
            <p className="text-xs text-gray-300 uppercase" style={{ letterSpacing: "0.2rem" }}>
              JYPn Fans Website
            </p>
            <h1 className="font-bold text-5xl md:text-6xl uppercase md:text-center poppins bg-clip-text text-transparent bg-gradient-primary">
              Your Next Favorite <br /> Girl Group
            </h1>
          </div>

          <div className="flex justify-center">
            <img src={CaretDown} className="h-3 hidden" />
          </div>

          <div className="hidden w-full h-full absolute md:flex justify-between items-center" style={{ zIndex: -1 }}>
            <div
              className="text-vertical font-bold text-9xl uppercase text-outline"
              style={{ WebkitTextStrokeColor: "white", opacity: "8%" }}
            >
              Favorite
            </div>
            <div
              className="text-vertical font-bold text-9xl uppercase text-outline transform rotate-180"
              style={{ WebkitTextStrokeColor: "white", opacity: "8%", whiteSpace: "nowrap" }}
            >
              GirlGroup
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
