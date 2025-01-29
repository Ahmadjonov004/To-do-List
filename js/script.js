const taskInput = document.getElementById('task-input');
const message = document.getElementById('message');
const ulItems = document.getElementById('ul-items');
const addItem = document.getElementById('add-item');
const overlay = document.querySelector('.overlay');

const task = document.querySelector('.task');
const deleteModal = document.getElementById('delete-modal');
const closeModalItem = document.getElementById('close-modal-item');
const deleteItem = document.getElementById('delete-modal-item');

const editModal = document.getElementById('edit-modal');
const editInput = document.getElementById('edit-input');
const closeModalEdit = document.getElementById('close-modal-edit');
const saveModalItem = document.getElementById('save-modal-item');

// toggle modal
function toggleModal(modal, isActive){
    if(isActive){
        modal.classList.add('active')
        overlay.classList.add('active')
    }else{
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }
}

let currentItem = null;

// delete task
function deleteOpenModal(target){
    currentItem = target.closest('li');
    if(currentItem){
        task.textContent = currentItem.querySelector('.name').textContent; 
        toggleModal(deleteModal, true);
    }
}

deleteItem.addEventListener('click', () => {
    if(currentItem){
        currentItem.remove();
        toggleModal(deleteModal, false);  
        message.textContent = `${currentItem.querySelector('.name').textContent} muvoffaqiyatli o'chirildi`; 
        message.classList.add('active');
        setTimeout(() => message.textContent = '', 3000); 
    }
});
closeModalItem.addEventListener('click', () =>{
    toggleModal(deleteModal, false)
})
closeModalEdit.addEventListener('click', () =>{
    toggleModal(editModal, false)
})

// edit task
function editOpenModal(target){
    currentItem = target.closest('li');
    if(currentItem){
        editInput.value = currentItem.querySelector('.name').textContent; 
        toggleModal(editModal, true);
    }
}

saveModalItem.addEventListener('click', () => {
    const newValue = editInput.value.trim(); 
    currentItem.querySelector('.name').textContent = newValue; 
    toggleModal(editModal, false); 
    message.textContent = `Topshiriq tahrirlandi`; 
    message.classList.add('active');
    setTimeout(() => message.textContent = '', 3000); 
});


ulItems.addEventListener('click', (e) => {
    const target = e.target;
    if(target.classList.contains('fa-trash-can')){
        deleteOpenModal(target);
    } else if(target.classList.contains('fa-pen-to-square')) { 
        editOpenModal(target);
    }
});

// create task
function createTask(inputValue){
    const li = document.createElement('li');
    li.innerHTML = `
    <div class="name">${inputValue}</div>
    <div class="actions">
        <i class="fa-solid fa-pen-to-square"></i>
        <i class="fa-solid fa-trash-can"></i>
    </div>
    `;
    li.addEventListener('dblclick', () => {
        li.classList.toggle('completed');
    });
    ulItems.appendChild(li);
}

addItem.addEventListener('click', () => {
    const inputValue = taskInput.value.trim();
    if(inputValue.trim()) {  
        createTask(inputValue);
    } else {
        message.textContent = "Input bo'sh bo'masligi kerak";
        message.classList.add('error');
        setTimeout(() => message.textContent = '', 3000);
    }

    taskInput.value = ''; 
});
