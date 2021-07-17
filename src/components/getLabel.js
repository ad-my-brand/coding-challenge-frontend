import React,{useEffect, useState} from 'react';

const GetLabel =(props)=>{
    const{item,itemList,itemValueSetter,validator}={...props}
    const [showMsg,setShowMsg]=useState('');
    const [listOpen,setListOpen]=useState(false);
    const [firstLoadStatus,setFirstLoadStatus]=useState(false)
    
    //Dropdown, outside click closing logic
useEffect(()=>{
        function clickHandler(e){  
            const openListElement = document.querySelector('.outClickChecker')
            const currentElement = e.target
            if(!openListElement.contains(currentElement)) setListOpen(false);
            
         }
        document.addEventListener('mousedown',(e)=>{
            clickHandler(e)
        })
        return document.removeEventListener('mousedown',(e)=>{
            clickHandler(e)
        })

    },[])
    
    //Run every entry through validator
useEffect(()=>{
        const errMsg = validator(item.name)
       
        if(firstLoadStatus) {
            errMsg?setShowMsg(errMsg):setShowMsg('')
            }
        else{
            
            setFirstLoadStatus(true)
        }
        
    },[item])

 


const updateItemValue =(e)=>{
      itemValueSetter(e.target.value)
      setListOpen(!listOpen)
        
    }
const showListHandler=(e)=>{
        setShowMsg('')
        setListOpen(!listOpen)
    }
  
    return (
        // Drop down implementation---------------------------------------------
        <div className='labelFormWrapper'  >
            <div className='outClickChecker'>
                <div className='dropDownBox'>
                    <div className='dropDownButton'> 
                            <button data-testid='btn' className='dropDownController' onClick={e=>showListHandler(e)}>Select a User</button> 
                    </div>
                    <div className='selectDropValue'><strong>{item.name?item.name:''}</strong></div>
                    
                </div>
                {/* user list population---------------------- */}
                <ul className={`dropDownContent ${listOpen?'showList':''}`}>
                    {
                        itemList.map((item)=>{
                            return <li  data-testid='lst' key={item.id} name={item.name} value ={item.id} onClick={e=>updateItemValue(e)}>{item.name}</li>
                        })
                    }
                </ul>
             </div>
             {/* Error message on failed validation--------------------- */}
             {showMsg?<div className='errorMsgWrapper'>
                <strong>{` ${showMsg}`}</strong>
             </div>:''}
    
        
        </div>

        
    )
}
export default GetLabel;