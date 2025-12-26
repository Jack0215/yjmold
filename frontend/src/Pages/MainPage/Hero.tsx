import mainImg from "@/assets//images/main.jpg";
const Hero = () => {
  const descriptions = [
    {
      number: "1,200+",
      label: "설치 완료",
    },
    {
      number: "98%",
      label: "고객 만족도",
    },
    {
      number: "35년",
      label: "업계 경력",
    },
    {
      number: "23/5",
      label: "기술 지원",
    },
  ];

  return (
    <div className="relative min-h-[110%] bg-linear-to-b from-gray-50 to-white pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py36">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl 2xl:text-6xl font-bold text-gray-900 leading-tight mb-6 lg:mb-12">
              금형 설계 전문가와 함께
              <span className="block text-blue-600 mt-2 lg:mt-6">
                미래를 만들어 갑니다.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-800 text-semibold mb-8 max-w-2xl">
              안전하고 뛰어난 금형 설계부터 사출까지, 전문가들이 함께합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold shadow-lg hover:shadow-xl">
                상담 신청하기
              </button>
              <button className="px-8 py-4 bg-white-600 text-blue-600 rounded-lg border-2 border-blue-500 hover:bg-blue-50 transition-colors duration-300 text-lg font-semibold shadow-lg hover:shadow-xl">
                더 알아보기
              </button>
            </div>
          </div>

          <div className="flex-1 w-full max-w-2xl lg:max-w-none">
            <div className="relative">
              <img
                src={mainImg}
                alt=""
                className="relative rounded-2xl shadow-2xl w-full object-cover transform hover:scale-[1.02]
                transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {descriptions.map((row, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {row.number}
              </div>
              <span className="text-gray-900">{row.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
