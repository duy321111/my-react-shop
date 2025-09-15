import React from "react";
const TabHeader = ({activeTab, setActiveTab}) => {
    const headers = ["Mô tả", "Thông số kỹ thuật", "Đánh giá"];

    return(
        <div className="tab-header">
            {headers.map((title,index)=>(
                <div
                key={index}
                className={`tab-item ${activeTab === index ? "active":""}`}
                onClick ={()=> setActiveTab(index)}
                >
                {title}
                </div>
                ))}
        </div>
         
    )
}

export default TabHeader;