import axios from 'axios';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function ApprovedTable() {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    fetchData(page, searchDate);
  }, [page, searchDate]);

  const fetchData = async (page, date) => {
    try {
      const limit = 10;
      let url = `https://mixfood-be-production.up.railway.app/api/admin/getBookings?page=${page}&limit=${limit}`;

      if (date) {
        url += `&date=${date}`;
      }

      const response = await axios.get(url);
      setBookings(response.data.bookings);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching bookings', error);
    }
  };

  const handleSearch = () => {
    fetchData(1, searchDate);
  };

  return (
    <div>
      <div className="flex gap-[12px] md:flex-row xs:flex-col">
        <input
          className="flex-1 px-[24px] py-[8px] bg-[#fafafa]"
          type="date"
          placeholder="Tìm kiếm theo ngày"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button
          className="bg-[#0b2228] text-[#fff] hover:bg-[#142f36] px-[24px] py-[8px] rounded-[4px] whitespace-nowrap"
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="whitespace-nowrap" scope="col">
                STT
              </th>
              <th className="whitespace-nowrap" scope="col">
                Họ và tên
              </th>
              <th className="whitespace-nowrap" scope="col">
                Số điện thoại
              </th>
              <th className="whitespace-nowrap" scope="col">
                Ngày
              </th>
              <th className="whitespace-nowrap" scope="col">
                Giờ
              </th>
              <th className="whitespace-nowrap" scope="col">
                Số người
              </th>
              <th className="whitespace-nowrap" scope="col">
                Ghi chú
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td className="whitespace-nowrap">{booking.name}</td>
                <td className="whitespace-nowrap">{booking.phone}</td>
                <td className="whitespace-nowrap">
                  {format(new Date(booking.date), 'dd/MM/yyyy')}
                </td>
                <td className="whitespace-nowrap">{booking.time}</td>
                <td className="whitespace-nowrap">{booking.count}</td>
                <td className="max-w-[250px] min-w-[250px] break-all">{booking.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-[#fff] pagination gap-[16px]">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          Trước
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          disabled={page === totalPages}
        >
          Sau
        </button>
      </div>
    </div>
  );
}

export default ApprovedTable;
