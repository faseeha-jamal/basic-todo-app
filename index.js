let showItems=document.querySelector(".out-container");
let err=document.querySelector(".err")
let inpVal=document.querySelector(".inp");
let addBtn=document.querySelector(".btn");
let i=1;
if (!localStorage.getItem("data")) {
  localStorage.setItem("data", JSON.stringify([]));
}

createItem();

inpVal.addEventListener("keydown",(e)=>{
    // console.log(e.key);
  if(e.key=="Enter"){
     inpErr()
  }
})

addBtn.addEventListener("click",()=>{ 
   inpErr()
})

function inpErr(){
if(inpVal.value){
  let arr={item:inpVal.value,id:i++}
  //  showItems.innerHTML=""
 
   let newArr=JSON.parse(localStorage.getItem("data"))
   newArr.push(arr)

   localStorage.setItem("data",JSON.stringify(newArr));
    console.log(newArr)
      inpVal.value=""
      createItem()
      err.innerText=""
  }else{
    err.innerText="Enter You'r item"
  }
}

function createItem(){
  let arrItm=JSON.parse(localStorage.getItem("data")||{item:""})
  console.log(arrItm);
  showItems.innerHTML=""
        inpVal.value=""
    
    arrItm.forEach((obj)=>{
        // console.log("hello");
        let div=document.createElement("div")
        let list=document.createElement("h3")
        let upd=document.createElement("button")
        let del=document.createElement("button")
         
        div.className="list"
        list.className="item"
        list.innerText=obj.item
        upd.innerText="Update"
        del.innerText="Remov"
        // console.log(list);
        del.addEventListener("click",()=>{
          let filData=arrItm.filter((itm)=>{
            return itm.id!=obj.id
          })
          localStorage.setItem("data",JSON.stringify(filData))
          createItem()
        })

        upd.addEventListener("click",()=>{
            list.innerHTML=`<input type="text" value="${obj.item}">`;
          list.addEventListener("change",(e)=>{
            let val={item:e.target.value}
            console.log(val);
            localStorage.setItem("data",JSON.stringify(val))

          }) 
            createItem()
        })
    
        div.append(list,upd,del)
        showItems.appendChild(div)
    

    })
}





