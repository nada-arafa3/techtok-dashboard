
const supabase = window.supabase.createClient(
  'https://hnuklvjbhanjvtxsijvo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhudWtsdmpiaGFuanZ0eHNpanZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NTM4OTksImV4cCI6MjA2ODUyOTg5OX0.xQU1wXChKZOpP6UP0upevw9QAiApGpC_jTR1wcdxIWM'
);

const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskUserSelect = document.getElementById('taskUser');

if (user.role === 'admin') taskForm.style.display = 'block';


async function loadTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('id, description, status, created_at, user_id, users (full_name)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading tasks:', error.message);
    return alert('Error loading tasks');
  }

  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  if (data.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No tasks yet';
    taskList.appendChild(li);
    return;
  }

  const user = JSON.parse(localStorage.getItem('user'));
  const email = user.email;

  data.forEach(task => {
    const name = task.users?.full_name || 'Unknown';

    if (
      email === 'nadaarafa515@gmail.com' ||
      (email === 'amiraamr445@gmail.com' && name === 'amira') ||
      (email === 'samysnds99@gmail.com' && name === 'sondos') ||
      (email === 'nada259saleh@gmail.com' && name === 'nada saleh') ||
      (email === 'alshaimaaabdelnaeem@gmail.com' && name === 'alshimaa') ||
      (email === 'omniacis1@gmail.com' && name === 'omnia') ||
      (email === 'yousser00@gmail.com' && name === 'yosr')
    ) {
      const li = document.createElement('li');

      // عرض الاسم فقط لو ندى عرفه
      if (email === 'nadaarafa515@gmail.com') {
        li.textContent = `${task.description} - ${name}`;
      } else {
        li.textContent = `${task.description}`;
      }

      // Create dropdown to change status
      const select = document.createElement('select');
      ['open', 'in progress', 'done'].forEach(statusOption => {
        const option = document.createElement('option');
        option.value = statusOption;
        option.textContent = statusOption;
        if (task.status === statusOption) {
          option.selected = true;
        }
        select.appendChild(option);
      });

      select.onchange = async () => {
        const newStatus = select.value;
        const { error: updateError } = await supabase
          .from('tasks')
          .update({ status: newStatus })
          .eq('id', task.id);

        if (updateError) {
          console.error('Error updating status:', updateError.message);
          alert('Error updating task');
        } else {
          loadTasks(); // Reload to reflect change
        }
      };

      li.appendChild(select);
      taskList.appendChild(li);
    }
  });
}




async function loadUsers() {
  console.log('Loading users...');
  const { data, error } = await supabase.from('users').select('id, full_name');

  if (error) {
    console.error('Error fetching users:', error.message);
    return alert('Error fetching users');
  }

  console.log('Fetched users:', data);

  data.forEach(user => {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = user.full_name;
    taskUserSelect.appendChild(option);
  });
}

async function addTask() {
  const desc = document.getElementById('taskDesc').value;
  const status = document.getElementById('taskStatus').value;
  const user_id = document.getElementById('taskUser').value;

  if (!desc || !status || !user_id) {
    return alert('يرجى ملء جميع الحقول');
  }

  const { error } = await supabase.from('tasks').insert({ description: desc, status, user_id });
  if (error) {
    console.error('Error adding task:', error.message);
    return alert('Error adding task');
  }

  alert('Task added');
  document.getElementById('taskDesc').value = '';
  document.getElementById('taskStatus').value = 'open';
  document.getElementById('taskUser').value = '';

  loadTasks();
}

loadTasks();
if (user.role === 'admin') loadUsers();
