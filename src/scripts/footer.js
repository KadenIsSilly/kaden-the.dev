document.getElementById('year').textContent = new Date().getFullYear();

try {
    const github = await fetch('https://api.github.com/repos/KadenIsSilly/kaden-the.dev/commits?per_page=1');
    const data = await github.json();
    const commitSHA = document.getElementById('commit-sha');

    commitSHA.href = data[0].url;
    commitSHA.textContent = ` (${data[0].sha.slice(0, 7)})`;
} catch {
    commitSHA.textContent = '';
}