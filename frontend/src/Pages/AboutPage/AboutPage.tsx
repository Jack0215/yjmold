import aboutImg from "@/assets/images/about.jpg";
const AboutPage = () => {
  const cardItmes = [
    { title: "혁신", desc: "끊임없는 도전과 혁신으로 미래를 선도합니다" },
    { title: "신뢰", desc: "고객과의 신뢰를 최우선 가치로 삼습니다" },
    { title: "성장", desc: "구성원들의 지속적인 성장을 지원합니다" },
  ];
  const companyHistory = [
    { year: "2023", event: "글로벌 시장 진출" },
    { year: "2022", event: "시리즈 B 투자 유치" },
    { year: "2021", event: "주요 기술 특허 획득" },
    { year: "2020", event: "회사 설립" },
  ];
  return (
    <div className="container mx-auto px-4 py-32 max-w-7xl">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-24">
        <img
          src={aboutImg}
          alt="About Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0  bg-linear-to-b from-transparent via-transparent to-slate-900"></div>
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
          <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">
            영재 금형
          </h3>
          <p className="text-base md:text-xl font-bold">
            좋은 품질로 보답하겠습니다.
          </p>
        </div>
      </div>

      <div className="mb-24 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-slate-800 text-center">
          회사 소개
        </h2>
        <div className="text-lg leading-relaxed text-gray-600 space-y-6">
          <p>
            영재금형은 2016년 설립 이래로 주형 및 금형 제조업 분야에서 전문적인
            기술력과 풍부한 경험을 바탕으로 성장해온 기업입니다. 다양한 산업군에
            적용되는 주형 및 금형을 정밀하게 설계·제작하며, 안정적인 생산 공정과
            높은 품질 기준으로 고객의 요구에 부응하고 있습니다.
          </p>
          <p>
            특히 고정밀·고내구성 주형 및 금형 제작 기술을 바탕으로 자동차, 전자,
            산업기기 등 여러 분야의 제조 현장에서 신뢰받는 파트너로 평가받고
            있습니다. 지속적인 기술 개발과 설비 투자를 통해 생산 효율성과 품질
            경쟁력을 강화하며, 고객 맞춤형 주형·금형 솔루션으로 제조 산업 발전에
            기여하고 있습니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
        {cardItmes.map((item, index) => (
          <div
            key={index}
            className="bg-white p-10 rounded-xl shadow-lg
            text-center hover:shadow-2xl transition-all duration-300 border-gray-100"
          >
            <h3 className="text-2xl font-bold mb-4 text-indigo-700">
              {item.title}
            </h3>
            <p className="text-gray-600 font-light text-lg">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mb-24 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-slate-800">회사 비전</h2>
        <p className="text-2xl leading-relaxed text-gray-600 font-light">
          끊임없는 기술 혁신과 품질 개선을 통해 고부가가치 주형·금형 솔루션을
          제공하며, 효율적인 생산 공정과 책임 있는 경영으로 지속 가능한 제조
          환경을 만들어 나가겠습니다.
        </p>
      </div>

      <div className="mb-24 ">
        <h2 className="text-4xl font-bold mb-12 text-slate-800 text-center">
          회사 연혁
        </h2>
        <div className="space-y-12 max-w-5xl mx-auto">
          {companyHistory.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-8 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="w-1/2 text-center">
                <div className="bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <h3 className="text-2xl font-bold mb-3 text-indigo-600">
                    {item.year}
                  </h3>
                  <p className="text-gray-700 text-lg">{item.event}</p>
                </div>
              </div>
              <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
              <div className="w-1/2 "></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
