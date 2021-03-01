require('dotenv').config();
const { Octokit } = require('@octokit/rest');
const roles = require('./config.json');

const { REPO_OWNER, REPO } = process.env;

// create dictionary
const roleAssignments = {};
roles.forEach((el) => {
  el.asignees.forEach((member) => {
    roleAssignments[member] = el.role;
  });
});

const octokit = new Octokit({
  auth: process.env.GIT_OATH,
});

main();

async function main() {
  const issues = await octokit.issues.listForRepo({
    owner: REPO_OWNER,
    repo: REPO,
  });

  for (const issue of issues.data) {
    const label = roleAssignments[issue.user.login];
    if (label) {
      let labelFound = false;

      for (const _label of issue.labels) {
        if (_label.name == label) {
          labelFound = true;
          break;
        }
      }

      // no matching label was found -> add label
      if (!labelFound) {
        await octokit.issues.addLabels({
          owner: REPO_OWNER,
          repo: REPO,
          issue_number: issue.number,
          labels: [label],
        });
      }
    }
  }
}
