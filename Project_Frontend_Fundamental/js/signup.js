// lay phan tu
let form= document.getElementById('form-signup');
let inputName= document.getElementById('input-signup-name');
let inputEmail= document.getElementById('input-signup-email');
let inputPassword= document.getElementById('input-signup-pasword');
let inputConfirmPassword= document.getElementById('input-signup-confirmPassword');
let btn= document.getElementById('input-signup-submit');

let errorName=document.getElementById('errorName');
let errorEmail=document.getElementById('errorEmail');
let errorPassword=document.getElementById('errorPassword');
let errorConfirmPassword=document.getElementById('errorConfirmPassword');
let error=document.getElementById('error');


// khoi tao doi tuong chua thong tin dang ky
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
//khoi tao bien check xem tab duoc dieu huong da mo chua
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    // ten trong
    let check=0;
    if(!inputName.value){
        inputName.classList.add('check-false');
        inputName.classList.remove('check-true');
        errorName.innerText='Tên không được để trống!';
        check++;
    }else{
        inputName.classList.add('check-true');
        inputName.classList.remove('check-false');
    };
    // email trong
    if(!inputEmail.value){
        inputEmail.classList.add('check-false');
        inputEmail.classList.remove('check-true');
        errorEmail.innerText='Email không được để trống!'
        check++;
    }else{
        inputEmail.classList.add('check-true');
        inputEmail.classList.remove('check-false');
    };
    // email khong duoc trung
    let index= user.findIndex(item=>item.email== inputEmail.value)
    if(index!=-1){
        inputEmail.classList.add('check-false');
        inputEmail.classList.remove('check-true');
        errorEmail.innerText='Email đã được đăng ký!'
        check++;
    }
    
    // password ko dc trong va it nhat 8 ky tu

    if(!inputPassword.value || inputPassword.value.length < 8){
        inputPassword.classList.add('check-false');
        inputPassword.classList.remove('check-true');
        errorPassword.innerText='Mật khẩu tối thiểu 8 ký tự!';
        check++;
    }else{
        inputPassword.classList.add('check-true');
        inputPassword.classList.remove('check-false');
    };
    // confirm pass trong
    if(!inputConfirmPassword.value || inputConfirmPassword.value != inputPassword.value){
        inputConfirmPassword.classList.add('check-false');
        inputConfirmPassword.classList.remove('check-true');
        errorConfirmPassword.innerText='Mật khẩu không trùng khớp!'
        check++;
    }else{
        inputConfirmPassword.classList.add('check-true');
        inputConfirmPassword.classList.remove('check-false');
    }
    if(!check){
        let newUser ={
            id: user.length,
            name: inputName.value,
            email: inputEmail.value,
            password:inputPassword.value
        };
        user.push(newUser);
        localStorage.setItem('user', JSON.stringify(user));
        
        deleteInput();
        window.open('../html/team-management.html', 'Quản lý Dự Án');
    }else{
        
        error.innerText='Thông tin đăng nhập không hợp lệ!';
    };
});
 function deleteInput(){
    inputName.value='';
    inputEmail.value='';
    inputPassword.value='';
    inputConfirmPassword.value='';

    inputName.classList.remove('check-true');
    inputEmail.classList.remove('check-true');
    inputPassword.classList.remove('check-true');
    inputConfirmPassword.classList.remove('check-true');
 }

