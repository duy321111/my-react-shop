import React from 'react';

const Pagnination = () => {
    return(
        <div>
            <ul className="pagnination home-product__pagination">
                <li className="pagnination-item ">
                    <a href="" className="pagnination-item__link">
                        <i className="pagnination-item__icon fa-solid fa-angle-left"></i>
                    </a>
                </li>
                
                <li className="pagnination-item pagnination-item--active">
                    <a href="" className="pagnination-item__link">1
                    </a>
                </li>

                <li className="pagnination-item">
                    <a href="" className="pagnination-item__link">2
                    </a>
                </li>
                
                <li className="pagnination-item">
                    <a href="" className="pagnination-item__link">3
                    
                    </a>
                </li>
                
                <li className="pagnination-item">
                    <a href="" className="pagnination-item__link">4
                        
                    </a>
                </li>
                
                <li className="pagnination-item">
                    <a href="" className="pagnination-item__link">5
                        
                    </a>
                </li>
                
                <li className="pagnination-item">
                    <a href="" className="pagnination-item__link">6
                        
                    </a>
                </li>
                
                <li className="pagnination-item">
                    <a href="" className="pagnination-item__link">7
                    
                    </a>
                </li>

                <li className="pagnination-item ">
                    <a href="" className="pagnination-item__link">
                        <i className="pagnination-item__icon fa-solid fa-angle-right"></i>
                    </a>
                </li>

            </ul>
        </div>
    )
}

export default Pagnination;