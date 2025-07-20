async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const error = document.getElementById('error');

  const { data, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (authError) {
    console.error('Login error:', authError.message);
    error.textContent = 'Invalid email or password';
    return;
  }

  // احضار بيانات المستخدم من جدول users
  const { data: userProfile, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)  // الربط بـ UID من Supabase Auth
    .single();

  if (userError) {
    console.error('User profile fetch error:', userError.message);
    error.textContent = 'Error fetching user profile';
    return;
  }

  // حفظ البيانات
  localStorage.setItem('user', JSON.stringify(userProfile));
  window.location.href = 'dashboard.html';
}
