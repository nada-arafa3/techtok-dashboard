const supabase = window.supabase.createClient(
  'https://hnuklvjbhanjvtxsijvo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhudWtsdmpiaGFuanZ0eHNpanZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NTM4OTksImV4cCI6MjA2ODUyOTg5OX0.xQU1wXChKZOpP6UP0upevw9QAiApGpC_jTR1wcdxIWM'
);

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

  const { data: userProfile, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (userError) {
    console.error('User profile fetch error:', userError.message);
    error.textContent = 'Error fetching user profile';
    return;
  }

  localStorage.setItem('user', JSON.stringify(userProfile));
  window.location.href = 'dashboard.html';
}
