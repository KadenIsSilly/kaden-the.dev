const commitSHA = document.getElementById('commit-sha');

try {
    const github = await fetch('https://api.github.com/repos/KadenIsSilly/kaden-the.dev/commits?per_page=1');
    const data = await github.json();
    console.log(data);

    commitSHA.href = data[0].html_url;
    commitSHA.textContent = ` (${data[0].sha.slice(0, 7)})`;
} catch {
    commitSHA.textContent = '';
}