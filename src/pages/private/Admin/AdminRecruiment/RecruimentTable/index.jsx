import axios from 'axios';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function RecruimentTable() {
    const [hires, setHires] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData(page, searchQuery);
    }, [page, searchQuery]);

    const fetchData = async (page, query) => {
        try {
            const limit = 10; // Số lượng kết quả trên mỗi trang
            let url = `https://mixfood-be-production.up.railway.app/api/hire/get-hires?page=${page}&limit=${limit}`;

            if (query) {
                url += `&query=${query}`;
            }

            const response = await axios.get(url);
            setHires(response.data.hires);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching hires', error);
        }
    };

    const handleSearch = () => {
        fetchData(1, searchQuery);
    };

    const handleConfirmHire = async (id) => {
        try {
            const url = `https://mixfood-be-production.up.railway.app/api/hire/confirm/${id}`;
            const response = await axios.post(url);
            if (response) {
                toast.success('Xác nhận thành công');
            }
            setHires((prevHires) =>
                prevHires.map((hire) =>
                    hire._id === id ? { ...hire, isCheck: true } : hire
                )
            );
        } catch (error) {
            console.error('Error confirming hire', error);
            toast.error('Failed to confirm hire');
        }
    };

    const handleDeleteHire = async (id) => {
        try {
            const url = `https://mixfood-be-production.up.railway.app/api/hire/delete/${id}`;
            await axios.delete(url);
            setHires((prevHires) => prevHires.filter((hire) => hire._id !== id));
            toast.success('Xóa thành công');
        } catch (error) {
            console.error('Error deleting hire', error);
            toast.error('Failed to delete hire');
        }
    };


    return (
        <div>
            <div className="search-container flex gap-[12px] md:flex-row xs:flex-col">
                <input
                    className="flex-1 px-[24px] py-[8px] bg-[#fafafa]"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm theo tên, số điện thoại hoặc email"
                />
                <button className='bg-[#0b2228] text-[#fff] hover:bg-[#142f36] px-[24px] rounded-[4px] py-[8px] whitespace-nowrap' onClick={handleSearch}>Tìm kiếm</button>
            </div>
            <div className="overflow-x-auto">
                <ToastContainer />
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap" scope="col">STT</th>
                            <th className="whitespace-nowrap" scope="col">Họ và tên</th>
                            <th className="whitespace-nowrap" scope="col">Số điện thoại</th>
                            <th className="whitespace-nowrap" scope="col">Email</th>
                            <th className="whitespace-nowrap" scope="col">Ngày sinh</th>
                            <th className="whitespace-nowrap" scope="col">Quê quán</th>
                            <th className="whitespace-nowrap" scope="col">Kinh nghiệm</th>
                            <th className="whitespace-nowrap" scope="col">Lâu dài</th>
                            <th className="whitespace-nowrap" scope="col">Mong muốn</th>
                            <th className="whitespace-nowrap" scope="col">Ngày gửi</th>
                            <th className="whitespace-nowrap" scope="col">Xác nhận</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hires?.map((hire, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td className="whitespace-nowrap">{hire.name}</td>
                                <td>{hire.phone}</td>
                                <td className="whitespace-nowrap">{hire.email}</td>
                                <td>{hire.dateOfBirth}</td>
                                <td>{hire.hometown}</td>
                                <td>{hire.experience === 'yes' ? 'Có' : 'Chưa có'}</td>
                                <td>{hire.longTime === 'yes' ? 'Có' : 'Không'}</td>
                                <td className='break-all min-w-[250px] max-w-[250px]'>{hire.note}</td>
                                <td>{format(new Date(hire.createdAt), 'dd/MM/yyyy HH:mm:ss')}</td>
                                <td>
                                    {hire.isCheck === false ? (
                                        <div className='whitespace-nowrap flex gap-[12px]'>
                                            <button
                                                className="py-[8px] px-[12px] bg-success text-[#fff] rounded-[4px] hover:opacity-60"
                                                onClick={() => handleConfirmHire(hire._id)}
                                            >
                                                Xác nhận
                                            </button>
                                            <button
                                                className="py-[8px] px-[24px] bg-danger text-[#fff] rounded-[4px] hover:opacity-60"
                                                onClick={() => handleDeleteHire(hire._id)}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    ) : <FontAwesomeIcon icon={faCheck} className='text-success' />}
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

export default RecruimentTable;
