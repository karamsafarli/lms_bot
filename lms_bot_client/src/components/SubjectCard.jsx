/* eslint-disable react/prop-types */

const SubjectCard = ({ data }) => {

    const returnValidString = (str) => {
        if (str.length > 0) return str;
        else return '-';
    }

    return (
        <div className="lms_card">
            <div className="card_header">
                {data.subjectName}
            </div>

            <div className="card_content">
                <div className="subject_info">
                    <span>Qayıb:</span>
                    <span>{data.absence}%</span>
                </div>
                <div className="subject_info">
                    <span>Aktivlik:</span>
                    <span>{data.activity}</span>
                </div>
                <div className="subject_info">
                    <span>Təqdimat:</span>
                    <span>{data.presentation}</span>
                </div>
                <div className="subject_info">
                    <span>Laboratoriya:</span>
                    <span>{data.lab}</span>
                </div>
                <div className="subject_info">
                    <span>Quiz:</span>
                    <span>{data.quiz}</span>
                </div>
                <div className="subject_info">
                    <span>Midterm:</span>
                    <span>{data.midterm}</span>
                </div>
                <div className="subject_info">
                    <span>Imtahandan öncəki bal:</span>
                    <span>{data.pointsBeforeExam}</span>
                </div>
                <div className="subject_info">
                    <span>Imtahan balı:</span>
                    <span>{returnValidString(data.examPoint)}</span>
                </div>
                <div className="subject_info">
                    <span>Yekun bal:</span>
                    <span>{returnValidString(data.totalPoint)}</span>
                </div>
                <div className="subject_info">
                    <span>Yekun bal (hərf):</span>
                    <span>{returnValidString(data.totalPointLetter)}</span>
                </div>
            </div>
        </div>
    )
}

export default SubjectCard