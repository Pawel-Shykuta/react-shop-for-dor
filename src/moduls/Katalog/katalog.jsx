import React, { useEffect, useState } from "react";
import'./katalog.css'
import { useNavigate } from "react-router-dom";

import Pagination from'../Pagination/Pagination'
import { useRef } from "react";


const Katalog = ({products,loading,corzItems,setCorzItems,towarLength,setTowarLength,PageItem}) =>{

    const [currentPage,setCurrentPAge] = useState(1)    
    const [countriesPerPage] = useState(8)

    const LastCountryIndex = currentPage * countriesPerPage
    const firstCountryIndex = LastCountryIndex - countriesPerPage
    
    const [minPrice,setMinPrice] = useState(100)
    const [maxPrice,setMaxPrice] = useState(10000)  

    const [conMax,setConMax] = useState(maxPrice)
    const [conMin,setConMin] = useState(minPrice)

    const [InputValue,setInputValue] = useState('')

    const[boxCon,setBoxCon] = useState([])
    const currentCountry = products.filter(obj => maxPrice >= obj.price && minPrice <= obj.price &&  (boxCon.length === 0 ||boxCon.some(objF =>objF.filter === obj.filter)) && obj.description.replace(/\s+/g, '').toLowerCase().includes(InputValue)).slice(firstCountryIndex,LastCountryIndex)
    const pagesCurrent = products.filter(obj => maxPrice >= obj.price && minPrice <= obj.price &&  (boxCon.length === 0 ||boxCon.some(objF =>objF.filter === obj.filter)) && obj.description.replace(/\s+/g, '').toLowerCase().includes(InputValue))
    
    const [active , setActive] = useState(null)  

    const addActive = (index)=>{
        setActive(index === active? null:index)
    }
    const [shoveFilter,setShoveFilter] = useState(true)
      const shovFilter = () =>{
        shoveFilter? setShoveFilter(false):setShoveFilter(true)
    }

    const [checkboxes, setCheckboxes] = useState([
              { id: 1, label: "Электронные кодовые замки",filter:1,  checked: false },
              { id: 2, label: "Биометрические замки",filter:2,  checked: false },
              { id: 3, label: "Замок с отпечатком",filter:3,  checked: false },
              { id: 4, label: "Замок с бесконтактной картой",filter:4,  checked: false },
              { id: 5, label: "Программируемые замки",filter:5,  checked: false },
              { id: 6, label: "Замки на батарейках",filter:6,  checked: false },
              { id: 7, label: "Замки с удаленным доступом",filter:7, count: 31, checked: false },
              { id: 8, label: "Bluetooth замки",filter:8,  checked: false },
              { id: 9, label: "Электронные замки для квартиры",filter:9,  checked: false },
              { id: 10, label: "Замки для стеклянных дверей",filter:10,  checked: false },
              { id: 11, label: "Электронные цилиндры", filter:11, checked: false },
    ]);


    const takeInputValue = (someInfo) =>{
        setInputValue(someInfo.target.value.replace(/\s+/g, '').toLowerCase());
        
    }

    const handleCheckboxChange = (id) => {
              setCheckboxes((prev) =>prev.map((checkbox) => checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox )
              );
    };

    const onPageChange = (pageNumber) => {
        setCurrentPAge(pageNumber); 
      };

      const add = () => {
        const selectedItems = checkboxes.filter((el) => el.checked).map((el) => ({
            ...el,
            reload:true
        }));
        setBoxCon(selectedItems)
        console.table(selectedItems)
      };
      
 

    

        const addLogFill = () =>{
            setMinPrice(conMin)
            setMaxPrice(conMax)
            setCurrentPAge(1)
            add()
        }    


        const addToCart = (product) => {
            setCorzItems(prevItems => {
                const existingItem = prevItems.find(item => item.id === product.id);
                if (existingItem) {
                    return prevItems.map(item =>
                        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                    );
                } else {
                    return [...prevItems, { ...product, quantity: 1 }];
                }
            });
        
            setTowarLength(prev => ({
                ...prev,
                [product.id]: (prev[product.id] || 0) + 1
            }));
        };
        


        const MinChange = (e) => {
            const newMin = Number(e.target.value);
            setConMin(newMin);
            if (newMin > conMax) setConMax(newMin); 
          };
          
          const MaxChange = (e) => {
            const newMax = Number(e.target.value);
            setConMax(newMax);
            if (newMax < conMin) setConMin(newMax); 
          };
      
        
         const [conTowarClick,setConTowawrClick] = useState(null)

         const navigate = useNavigate();

         const clickOnTowar = (el) =>{
           setConTowawrClick(el)
           navigate(`/PageItem`,{state: {el}});
         }
          
         const sectionRef =useRef([])

        useEffect(() => {
            const observe = new IntersectionObserver((event) => {
                event.forEach((entry) => {
                    if(entry.isIntersecting) {
                        entry.target.classList.add("show")
                    }
                });
            },
        {threshold: 0.3}
        );
          
        sectionRef.current.forEach((section) => {
            if (section) observe.observe(section)
        })

        return () => {
            sectionRef.current.forEach((section) => {
                if (section) observe.unobserve(section)
            })
        }

        },[])
         
    return(
        <main>
            <h1>Накладные электронные замки</h1>
            <div className="shove-felters">
                <button onClick={shovFilter}>фильтры</button>
                <input type="text" placeholder="Поиск" onChange={takeInputValue} />
            </div>
                <div className="container">
                    {
                        shoveFilter?(
                            <aside>
                                <div className="aside-con hidden" ref={(el) => sectionRef.current.push(el)} >
                                    <h2>Фильтр</h2>
                                        <div className="filter-price">                                     
                                            <details open>
                                                <summary onClick={()=>addActive(0)}  className={ active===0? 'active':'' } >Цена</summary>       
                                                <input type="text" value={conMin} onChange={(e) => setConMin(Number(e.target.value))} />
                                                <input type="text" value={conMax} onChange={(e) => setConMax(Number(e.target.value))} />
                                                <input type="range" min="100" step="100" max="10000" value={conMin} onChange={MinChange} />
                                                <input type="range" min="100" step="100" max="10000" value={conMax} onChange={MaxChange} />
                                             </details>                                   
                                        </div>
                                        <div className="filters">
                                            <details open>
                                                <summary onClick={()=>addActive(1)}  className={ active===1? 'active':'' } >Особенности</summary>
                                                    {checkboxes.map((checkbox) => (
                                                        <div key={checkbox.id}  className="checkbox-container">
                                                        <input
                                                            type="checkbox"
                                                            id={`checkbox-${checkbox.id}`}
                                                            checked={checkbox.checked}
                                                            onChange={() => handleCheckboxChange(checkbox.id)}
                                                        />
                                                        <label htmlFor={`checkbox-${checkbox.id}`}>
                                                            {checkbox.label} 
                                                        </label>
                                                        </div>
                                                    ))}
                                            </details>
                                        </div>   
                                        <button className="Add-filters" onClick={addLogFill}>Применить фильтры</button>                       
                                </div>                      
                    </aside>
                        ):''
                    }
                    

                    <div className="Shop-List">
                           <div className="Shop-con">
                                { !loading ? (currentCountry.map((el)=>(
                                     <div className="Shop-item" key={el.id} >               
                                        <span className="Have">{el.have}</span> <span className="Sale">{el.sale}</span>
                                        <img src={el.image} alt="T1" onClick={()=>clickOnTowar(el)}/>
                                        <h4>(12) отзывов</h4>
                                        <h3>{el.description}</h3>
                                        <h2>{el.price}$</h2>
                                        <span className="Add-to-cart" onClick={() => addToCart(el)} >+</span>
                                    </div>                                     
                                ))):(<div>Loadinng...</div>)}   
                                           
                            </div>   
                            <Pagination  onPageChange={onPageChange} countriesPerPage ={countriesPerPage}  totalCountries={pagesCurrent.length} currentPage={currentPage} />                                             
                    </div>
                </div>
        </main>
    )
}

export default Katalog