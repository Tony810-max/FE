import axios from 'axios';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';

function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (page) => {
    try {
      const limit = 10; // Number of results per page
      let url = `https://mixfood-be-production.up.railway.app/api/admin/getBookingUnchecked?page=${page}&limit=${limit}`;

      const response = await axios.get(url);
      setBookings(response.data.uncheckedBookings);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching bookings', error);
    }
  };

  const handleConfirmBooking = async (bookingId) => {
    try {
      const response = await axios.post('https://mixfood-be-production.up.railway.app/api/admin/updateBookingStatus', {
        _id: bookingId,
      });

      if (response && response.status === 200) {
        toast.success('Xác nhận thành công');
        setTimeout(() => {
          window.location.reload();
        }, 1500)
      }
    } catch (error) {
      toast.error('Xác nhận thất bại');
      console.error('Error confirming booking', error);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <ToastContainer />
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
              <th className="whitespace-nowrap" scope="col">
                Xác nhận
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
                <td>
                  <button
                    className="whitespace-nowrap bg-[#0b2228] text-[#fff] hover:bg-[#142f36] py-[4px] px-[24px] rounded-[4px]"
                    onClick={() => handleConfirmBooking(booking._id)}
                  >
                    Xác nhận
                  </button>
                </td>
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

export default BookingTable;
