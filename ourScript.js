function renderProductList(){
    const productList = JSON.parse(window.localStorage.getItem("productList")) || [];
    const productListEl = document.getElementById("productList");
    productListEl = "";
    for(const product of productList){
        const productEl = document.createElement("div");
        const{name, price, description} = product;
        productEl.innerHTML = "<h4>" + name +"</h4>" +
            "<div>" + description + "</div>" +
            "<div><small>Price: "+ price + "</small></div>";
        productListEl.appendChild(productEl);

    }
}
function createNewProduct(event){
    event.preventDefault();

    const name = document.querySelector("[name='name']").value;
    const price = document.querySelector("[name='price']").value;
    const description = document.querySelector("[name='description']").value;

    const product = {name, price, description}; 

    

    const productList = JSON-parse(window.localStorage.getItem("productList")) || [];
    productList.push(product);
    window.localStorage.setItem("productList", JSON.stringify(productList));
    renderProductList(); 
    
    event.target.reset(); 


}
window.addEventListener("storage",function(event){
        if(event.key === "productList"){
            renderProductList();
        }
    
}

