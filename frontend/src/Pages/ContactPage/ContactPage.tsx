import axios from "axios";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "",
  });

  const onChangeFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitFormData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/contact",
        formData
      );
      if (response.status === 201) {
        alert("문의가 성공적으로 제출되었습니다.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          status: "",
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  const contactData = [
    {
      icon: "phone",
      title: "전화",
      info: "02-1234-5678",
      desc: "평일 09:00 - 18:00",
    },
    {
      icon: "envelope",
      title: "이메일",
      info: "support@example.com",
      desc: "24시간 접수 가능",
    },
    {
      icon: "map-marker-alt",
      title: "주소",
      info: "서울특별시 강남구 삼성동 123번지",
      desc: "본사",
    },
  ];
  return (
    <div className="min-h-screen bg-white py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            문의하기
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            태양광 설비 설치부터 유지보수까지, 전문가와 상담하세요. 24시간 내에
            답변드리겠습니다.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <form
              action=""
              className="bg-white rounded-2xl shadow-xl p-8"
              onSubmit={onSubmitFormData}
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor=""
                    className="block text-gray-700 font-medium mb-2"
                  >
                    이름
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2
                  focus:ring-blue-200 transition-colors du30ration-300"
                    placeholder="홍길동"
                    required
                    value={formData.name}
                    onChange={onChangeFormData}
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block text-gray-700 font-medium mb-2"
                  >
                    이메일
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2
                  focus:ring-blue-200 transition-colors du30ration-300"
                    placeholder="example@example.com"
                    required
                    value={formData.email}
                    onChange={onChangeFormData}
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block text-gray-700 font-medium mb-2"
                  >
                    연락처
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2
                  focus:ring-blue-200 transition-colors du30ration-300"
                    placeholder="010-1234-5678"
                    required
                    value={formData.phone}
                    onChange={onChangeFormData}
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block text-gray-700 font-medium mb-2"
                  >
                    문의내용
                  </label>
                  <textarea
                    name="message"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2
                  focus:ring-blue-200 transition-colors du30ration-300 h-40"
                    placeholder="문의하실 내용을 자세히 작성해주세요."
                    required
                    value={formData.message}
                    onChange={onChangeFormData}
                  />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white  py-4  rounded-lg font-medium transition-colors duration-300">
                  문의하기
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                연락처 정보
              </h3>
              <div className="space-y-6">
                {contactData.map((row, index) => (
                  <div key={index} className="flex  items-start">
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">{row.title}</h4>
                      <p className="text-gray-600">{row.info}</p>
                      <p className="text-gray-500 text-sm">{row.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9544.036338667434!2d126.80218911555164!3d37.43097423764379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b649bc677a4cb%3A0x7f560807ca6c90b1!2z7JiB7J6s6riI7ZiV!5e0!3m2!1sko!2skr!4v1765435204294!5m2!1sko!2skr"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[400px] md:h-[600px] lg:h-[600px]"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
