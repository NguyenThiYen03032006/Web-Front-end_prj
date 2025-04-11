let taskName=document.getElementById('name-task');
let taskDescribe=document.getElementById('taskDescribe');
let fixContainer=document.getElementById('fix-container');
let deleteContainer=document.getElementById('delete-container');
let btnConfirmDelete=document.getElementById('confirm-delete-btn');

let textFixAdd=document.getElementById('textFixAdd');
let inputAddTask=document.getElementById('input-add-project');// ten nhiem vu
let assignee=document.getElementById('assignee');// nguoi phu trach
let statusTask=document.getElementById('status');// trang thai
let startDate=document.getElementById('start-date');
let endDate=document.getElementById('end-date');
let priority=document.getElementById('priority');//do uu tien
let progress=document.getElementById('progress');// tien do

let todoBody=document.getElementById('to-do-body');
let inProgressBody=document.getElementById('in-progress-body');
let pendingBody=document.getElementById('pending-body');
let doneBody=document.getElementById('done-body');
// lay du lieu tu local
let detailProject=JSON.parse(localStorage.getItem('detail'));
let owner=JSON.parse(localStorage.getItem('owner'));
let project=JSON.parse(localStorage.getItem('prj'));

let fixIndex=-1;

tasks=[
    {
        id:1,// id nhiem vu
        taskName:"Soạn thảo để cương",
        assigneeId:1,// id nguoi ohu trach
        assigneeName:'Nguyễn Thị Yến',
        projectId: 3,// id du an
        asignDate:"02-24",
        dueDate:"03-26",
        priority:"Thấp",
        progress:"Đúng tiến độ",
        status:"To do",
    },
    {
        id:2,
        taskName:"Phác thảo dự án",
        assigneeId:3,
        assigneeName:'Phí Thị Thu Huyền',
        projectId: 2,
        asignDate:"01-04",
        dueDate:"02-27",
        priority:"Trung bình",
        progress:"Đúng tiến độ",
        status:"To do",
    },
    {
        id:3,
        taskName:"Soạn thảo để dự án",
        assigneeId:2,
        assigneeName:'Nguyễn Bảo Khánh',
        projectId: 1,
        asignDate:"04-19",
        dueDate:"06-02",
        priority:"Cao",
        progress:"Trễ hạn",
        status:"To do",
    }
];
localStorage.setItem('tasks',JSON.stringify(tasks));
titleDetail();
console.log(owner);

// them nhiem vu theo du an tuong ung
if(!detailProject.taskList){
    detailProject.taskList=[];
    tasks.forEach(task=>{
        if(task.projectId==detailProject.id){
            detailProject.taskList.push(task);
        }
    })
    localStorage.setItem('detail', JSON.stringify(detailProject));
}
//ham sua hien thi tieu de
function titleDetail(){
    taskName.innerText=detailProject.projectName;
    taskDescribe.innerText=detailProject.description;

}
renderEmployee();
// ham them nguoi phu trach
function renderEmployee(){
    // assignee.innerHTML+=`
    // <option value="people">${owner.name}</option>
    // `
    let indexTask=project.findIndex(item=>item.id==detailProject.id);
    console.log(project[indexTask].menber);
        project[indexTask].member.forEach(people=>{
            assignee.innerHTML+=`
            <option value="people">${people.name}</option>
        `
        })
    
}

// ham hien thi
function renderTask(){
    let todohtml = '';
    let progresshtml='';
    let pendinghtml='';
    let donehtml='';
    detailProject=JSON.parse(localStorage.getItem('detail'));
    
    
    detailProject.taskList.forEach(task => {
        
        if (task.status == 'To do') {
            todohtml += `
            <tr>
                <td>${task.taskName}</td>
                <td>${task.assigneeName}</td>
                <td><span class="priority" id="taskPriority${task.id}">${task.priority}</span></td>
                <td class="date">${task.asignDate}</td>
                <td class="date">${task.dueDate}</td>
                <td><span class="timeLine" id="taskProgress${task.id}">${task.progress}</span></td>
                <td><button class="btn btn-fix" onclick="fixTaskContainer(${task.id})">Sửa</button></td>
                <td><button class="btn btn-delete" onclick="confirmDelete(${task.id})">Xoá</button></td>
            </tr>
            `;
        }
        if (task.status == 'In progress') {
            progresshtml += `
            <tr>
                <td>${task.taskName}</td>
                <td${task.assigneeName}</td>
                <td><span class="priority" id="taskPriority${task.id}">${task.priority}</span></td>
                <td class="date">${task.asignDate}</td>
                <td class="date">${task.dueDate}</td>
                <td><span class="timeLine" id="taskProgress${task.id}">${task.progress}</span></td>
                <td><button class="btn btn-fix" onclick="fixTaskContainer(${task.id})">Sửa</button></td>
                <td><button class="btn btn-delete" onclick="confirmDelete(${task.id})">Xoá</button></td>
            </tr>
            `;
        }
        if (task.status == 'Pending') {
            pendinghtml += `
            <tr>
                <td>${task.taskName}</td>
                <td${task.assigneeName}</td>
                <td><span class="priority" id="taskPriority${task.id}">${task.priority}</span></td>
                <td class="date">${task.asignDate}</td>
                <td class="date">${task.dueDate}</td>
                <td><span class="timeLine" id="taskProgress${task.id}">${task.progress}</span></td>
                <td><button class="btn btn-fix" onclick="fixTaskContainer(${task.id})">Sửa</button></td>
                <td><button class="btn btn-delete" onclick="confirmDelete(${task.id})">Xoá</button></td>
            </tr>
            `;
        }
        if (task.status == 'Done') {
            donehtml += `
            <tr>
                <td>${task.taskName}</td>
                <td>${task.assigneeName}</td>
                <td><span class="priority" id="taskPriority${task.id}">${task.priority}</span></td>
                <td class="date">${task.asignDate}</td>
                <td class="date">${task.dueDate}</td>
                <td><span class="timeLine" id="taskProgress${task.id}">${task.progress}</span></td>
                <td><button class="btn btn-fix" onclick="fixTaskContainer(${task.id})">Sửa</button></td>
                <td><button class="btn btn-delete" onclick="confirmDelete(${task.id})">Xoá</button></td>
            </tr>
            `;
        }
    });
        
    todoBody.innerHTML = todohtml;
    inProgressBody.innerHTML=progresshtml;
    pendingBody.innerHTML=pendinghtml;
    doneBody.innerHTML=donehtml;
    // doi mau 
    detailProject.taskList.forEach(task => {
        
        let priority = document.getElementById(`taskPriority${task.id}`);
            let progress = document.getElementById(`taskProgress${task.id}`);
            let priorityText =task.priority;
            let progressText =task.progress;
            console.log(priorityText);
            if (priorityText == 'Thấp') {
                priority.style.backgroundColor = 'rgba(13, 202, 240, 1)';
            } else if (priorityText == 'Trung bình') {
                priority.style.backgroundColor = 'rgba(255, 165, 0, 1)';
            } else {
                priority.style.backgroundColor = 'rgba(220, 53, 69, 1)';
            }

            if (progressText == 'Đúng tiến độ') {
                progress.style.backgroundColor = 'rgba(25, 135, 84, 1)';
            } else if (progressText == 'có rủi ro') {
                progress.style.backgroundColor = 'rgba(255, 165, 0, 1)';
            } else {
                progress.style.backgroundColor = 'rgba(220, 53, 69, 1)';
            }
    });
}

// ham hien giao dien them task
function addTaskContainer(){
    fixContainer.style.display='flex';
    textFixAdd.innerText='Thêm nhiệm vụ';
}

// ham them nhiem vu moi
function addTask(){
    let assigneeId=owner.id;
    project.forEach(task=>{
        task.member.forEach(people=>{
            if(people.name==assignee.value){
                assigneeId=people.id;
            }
        })
    })

    if(fixIndex==-1){
        let [startYear, startMonth, startDay] = startDate.value.split('-');
        let start = `${startMonth}-${startDay}`;
        let [endYear, endMonth, endDay] = endDate.value.split('-');
        let end = `${endMonth}-${endDay}`;
        let maxId = tasks.reduce((max, task) => task.id > max ? task.id : max, 0);// tim id lon nhat
        let newTask={
            id:maxId+1,// id nhiem vu
            taskName:inputAddTask.value,
            assigneeId:assigneeId,// id nguoi phu trach
            assigneeName:assignee.value,
            projectId: detailProject.id,// id du an
            asignDate:start,
            dueDate:end,
            priority:priority.value,
            progress:progress.value,
            status:statusTask.value,
        }
    
        tasks.push(newTask);
        detailProject.taskList.push(newTask);
        localStorage.setItem('tasks',JSON.stringify(tasks));
        localStorage.setItem('detail',JSON.stringify(detailProject));
        detailProject = JSON.parse(localStorage.getItem('detail'));
    }else{
        detailProject.taskList[fixIndex].taskName=inputAddTask.value;
        detailProject.taskList[fixIndex].status=statusTask.value;
        detailProject.taskList[fixIndex].asignDate=startDate.value;
        detailProject.taskList[fixIndex].dueDate=endDate.value;
        detailProject.taskList[fixIndex].priority=priority.value;
        detailProject.taskList[fixIndex].progress=progress.value;

        localStorage.setItem('tasks',JSON.stringify(tasks));
        localStorage.setItem('detail',JSON.stringify(detailProject));
        fixIndex=-1;
    }
    cancel();
    renderTask();
}

function fixTaskContainer(id){
    fixContainer.style.display='flex';
    
    textFixAdd.innerText='Sửa nhiệm vụ';
    fixIndex=detailProject.taskList.findIndex(task=>task.id=id)
    console.log(fixIndex)
    console.log( detailProject.taskList[fixIndex])
    // hien thi lai du lieu trong input
    if(fixIndex!= -1){
        inputAddTask.value=detailProject.taskList[fixIndex].taskName;
        statusTask.value=detailProject.taskList[fixIndex].status;
        startDate.value=detailProject.taskList[fixIndex].asignDate;
        endDate.value=detailProject.taskList[fixIndex].dueDate;
        priority.value=detailProject.taskList[fixIndex].priority;
        progress.value=detailProject.taskList[fixIndex].progress;

        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('detail', JSON.stringify(detailProject));

    
        
    }
    
}
function confirmDelete(id){
    deleteContainer.style.display='flex';
    // Xóa các sự kiện cũ để tránh việc thêm nhiều lần
    btnConfirmDelete.removeEventListener('click', handleDeleteClick);
    btnConfirmDelete.addEventListener('click', handleDeleteClick);

    function handleDeleteClick() {
        deleteTask(id);
    }
}
// ham xoa du an khi da xac nhan
function deleteTask(id){
    // xoa task khoi taskList
    detailProject.taskList = detailProject.taskList.filter(task => task.id != id);

    // cap nhat lai tasks tronf local
    tasks = tasks.filter(task => task.id != id);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // cap nhat lai detailProject trong localStorage
    localStorage.setItem('detail', JSON.stringify(detailProject));

    renderTask();

    cancel();
}
// ham xoa giao dien them sua xoa
function cancel(){
    inputAddTask.value='';
    assignee.value='';
    statusTask.value='';
    startDate.value='';
    endDate.value='';
    priority.value='';
    progress.value='';
    fixContainer.style.display='none';
    deleteContainer.style.display='none';
}
renderTask();
// ham logout
function logout(){
    window.open('../html/signin.html');
}