const url = 'http://localhost:3000/products';
const addModalForm = document.querySelector('.form-products');
const editModalForm = document.querySelector('#myEditModal .form-products');
let id = '';

fetch(url)
    .then(res => res.json())
    .then(data => 
        data.forEach(products => {
            renderProducts(products);
        })
        );

const tableProducts = document.querySelector('#table-products');
const renderProducts = (products) => {
    const output = `
            <tr data-id = '${products.id}'>
                <td>${products.id}</td>
                <td>${products.productName}</td>
                <td>
                    <img src="${products.image}" class="max-w-[20px]" aspect-square/>
                </td>
                <td><a class="btn-edit btn btn-primary btn-sm">Edit</a> |
                    <a class="btn-del btn btn-danger btn-sm">Delete</a>
                </td>
            </tr>
    `;
    tableProducts.insertAdjacentHTML('beforeend', output);


 //  Delete Product
    const btndel = document.querySelector(`[data-id = '${products.id}'] .btn-del`);
    btndel.addEventListener('click', (e) => {
       // console.log('Deleted !' + products.productName);
       fetch(`${url}/${products.id}`,{
        method: 'DELETE'
       })
       .then(res => res.json())
       .then(() => location.reload());
    }); 

//  Delete Product

//  EDIT PRODUCT
    const btnEdit = document.querySelector(`[data-id = '${products.id}'] .btn-edit`);
    btnEdit.addEventListener('click', (e) =>{
        e.preventDefault();
        id = products.id;
        $("#myEditModal").modal('show');
       // console.log('edit');
       editModalForm.id.value = products.id;
       editModalForm.productName.value = products.productName;
       editModalForm.image.value = products.image;
    });
// End EDIT PRODUCT

};



// ADD PRODUCT
addModalForm.addEventListener('submit',(e) => {
    e.preventDefault();
    console.log('addModalForm' + addModalForm.productName.value);
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: addModalForm.id.value,
            productName: addModalForm.productName.value,
            image: addModalForm.image.value
        })
    })
    .then(res => res.json())
    .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderProducts(dataArr);
    })
})

//  ADD PRODUCT

//  UPDATE PRODUCT
editModalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log('editModalForm')
    fetch(`${url}/${id}`,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: editModalForm.id.value,
            productName: editModalForm.productName.value,
            image: editModalForm.image.value
        })
    })
    .then(res => res.json())
    .then(() => location.reload())
    editModalForm.id.value = '';
    editModalForm.productName.value = '';
    editModalForm.image.value = '';
});

