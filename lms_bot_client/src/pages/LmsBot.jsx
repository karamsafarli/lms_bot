/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import Loading from "../components/Loading";
import SubjectCard from "../components/SubjectCard";
import { IoLogOutOutline } from "react-icons/io5";



const LmsBot = () => {
    const navigate = useNavigate();
    const [lmsData, setLmsData] = useState([]);
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const [isLoading, setIsLoading] = useState(false);

    const logout = () => {
        localStorage.clear();

        navigate('/login');
    }

    useEffect(() => {
        const user = localStorage.getItem('username');
        if (!user) return navigate('/login');
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const res = await fetch('http://localhost:3000/scrape', {
                    method: 'POST',
                    body: JSON.stringify({
                        username,
                        password
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();
                console.log(data)
                setLmsData(data);
                setIsLoading(false);
            } catch (error) {
                toast('Xəta baş verdi, bir daha cəhd edin.', { type: 'error' })
                setTimeout(() => navigate('/login'), 1000)
            }
        }

        fetchData();

    }, [])

    return (
        <>
            {
                isLoading ? <Loading /> :
                    <div className="lms_bot">
                        <div className="logout">
                            <IoLogOutOutline onClick={logout} />
                        </div>
                        <div className="heading">
                            <img src="/bot.png" alt="" />
                            <h1>ASOIU LMS BOT</h1>
                        </div>

                        <div className="lms_bot_content">
                            <div className="container">
                                <div className="student_name">
                                    <img src="/student.png" alt="" />
                                    <span>{lmsData[0]?.student}</span>
                                </div>

                                <div className="card_wrapper">
                                    {lmsData.length > 0 &&
                                        lmsData.map((data) => {
                                            return <SubjectCard key={data.subjectName} data={data} />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }

            <ToastContainer />
        </>
    )
}

export default LmsBot