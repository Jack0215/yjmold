import type { Contact } from "@/Types/Admin/AdminContacts";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
const AdminContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<string>("name");
  const [statusFilter, setStatusFilter] = useState("all");

  const pageSize = [10, 20, 50, 100];

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/contact", {
          withCredentials: true,
        });
        setContacts(response.data.contacts);
      } catch (error) {
        console.log("문의글 가져오기 실패", error);
      }
    };
    fetchContacts();
  }, []);

  const onClickEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const onClickStatusUpdate = async (newStatus: string) => {
    if (!selectedContact) return;
    try {
      await axios.put(
        `http://localhost:3000/api/contact/${selectedContact._id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      console.log("newStatus", newStatus);
      setContacts(
        contacts.map((contact) =>
          contact._id === selectedContact._id
            ? { ...contact, status: newStatus }
            : contact
        )
      );
      setIsModalOpen(false);
      Swal.fire("수정완료!", "상태가 성공적으로 수정되었습니다.", "success");
    } catch (error) {
      console.log("문의 상태 업데이트 실패", error);
      Swal.fire("수정실패!", "상태 수정에 실패했습니다.", "error");
    }
  };

  const onClickDelete = async (contactId: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/contact/${contactId}`, {
        withCredentials: true,
      });
      setContacts(contacts.filter((contact) => contact._id !== contactId));
      Swal.fire("삭제완료!", "문의가 성공적으로 삭제되었습니다.", "success");
    } catch (error) {
      console.log("문의 삭제 실패", error);
      Swal.fire("삭제실패!", "문의 삭제에 실패했습니다.", "error");
    }
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const value =
        contact[searchType as keyof Contact]?.toString().toLowerCase() || "";
      const matchesSearchTerm = value.includes(searchTerm.toLowerCase());
      const merchesStatus =
        statusFilter === "all" || contact.status === statusFilter;
      return matchesSearchTerm && merchesStatus;
    });
  }, [contacts, searchTerm, searchType, statusFilter]);

  const totalPages = Math.ceil(filteredContacts.length / currentPageSize);
  const paginationContacts = useMemo(() => {
    const startIndex = (currentPage - 1) * currentPageSize;
    return filteredContacts.slice(startIndex, startIndex + currentPageSize);
  }, [filteredContacts, currentPage, currentPageSize]);
  return (
    <div className="p-4 mx-auto max-w-[1400px]">
      <h1 className="text-4xl font-bold mt-6 mb-4">문의 관리</h1>
      {contacts.length === 0 ? (
        <div className="font-bold text-center text-gray-800 text-2xl">
          등록된 문의가 없습니다.
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4 ">
            <div className="flex w-full md:w-auto gap-2">
              <select
                name=""
                id=""
                className="border rounded px-3 text-base"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="name">이름</option>
                <option value="email">이메일</option>
                <option value="phone">연락처</option>
                <option value="message">문의 내용</option>
              </select>
              <div className="flex-1 md:w-80">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full border rounded px-3 py-2 text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                name=""
                id=""
                className="border rounded px-3 py-2 text-base"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="pending">대기 중</option>
                <option value="in progress">진행 중</option>
                <option value="completed">완료</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label htmlFor="" className="text-base font-bold text-gray-600">
                페이지당 표시:
              </label>
              <select
                name=""
                id=""
                className="border rounded px3 py-2"
                value={currentPageSize}
                onChange={(e) => {
                  setCurrentPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {pageSize.map((row) => (
                  <option key={row} value={row}>{`${row}개`}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-lg font-bold text-gray-600">
              총 {filteredContacts.length}개의 문의
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden text-sm lg:text-lg font-bold">
              <colgroup>
                <col className="w-[8%]" />
                <col className="w-[12%]" />
                <col className="w-[20%]" />
                <col className="w-[15%]" />
                <col className="w-[25%]" />
                <col className="w-[10%]" />
                <col className="w-[10%]" />
              </colgroup>
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-center">번호</th>
                  <th className="px-4 py-3 text-center">이름</th>
                  <th className="px-4 py-3 text-center">이메일</th>
                  <th className="px-4 py-3 text-center">휴대폰</th>
                  <th className="px-4 py-3 text-center">문의 내용</th>
                  <th className="px-4 py-3">상태</th>
                  <th className="px-4 py-3">관리</th>
                </tr>
              </thead>
              <tbody>
                {paginationContacts.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-center">
                      {(currentPage - 1) * currentPageSize + index + 1}
                    </td>
                    <td className="px-4 py-3 text-center">{row.name}</td>
                    <td className="px-4 py-3 text-center">{row.email}</td>
                    <td className="px-4 py-3 text-center">{row.phone}</td>
                    <td className="px-4 py-3 text-center">{row.message}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          row.status === "pending"
                            ? "bg-blue-100 text-blue-800"
                            : row.status === "in progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {row.status === "pending"
                          ? "대기중"
                          : row.status === "in progress"
                          ? "진행중"
                          : "완료"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap writing-normal"
                          onClick={() => onClickEdit(row)}
                        >
                          수정
                        </button>
                        <button
                          className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 whitespace-nowrap writing-normal"
                          onClick={() => onClickDelete(row._id)}
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginationContacts.map((row, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-white shadow-md text-lg font-bold"
              >
                <div className="flex justify-between items-center mb-2">
                  번호: #{(currentPage - 1) * currentPageSize + index + 1}
                  <span
                    className={`px-2 py-1 rounded-full text-base ${
                      row.status === "pending"
                        ? "bg-blue-100 text-blue-800"
                        : row.status === "in progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {row.status === "pending"
                      ? "대기중"
                      : row.status === "in progress"
                      ? "진행중"
                      : "완료"}
                  </span>
                </div>
                <div>이름 : {row.name}</div>
                <div>이메일 : {row.email}</div>
                <div>휴대폰 : {row.phone}</div>
                <div>문의 내용 : {row.message}</div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
                    수정
                  </button>
                  <button
                    className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => onClickDelete(row._id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center space-x-2 text-xl font-bold">
            <button
              className="px-3 py-1 rounded border border-gray-200 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              이전
            </button>
            <span className="px-3 py-1">
              {currentPage} / {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded border border-gray-200 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              다음
            </button>
          </div>
        </>
      )}
      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center py-4 z-1">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">문의 상태 수정</h2>
            <div className="mb-4">
              <p className="font-medium mb-2">
                현재 상태:
                {selectedContact.status === "pending"
                  ? "대기중"
                  : selectedContact.status === "in progress"
                  ? "진행중"
                  : "완료"}
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => onClickStatusUpdate("pending")}
                  className="w-full px-4 py-2 bg-blue-100 text-blue-800 hover:bg-blue-200"
                >
                  대기중
                </button>
                <button
                  onClick={() => onClickStatusUpdate("in progress")}
                  className="w-full px-4 py-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                >
                  진행중
                </button>
                <button
                  onClick={() => onClickStatusUpdate("completed")}
                  className="w-full px-4 py-2 bg-green-100 text-green-800 hover:bg-green-200"
                >
                  완료
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
