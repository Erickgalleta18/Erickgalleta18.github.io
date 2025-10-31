window.onload = ()=>{
    let imgGalery = document.querySelector("#main-product-img")
    let imgs = document.querySelectorAll(".thumb")
    price = 0

    for(let i=0; i<imgs.length; i++){
        imgs[i].addEventListener('click',(evt)=>{
            imgGalery.src=evt.target.src.replace("thumbs/","")
            imgs.forEach(item=>{
                item.classList.remove('active')
            })
            evt.target.classList.add('active')
        })
    }

    let sizes = document.querySelectorAll(".size-btn")

    for(let i=0;i<sizes.length;i++){
        sizes[i].addEventListener('click',(evt)=>{
            sizes.forEach(item=>{
                item.classList.remove('active')
            })
            console.log(price)
            price+=40
            evt.target.classList.add('active')
           
        })
    }





    
}//Llave on load