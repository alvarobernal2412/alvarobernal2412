import { promises as fs } from 'fs'
import axios from 'axios'
// import dotenv from 'dotenv'

// dotenv.config()

// const ACCESS_TOKEN = process.env.ACCESS_TOKEN

const {
    ACCESS_TOKEN
  } = process.env


async function getEvents(username, accessToken) {
    const response = await axios.get(`https://api.github.com/repos/users/${username}/events/public`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return "Hola";
}

async function getStatsForOrganization(organization, accessToken) {
    const response = await axios.get(`https://api.github.com/orgs/${organization}/repos`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const repos = await response.data;

    const stats = [];

    const date = new Date();
    date.setDate(date.getDate() - 6);

    for (const repo of repos) {
        const {pulls, prComments} = await getPRs(organization, repo.name, accessToken);
        const {issues, issueComments} = await getIssuesInfo(organization, repo.name, accessToken);
        const releases = await getReleases(organization, repo.name, accessToken);
        const avgPRComments = pulls !== 0 ? (prComments / pulls).toFixed(2) : 0;
        const realIssues = issues - pulls;
        const realIssueComments = issueComments - prComments;
        const avgIssueComments = issues !== 0 ? (realIssueComments / realIssues).toFixed(2) : 0;

        let commitRanking;
        if(repo.name === 'htld-doc'){
            commitRanking = await getRanking(organization, repo.name, accessToken, date, "main");
        }else{
            commitRanking = await getRanking(organization, repo.name, accessToken, date,"develop");
        }

        stats.push({
            repo: repo.name,
            pulls,
            prComments,
            avgPRComments,
            issueComments: realIssueComments,
            issues: realIssues,
            avgIssueComments,
            releases,
            commitRanking
        });
    }
    const docStats = await getDocStats(accessToken, date.toISOString());

    return { stats, docStats };
}

const organization = 'ISPP-07';
const accessToken = ACCESS_TOKEN;
try{
    const {stats, docStats} = await getStatsForOrganization(organization, accessToken);
    const date = new Date();

    const formattedDate = date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });


    let statsMDX = '';
    try{
        statsMDX = await fs.readFile('./docs/Seguimiento del equipo/Estadísticas de github.mdx','utf-8');
        statsMDX = statsMDX.replace('<h4 align="center">Esta sección ha sido autogenerada mediante github actions, hecho por Álvaro Bernal Caunedo</h4>', '');
        statsMDX += `\n### Estadísticas de la semana del ${formattedDate}\n| Repositorio | Nº de PRs |Comentarios en PRs | Nº de comentarios por PR | Nº de Issues | Comentarios en Issues |Nº de comentarios por Issue |Nº de lanzamientos|\n| ----------- |----------- |----------- |----------- |--------------- | ------------------ | --------------------- | --------------- |\n`;
    }catch(err){
        statsMDX = `\n### Estadísticas de la semana del ${formattedDate}\n| Repositorio | Nº de PRs |Comentarios en PRs | Nº de comentarios por PR | Nº de Issues | Comentarios en Issues  |Nº de comentarios por Issue |Nº de lanzamientos|\n| ----------- |----------- |----------- |----------- |--------------- | ------------------ | --------------------- | --------------- |\n`;
    }

    stats.forEach(repoStats => {
        statsMDX += `| ${repoStats.repo} | ${repoStats.pulls} |${repoStats.prComments}| ${repoStats.avgPRComments}| ${repoStats.issues}| ${repoStats.issueComments}  |${repoStats.avgIssueComments} |${repoStats.releases} |\n`;
        console.log('Estadísticas incluidas en el archivo...');
    });

    stats.forEach(repoStats => {
        statsMDX += `\n\n#### Ranking de commits en el repositorio ${repoStats.repo} esta semana\n| Autor | Nº de commits |\n| ------ | -------------- |\n`;
        const ranking = Object.entries(repoStats.commitRanking).sort((a, b) => b[1] - a[1]);
        ranking.forEach(([author, commits]) => {
            statsMDX += `| ${author} | ${commits} |\n`;
        });
        console.log('Ranking de commits incluido en el archivo...');
    })

    statsMDX += `\n\n### Cambios en el docusaurus en la semana del ${formattedDate}\n| Archivo | Nº de Cambios | Estado |\n| ------ | -------------- | ------ |\n`;
    const changes = Object.entries(docStats);
    changes.forEach(([file, change]) => {
        statsMDX += `| ${file} | ${change.changes} | ${change.status} |\n`;
    });
    console.log('Cambios en la documentación incluidos en el archivo...');

    statsMDX += '\n<h4 align="center">Esta sección ha sido autogenerada mediante github actions, hecho por Álvaro Bernal Caunedo</h4>';
    await fs.writeFile('./docs/Seguimiento del equipo/Estadísticas de github.mdx', statsMDX, { flag: 'w' });
    console.log('Archivo de estadísticas actualizado correctamente.');
} catch (error) {
    console.error('Error al obtener las estadísticas:', error);
}