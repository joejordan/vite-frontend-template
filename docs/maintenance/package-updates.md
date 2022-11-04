# Update Project Dependencies

Updating project dependencies can be a tedious job. This doc is intended to help streamline the process and provide developers with a historical record of package updates and problems encountered along the way so that future issues can be avoided.

## Maintain Update Log

Create a new `Update Log` file using a previous version as a template. Include package version diffs using the `ncu` package described below. Include notes on any package version rollbacks and errors encountered along the way that may have hindered a particular package update.

## Update Tooling

It is generally recommended that we keep our local dev environments updated and in sync with the production builds of our applications. Node version should keep pace with the current LTS release whenever possible.

## Update Dependencies

[npm-check-updates](https://github.com/tjunnone/npm-check-updates) is our recommended tool to update project dependencies. The recommended process to update packages is to first make patch-level updates, followed by minor updates, and finally major updates, testing after each update step to ensure the updates have not degraded or broken app functionality.

Record the output of `ncu` for each step in the update process, and edit as necessary when a particular package update is infeasible.

In the event that an update breaks functionality, a decision should be made as to whether or not the update is worth the time and effort to get it working. Handle on a case-by-case basis, and include any notes in the Update Log as to why the update has been skipped.

Familiarize yourself with the npm-check-updates documentation [here](https://github.com/raineorshine/npm-check-updates#readme). Run `npm install` after each set of package updates and test to ensure the updates have not broken anything. Here are a few basic `ncu` commands to get started (Note: `-u` will update the `package.json` file):

1.  `ncu --target patch`
2.  `ncu --target minor`
3.  `ncu`
4.  `ncu -u --target patch`
5.  `ncu -u --target minor`
6.  `ncu -u`
