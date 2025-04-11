// lay phan tu
let inputEmail= document.getElementById('input-signin-email');
let inputPassword= document.getElementById('input-signin-password');
let btnSubmit= document.getElementById('input-signin-submit');
let form=document.getElementById('form-signin');

let errorEmail=document.getElementById('errorEmail');
let errorPassword=document.getElementById('errorPassword');
let error=document.getElementById('error');

let user=[
    {
        id:1,
        name:'Nguyễn Thị Yến',
        email:'nty@gmail.com',
        password:'123456789'
    },
    {
        id:2,
        name:'Nguyễn Bảo Khánh',
        email:'nbk@gmail.com',
        password:'987654321'
    },
    {
        id:3,
        name:'Phí Thị Thu Huyền',
        email:'ptth@gmail.com',
        password:'987654321'
    }
];

localStorage.setItem('user', JSON.stringify(user));
// lay gia tri dang nhap tu local
// let user= JSON.parse(localStorage.getItem('user'));


// gan su kien cho nut DANG NHAP
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    // kiem tra gia tri input
    checkInputData();
    // kiem tra xem email da dang ky chua
    emailExists();

})

// ham kiem tra gia tri input
function checkInputData(){
    let check=0;
    if(!inputEmail.value){
        check++;
        errorEmail.innerText='Email không được để trống!';
    }else{
        errorEmail.innerText='';
    }

    if(!inputPassword.value || inputPassword.value.length < 8){
        errorPassword.innerText='Mật khẩu tối thiểu 8 ký tự!';
        check++;
    }else{
        errorPassword.innerText='';
    }
    if(!check){
        emailExists();
    }else{
        error.innerText='Thông tin đăng nhập không hợp lệ!';
    };
}
 
// ham check su ton tai cua email
function emailExists(){
    let index = user.findIndex((item)=> item.email == inputEmail.value);
    if(index!=-1){// neu email da dang ky thi ktra password co dung khong
        if(user[index].password == inputPassword.value){// pass dung
            Owner();
            nextPage();
        }
    }else{// neu email chua ton tai
        errorEmail.innerText='Email không tồn tại trong hệ thống!';
    }
}

// dieu huong trang
function nextPage(){
    window.open('../html/team-management.html', 'Quản lý Dự Án');
}

function Owner(){

    localStorage.setItem('emailInput', JSON.stringify(inputEmail.value));

    let findId=user.findIndex(item=>item.email==inputEmail.value);
    let owner={
        id:user[findId].id,
        name:user[findId].name,
    }
    localStorage.setItem('owner',JSON.stringify(owner));
}