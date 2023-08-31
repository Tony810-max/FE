import axios from 'axios';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';

function ReviewTable() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    fetchData(page, searchDate);
  }, [page, searchDate]);

  const fetchData = async (page, date) => {
    try {
      const limit = 10; // Số lượng kết quả trên mỗi trang
      let url = `https://mixfood-be-production.up.railway.app/api/admin/getReviews?page=${page}&limit=${limit}`;

      // If a search date is provided, add it to the API call
      if (date) {
        url += `&date=${date}`;
      }

      const response = await axios.get(url);
      setReviews(response.data.reviews);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching reviews', error);
    }
  };

  const handleCheckboxChange = async (reviewId) => {
    try {
      const response = await axios.put(`https://mixfood-be-production.up.railway.app/api/admin/updateReview`, { _id: reviewId });
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error updating review status', error);
    }
  };

  const handleSearch = () => {
    setPage(1);
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
        <button className='bg-[#0b2228] text-[#fff] hover:bg-[#142f36] px-[24px] rounded-[4px] whitespace-nowrap py-[8px]' onClick={handleSearch}>Tìm kiếm</button>
      </div>
      <div className="overflow-x-auto">
        <ToastContainer />
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="whitespace-nowrap" scope="col">STT</th>
              <th className="whitespace-nowrap" scope="col">Họ và tên</th>
              <th className="whitespace-nowrap" scope="col">Số điện thoại</th>
              <th className="whitespace-nowrap" scope="col">Đánh giá</th>
              <th className="whitespace-nowrap" scope="col">Vấn đề</th>
              <th className="whitespace-nowrap" scope="col">Tiêu đề</th>
              <th className="whitespace-nowrap" scope="col">Nội dung</th>
              <th className="whitespace-nowrap" scope="col">Ngày đánh giá</th>
              <th className="whitespace-nowrap" scope="col">Hiển thị</th>
            </tr>
          </thead>
          <tbody>
            {reviews?.map((review, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td className="whitespace-nowrap">{review.name}</td>
                <td>{review.phone}</td>
                <td>{review.isGood ? <span className="text-success">Tích cực</span> : <span className="text-danger">Tiêu cực</span>}</td>
                <td className="whitespace-nowrap">{review.product && review.product === 'food' ? "Món ăn" : review.product === 'service' ? 'Phục vụ' : 'Phục vụ, Món ăn'} </td>
                <td className="whitespace-nowrap">{review.title}</td>
                <td className="max-w-[250px] min-w-[250px] break-all">{review.rating}</td>
                <td>{format(new Date(review.createdAt), 'dd/MM/yyyy HH:mm:ss')}</td>
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={review.isShow}
                    onChange={() => handleCheckboxChange(review._id)}
                  />
                </td>
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

export default ReviewTable;
