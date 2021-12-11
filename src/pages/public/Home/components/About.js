import AboutImg from "../../../../assets/img/static/graphics/about-1.png";

const About = () => {
  return (
    <div className="md:h-screen grid md:grid-cols-2 px-10 md:px-16">
      <div className="hidden md:flex lg:justify-center items-center">
        <img src={AboutImg} className="md:w-4/5 lg:w-3/5" />
      </div>
      <div className="flex flex-col justify-center gap-y-6 lg:pr-20">
        <h1 className="poppins font-semibold text-4xl md:text-6xl text-gray-800">
          The{" "}
          <span className="bg-clip-text text-transparent bg-gradient-small" style={{ filter: "contrast(100%)" }}>
            Legends
          </span>{" "}
          <br /> Are Born
        </h1>
        <p className="text-sm leading-relaxed">
          July 9, 2021, is the day when JYP Entertainment confirmed they will be debuting their new girl group on
          February 2022 - currently called JYPn - consisting of seven all-rounder girls who are ready to break the
          world. So be careful, because once you are mesmerized by their perfection, you will be stuck in love..
          forever.
        </p>
      </div>
    </div>
  );
};

export default About;
