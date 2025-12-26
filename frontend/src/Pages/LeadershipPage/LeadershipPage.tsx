import ceoImage from "@/assets/images/ceo.jpg";
const LeadershipPage = () => {
  const teamMembers = [
    {
      name: "이부사장",
      position: "CEO",
      description:
        "운영 총괄 책임자로서 효율적인 기업 운영과 프로세스 혁신을 주도하고 있습니다.",
      imageUrl: ceoImage,
    },
    {
      name: "박이사",
      position: "CTO",
      description: "최신 기술 트렌드를 선도하며 R&D 부문을 총괄하고 있습니다.",
      imageUrl: ceoImage,
    },
    {
      name: "김이사",
      position: "CFO",
      description:
        "재무 전략 수립 및 기업 가치 향상을 위한 재무관리를 담당하고 있습니다.",
      imageUrl: ceoImage,
    },
    {
      name: "최이사",
      position: "CMO",
      description:
        "글로벌 마케팅 전략 수립 및 브랜드 가치 향상을 주도하고 있습니다.",
      imageUrl: ceoImage,
    },
  ];

  return (
    <div className="conatiner max-w-7xl mx-auto px-4 py-32">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          임원진 소개
        </h1>
        <p className="text-xl text-gray-600">
          혁신과 성장을 이끄는 영재금형의 리더쉽
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-12 mb-24 items-center">
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            CEO의 인사말
          </h2>
          <div className="text-lg text-gray-600 space-y-6">
            <p>안녕하십니까, 영재금형 대표 이병일입니다.</p>
            <p>
              저희 영재금형은 20년 이상의 주형 및 금형 제조 경험을 바탕으로,
              정밀한 기술력과 축적된 노하우를 통해 고객 여러분께 최고의 품질과
              가치를 제공하기 위해 노력하고 있습니다.
            </p>
            <p>
              급변하는 제조 산업 환경 속에서도 지속적인 기술 개발과 품질 혁신을
              통해 신뢰받는 주형·금형 솔루션을 제공하며, 고객과 함께 성장하는
              최고의 파트너가 되겠습니다.
            </p>
            <p className="font-semibold mt-8">영재금형 대표 이병일 드림</p>
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={ceoImage}
              alt=""
              className="w-full aspect-3/4 object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold text-gray-800">이병일</h3>
              <p className="text-indigo-600">대표</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          구성원
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((row, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl"
            >
              <div className="aspect-square bg-gray-200">
                <img
                  src={row.imageUrl}
                  alt={row.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {row.name}
                </h3>
                <p className="text-indigo-600 font-semibold mb-4">
                  {row.position}
                </p>
                <p className="text-gray-600">{row.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadershipPage;
