let tbody= document.getElementById('tbody');// phan chua du an
let fixContainer= document.getElementById('fix-container');// giao dien them / sua
let deleteContainer=document.getElementById('delete-container');// giao dien xoa
let text=document.getElementById('text');// tieu de them/ sua du an
let inputProjectName=document.getElementById('input-add-project');// ten du an
let inputProjectDescription = document.getElementById('text-describe-project');// mo ta

let errorName= document.getElementById('errorName');// loi ten
let errorTextarea=document.getElementById('errorTextarea');// loi mo ta
let btnConfirmDelete= document.getElementById('confirm-delete-btn')// nut xoa 

let searchProject= document.getElementById('searchProject');// nut tim du an
// lay du lieu tu local( neu da lu du lieu)
let emailUser=JSON.parse(localStorage.getItem('emailInput'));
let user=JSON.parse(localStorage.getItem('owner'));


let project;
// du lieu du an ban dau(khi chua luu du lieu)
if(!JSON.parse(localStorage.getItem("prj"))){
    project=[
        {
            id:1,
            projectName:'Xây dựng website thương mại điện tử',
            description: 'Hướng đến sự tiện lợi',
            member:[
                {
                    userId: 1,
                    role:'Project owner',
                    email:'nty@gmail.com',
                    name:'Nguyễn Thị Yến'
    
                },
               
            ],
        },
        {
            id:2,
            projectName:'Phát triển ứng dụng di động',
            description: 'Thích hợp với nhiều hệ điều hành',
            member:[
                {
                    userId: 1,
                    role:'Project owner',
                    email:'nty@gmail.com',
                    name:'Nguyễn Thị Yến'
                },

            ],
        },
        {
            id:3,
            projectName:'Quản lý dữ liệu khách hàng',
            description: 'Tổ chức dữ liệu 1 cách tối giản',
            member:[
                {
                    userId: 1,
                    role:'Project owner',
                    email:'nty@gmail.com',
                    name:'Nguyễn Thị Yến'
                },

            ],
        },
        {
            id:4,
            projectName:'Xây dựng website bán hàng',
            description: 'Giao diện nổi bật',
            member:[
                {
                    userId: 3,
                    role:'Project owner',
                    email:'ptth@gmail.com',
                    name:'Phí Thị Thu Huyền'
                },
                
            ],
        },
        {
            id:5,
            projectName:'Phát triển ứng dụng mua bán',
            description: 'Hướng đến sự tiện lợi',
            member:[
                {
                    userId: 3,
                    role:'Project owner',
                    email:'ptth@gmail.com',
                    name:'Phí Thị Thu Huyền'
                },
                
            ],
        },
        {
            id:6,
            projectName:'Quản lý tài nguyên dữ liệu',
            description: 'Quản lý 1 cách hợp lý',
            member:[
                {
                    userId: 2,
                    role:'Project owner',
                    email:'nbk@gmail.com',
                    name:'Nguyễn Bảo Khánh'
                },
               
            ],
        },
        {
            id:7,
            projectName:'Xây dựng website trao đổi mua bán',
            description: 'Hướng đến sự bảo mật và tiện lợi',
            member:[
                {
                    userId: 2,
                    role:'Project owner',
                    email:'nbk@gmail.com',
                    name:'Nguyễn Bảo Khánh',
                },
                
            ],
        },
    
    ];
    localStorage.setItem('prj', JSON.stringify(project));
}else{
    project= JSON.parse(localStorage.getItem('prj'));
}

if (!user.project) {
    user.project = []; 
    project.forEach(task=>{
        
        task.member.forEach(people=>{
            if(people.userId==user.id){
                user.project.push(task);
            }
        })
    })
    
}

let fixIndex=-1;
let currentPage=1;
let taskPerPage=5;
let totalPage= Math.ceil(user.project.length / taskPerPage);

// ham render du an
function showProject(){
    totalPage= Math.ceil(user.project.length / taskPerPage);
    let startIndex=(currentPage-1)*taskPerPage;
    let endIndex=(currentPage)*taskPerPage;
    if(endIndex> user.project.length){
        endIndex= user.project.length;
    }

    tbody.innerHTML='';
    for(let i=startIndex; i<endIndex; i++){
        tbody.innerHTML+=`
            <tr>
                <td class="id-project">${i+1}</td>
                <td class="name-project">${user.project[i].projectName}</td>
                <td><button class="btn btn-fix" onclick="fixTask(${user.project[i].id})">Sua</button></td>
                <td><button class="btn btn-delete" onclick="confirmDelete(${user.project[i].id})">Xoa</button></td>
                <td><button class="btn btn-detail" onclick="detail(${i})">Chi tiet</button></td>
            </tr>        
        `
    }

}
 
//ham hien giao dien them du an
function addTask(){
    fixContainer.style.display='flex';
    text.innerText='Thêm dự án';

    inputProjectName.classList.remove('check-false');
    inputProjectDescription.classList.remove('check-false');
   
}

// ham kiem tr du lieu trong input
function checkAdd(){
    if(fixIndex==-1){
        let check=0;
        // check do dai ten du an
        if(!inputProjectName.value){
            inputProjectName.classList.add('check-false');
            errorName.innerText='Tên dự án không được để trống!'
            check++;
        }else if(inputProjectName.value.length <5){
            inputProjectName.classList.add('check-false');
            errorName.innerText='Tên dự án tối thiểu 5 ký tự!'
            check++;
        }
    // check ten du an khong duoc trung
        let nameNewPrj=user.project.findIndex(prj=>prj.projectName==inputProjectName.value);
        if(nameNewPrj!=-1){
            inputProjectName.classList.add('check-false');
            errorName.innerText='Tên dự án đã tồn tại!'
            check++;
        }
        
    // check do dai mo ta du an
        if(!inputProjectDescription.value){
            inputProjectDescription.classList.add('check-false');
            errorTextarea.innerText='Mô tả không được để trống!'
            check++;
        }else if(inputProjectDescription.value.length <10){
            inputProjectDescription.classList.add('check-false');
            errorTextarea.innerText='Mô tả dự án tối thiểu 10 ký tự!'
            check++;
        }
    
        if(!check){
            errorName.classList.remove('check-false');
            errorTextarea.classList.remove('check-false');
            addProject();
    
            cancel();
        }
    }else{
        addProject();
        cancel();
    }

}

//them du an moi
function addProject(){
    if(fixIndex==-1){
        let maxId = user.project.reduce((max, task) => task.id > max ? task.id : max, 0);// tim id lon nhat
        let newProject={
            id: maxId+1,
            projectName:inputProjectName.value,
            description: inputProjectDescription.value,
            member:[
                {
                userId: user.id,
                    role:'Project owner',
                    email:emailUser.value,
                },
                // {
                //     userId:2,
                //     role:'Frontend developer'
                // },
            ]
        }
        project.push(newProject);
        localStorage.setItem('prj', JSON.stringify(project));
        user.project.push(newProject);
    }else{
       
        user.project[fixIndex].projectName=inputProjectName.value;
        user.project[fixIndex].description=inputProjectDescription.value;
        fixIndex=-1;
    }
    
    showProject();
    localStorage.setItem('owner', JSON.stringify(user));
    renderPagination();
}

// ham hien giao dien xac nhan xoa
function confirmDelete(id){
    deleteContainer.style.display='flex';
    btnConfirmDelete.addEventListener('click',()=>{
        deleteTask(id);
    })
}

// ham xoa du an khi da xac nhan
function deleteTask(id){
    user.project=user.project.filter(task=> task.id!==id)
    localStorage.setItem('owner', JSON.stringify(user));
    showProject();
    cancel();
}

// ham hien thi giao dien sua du an
function fixTask(id){
    addTask();
    text.innerText='Sửa dự án';
    // tim 
    fixIndex = user.project.findIndex(task => task.id === id);
    
    // hien noi dung sua
    if (fixIndex!=-1) {
        inputProjectName.value = user.project[fixIndex].projectName;
        inputProjectDescription.value = user.project[fixIndex].description;
        localStorage.setItem('owner', JSON.stringify(user));
    }
    
}

// ham chuyen huong sang chi tiet du an
function detail(id){
    localStorage.setItem('detail', JSON.stringify(user.project[id]));
    window.open('../html/detail.html');
}

// ham tro lai giao dien 
function cancel(){
    inputProjectName.value='';
    inputProjectDescription.value='';
    errorName.innerText='';
    errorTextarea.innerText='';
    fixContainer.style.display='none';
    deleteContainer.style.display='none';
}

// hien phan trang
function renderPagination(){
    let pageContainer= document.getElementById('page');
    pageContainer.innerHTML=" ";

    for(let i=1; i<=totalPage; i++){
        if(i==currentPage){
            pageContainer.innerHTML+=` <span id="choose-page" onclick="changePage(${i})">${i}</span>`;
        }else{
            pageContainer.innerHTML+=` <span onclick="changePage(${i})">${i}</span>`;
        }
    }
}

// ham thay doi trang
function changePage(page){
    // dat lai currentPage thanh trang duoc click
    currentPage=page;
    
    showProject();

    renderPagination();
}

function prevPage(){
    if(currentPage>1){
        currentPage--;
    }else{
        return;
    }

    showProject();
    renderPagination();
}
function nextPage(){
    if(currentPage< totalPage){
        currentPage++;
    }else{
        return;
    }

    showProject();
    renderPagination();
}

// tim du an
searchProject.addEventListener('keydown',function(event){
    if(event.key =='Enter'){

        let findValue=removeVietnameseTones(searchProject.value);
        let findProject=user.project.filter(task=>removeVietnameseTones(task.projectName).includes(findValue));

        tbody.innerHTML="";
        let count=1;
        findProject.forEach(task=>{
            tbody.innerHTML+=`
            <tr>
                <td class="id-project">${count}</td>
                <td class="name-project">${task.projectName}</td>
                <td><button class="btn btn-fix" onclick="fixTask(${task.id})">Sua</button></td>
                <td><button class="btn btn-delete" onclick="confirmDelete(${task.id})">Xoa</button></td>
                <td><button class="btn btn-detail" onclick="detail(${count})">Chi tiet</button></td>
            </tr>   
            `
            count++;
        })
    }
});

// ham doi chu noi dung input thanh chu thuong va khong co dau
function removeVietnameseTones(str) {
    if (!str) return '';
    return str.normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/đ/g, "d").replace(/Đ/g, "D")
              .replace(/\s+/g, ' ') // xoa khoang trang
              .trim()
              .toLowerCase();
}
showProject();
renderPagination();

// ham logout
function logout(){
    window.open('../html/signin.html');
}
