import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState, useEffect } from 'react';

function AccountTable() {
  const [accounts, setAccounts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // Thêm state để lưu trữ giá trị từ ô nhập

  const fetchData = async (page, query) => {
    try {
      const limit = 10; // Số lượng kết quả trên mỗi trang
      const response = await axios.get(`https://mixfood-be-production.up.railway.app/api/admin/getAccounts?page=${page}&limit=${limit}&query=${query}`);
      setAccounts(response.data.accounts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching accounts', error);
    }
  };

  useEffect(() => {
    fetchData(page, searchQuery);
  }, [page, searchQuery]);

  const handleSearch = () => {
    setPage(1); // Reset trang về 1 khi tìm kiếm mới
    fetchData(1, searchQuery);
  };

  return (
    <div>
      <div className="flex gap-[12px] md:flex-row xs:flex-col">
        <input
          className='flex-1 px-[24px] py-[8px] bg-[#fafafa]'
          type="text"
          placeholder="Tìm kiếm theo email hoặc số điện thoại"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className='bg-[#0b2228] text-[#fff] hover:bg-[#142f36] px-[24px] py-[8px] rounded-[4px] whitespace-nowrap' onClick={handleSearch}>Tìm kiếm</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="whitespace-nowrap" scope="col">STT</th>
              <th className="whitespace-nowrap" scope="col">Họ và tên</th>
              <th className="whitespace-nowrap" scope="col">Số điện thoại</th>
              <th className="whitespace-nowrap" scope="col">Email</th>
              <th className="whitespace-nowrap" scope="col">Xác thực</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td className="whitespace-nowrap">{account.name}</td>
                <td>{account.phone}</td>
                <td className="whitespace-nowrap">{account.email}</td>
                <td>{account.isVerified ? <FontAwesomeIcon icon={faCheck} className='text-success' /> : <FontAwesomeIcon icon={faClose} className='text-danger' />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-[#fff] pagination gap-[16px]">
        <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>Trước</button>
        <span>{page} / {totalPages}</span>
        <button onClick={() => setPage(prevPage => Math.min(prevPage + 1, totalPages))} disabled={page === totalPages}>Sau</button>
      </div>
    </div>
  );
}

export default AccountTable;
