const user = JSON.parse(localStorage.getItem('user'));
if (!user) window.location.href = 'index.html';

document.getElementById('roleInfo').textContent = `Role: ${user.role}`;
document.getElementById('departmentInfo').textContent = `Department: ${user.department}`;