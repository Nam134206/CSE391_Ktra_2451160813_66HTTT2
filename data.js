const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const form = document.getElementById("borrowForm");

let borrows =
JSON.parse(localStorage.getItem("borrows"));

if(!borrows){

    borrows = [

        {
            borrowId:"PM-1001",
            name:"Nguyễn Văn An",
            bookId:"BK10001",
            category:"CNTT",
            borrowDate:"2026-05-20",
            dueDate:"2026-06-15",
            phone:"0912345678",
            email:"an@library.vn",
            status:"Đang mượn",
            note:"Mượn sách JavaScript cơ bản"
        },

        {
            borrowId:"PM-1002",
            name:"Trần Thị Bình",
            bookId:"BK10002",
            category:"Kinh tế",
            borrowDate:"2026-05-10",
            dueDate:"2026-05-30",
            phone:"0388888888",
            email:"binh@library.vn",
            status:"Đã trả",
            note:"Đã trả đúng hạn"
        },

        {
            borrowId:"PM-1003",
            name:"Lê Văn Cường",
            bookId:"BK10003",
            category:"Ngoại ngữ",
            borrowDate:"2026-05-25",
            dueDate:"2026-06-20",
            phone:"0799999999",
            email:"cuong@library.vn",
            status:"Đang mượn",
            note:"Mượn sách luyện TOEIC"
        },

        {
            borrowId:"PM-1004",
            name:"Phạm Thị Đào",
            bookId:"BK10004",
            category:"Kỹ năng",
            borrowDate:"2026-05-15",
            dueDate:"2026-06-10",
            phone:"0588888888",
            email:"dao@library.vn",
            status:"Đã trả",
            note:"Sách kỹ năng giao tiếp"
        },

        {
            borrowId:"PM-1005",
            name:"Hoàng Minh Đức",
            bookId:"BK10005",
            category:"CNTT",
            borrowDate:"2026-06-01",
            dueDate:"2026-06-25",
            phone:"0322222222",
            email:"duc@library.vn",
            status:"Đang mượn",
            note:"Mượn sách ReactJS nâng cao"
        }

    ];

    localStorage.setItem(
        "borrows",
        JSON.stringify(borrows)
    );
}
let editIndex = -1;

// MỞ MODAL

openModal.onclick = () => {
    form.reset();
    clearErrors();
    editIndex = -1;
    modal.style.display = "block";
};

closeModal.onclick = () => {
    modal.style.display = "none";
};

// HIỂN THỊ BẢNG

function renderTable(){

    let html = "";

    borrows.forEach((item,index)=>{

        html += `
        <tr>
            <td>${item.borrowId}</td>
            <td>${item.name}</td>
            <td>${item.bookId}</td>
            <td>${item.category}</td>
            <td>${item.borrowDate}</td>
            <td>${item.dueDate}</td>
            <td>${item.phone}</td>
            <td>${item.email}</td>
            <td>${item.status}</td>
            <td>${item.note}</td>

            <td>
                <button
                    class="edit-btn"
                    onclick="editBorrow(${index})">
                    Sửa
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteBorrow(${index})">
                    Xóa
                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById("borrowList").innerHTML = html;

    updateStats();
}

// THỐNG KÊ

function updateStats(){

    document.getElementById("total").innerText =
    borrows.length;

    document.getElementById("borrowing").innerText =
    borrows.filter(x=>x.status==="Đang mượn").length;

    document.getElementById("returned").innerText =
    borrows.filter(x=>x.status==="Đã trả").length;
}

// XÓA

function deleteBorrow(index){

    if(confirm("Bạn có muốn xóa không?")){

        borrows.splice(index,1);

        saveData();
    }
}

// SỬA

function editBorrow(index){

    const b = borrows[index];

    document.getElementById("borrowId").value =
    b.borrowId;

    document.getElementById("name").value =
    b.name;

    document.getElementById("bookId").value =
    b.bookId;

    document.getElementById("category").value =
    b.category;

    document.getElementById("borrowDate").value =
    b.borrowDate;

    document.getElementById("dueDate").value =
    b.dueDate;

    document.getElementById("phone").value =
    b.phone;

    document.getElementById("email").value =
    b.email;

    document.getElementById("status").value =
    b.status;

    document.getElementById("note").value =
    b.note;

    editIndex = index;

    modal.style.display = "block";
}

// VALIDATE

function validate(){

    clearErrors();

    let borrowId =
    document.getElementById("borrowId").value.trim();

    let name =
    document.getElementById("name").value.trim();

    let bookId =
    document.getElementById("bookId").value.trim();

    let category =
    document.getElementById("category").value;

    let borrowDate =
    document.getElementById("borrowDate").value;

    let dueDate =
    document.getElementById("dueDate").value;

    let phone =
    document.getElementById("phone").value.trim();

    let email =
    document.getElementById("email").value.trim();

    let status =
    document.getElementById("status").value;

    let note =
    document.getElementById("note").value.trim();

    let valid = true;

    if(borrowId === ""){
    showError("borrowIdError","Không được để trống");
    valid = false;
}

if(name === ""){
    showError("nameError","Không được để trống");
    valid = false;
}

if(bookId === ""){
    showError("bookIdError","Không được để trống");
    valid = false;
}

if(category === ""){
    showError("categoryError","Không được để trống");
    valid = false;
}

if(borrowDate === ""){
    showError("borrowDateError","Không được để trống");
    valid = false;
}

if(dueDate === ""){
    showError("dueDateError","Không được để trống");
    valid = false;
}

if(phone === ""){
    showError("phoneError","Không được để trống");
    valid = false;
}

if(email === ""){
    showError("emailError","Không được để trống");
    valid = false;
}

if(status === ""){
    showError("statusError","Không được để trống");
    valid = false;
}

    if(borrowId !== "" && !/^PM-\d{4}$/.test(borrowId)){
    showError("borrowIdError","Định dạng PM-XXXX");
    valid = false;
}

if(name !== "" && !/^[A-Za-zÀ-ỹ\s]{2,40}$/.test(name)){
    showError("nameError","2-40 ký tự, chỉ chứa chữ");
    valid = false;
}

if(bookId !== "" && !/^BK\d{5}$/.test(bookId)){
    showError("bookIdError","BK12345");
    valid = false;
}

if(phone !== "" && !/^(03|05|07|08|09)\d{8}$/.test(phone)){
    showError("phoneError","SĐT không hợp lệ");
    valid = false;
}

if(email !== "" && !email.endsWith("@library.vn")){
    showError("emailError","Email phải kết thúc @library.vn");
    valid = false;
}

if(note.length > 120){
    showError("noteError","Tối đa 120 ký tự");
    valid = false;
}
    return valid;
}

function showError(id,msg){
    document.getElementById(id).innerText = msg;
}

function clearErrors(){
    document
    .querySelectorAll(".error")
    .forEach(e=>e.innerText="");
}

// THÊM / 

form.onsubmit = function(e){

    e.preventDefault();

    if(!validate()) return;

    const borrow = {

    borrowId: document.getElementById("borrowId").value,
    name: document.getElementById("name").value,
    bookId: document.getElementById("bookId").value,
    category: document.getElementById("category").value,
    borrowDate: document.getElementById("borrowDate").value,
    dueDate: document.getElementById("dueDate").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    status: document.getElementById("status").value,
    note: document.getElementById("note").value
    };

    if(editIndex===-1){

        borrows.push(borrow);

    }else{

        borrows[editIndex] = borrow;
    }

    saveData();

    modal.style.display="none";
};

// LƯU LOCAL STORAGE

function saveData(){

    localStorage.setItem(
        "borrows",
        JSON.stringify(borrows)
    );

    renderTable();
}

renderTable();