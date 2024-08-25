---
title: Managing multiple SSH keys
date: 2024-08-26
src: IMG_20240824-001111.png
coverPreview: 'https://irhas.lol/IMG_20240824-001111.png'
---

Everything was smooth when I had a single SSH key for my Git repo at work. But when I got invited to collaborate on a different project with another Git host, things got messy—git clone and git push commands started failing. It took a few days of troubleshooting, but I finally cracked the code for managing multiple SSH keys across different Git hosts. Let me share my ultimate formula.

You might find this formula confusing at first, but trust me—it all becomes quite simple in the end. I've divided the formula into four sections: overlooked path configurations, a file naming habit, the contents of my config file, and the clone command with a specific SSH key.

## Overlooked path configurations

These two Git commands to set a name and email are quite popular:

```bash
# To set the values globally
git config --global user.name "Tony"
git config --global user.email "tony@stark.co.uk"

# To display the current global values
git config --global user.name
git config --global user.email

# To set the values on a specific repository
git config user.name "Tony"
git config user.email "tony@stark.co.uk"

# To display the current values on a specific repository
git config user.name
git config user.email
```

However, the following commands for setting the SSH key path are often overlooked:

```bash
# To globally set the path of our SSH key for Mac and Linux
git config --global core.sshCommand "ssh -i ~/.ssh/id_rsa_tony"

# For Windows
git config --global core.sshCommand "ssh -i C:\\Users\tony\\.ssh\\id_rsa_tony"

# To display the current global SSH key path
git config --global core.sshCommand

# To set the SSH key path on a specific repository for Mac and Linux
git config core.sshCommand "ssh -i ~/.ssh/id_rsa_tony"

# For Windows
git config core.sshCommand "ssh -i C:\\Users\tony\\.ssh\\id_rsa_tony"

# To display the current SSH key path for a specific repository
git config core.sshCommand
```

Now you know how to check the SSH key path at both the global and repository levels. Make a habit of checking these configurations more frequently!

## A file naming habit

Technically, this habit is not directly related to SSH configuration, but there's a specific reason why it makes sense. This habit helps prevent conflicts when creating multiple SSH keys. By default, when you run the command from the official Git documentation, the generated key is named:

```bash
# Two files are generated as a result of creating a new SSH key
id_rsa
id_rsa.pub
```

If you don't rename these files, generating a new key later will fail due to the obvious reason. Therefore, it’s a good idea to rename them with specific purposes in mind:

```bash
# Rename them with specific purposes
id_rsa_tony_bitbucket
id_rsa_tony_bitbucket.pub
```

Now that we have more files in our .ssh directory, you can specify which ones to use for each repository with the command mentioned in the previous section. You might need to specify these files manually each time you connect to a server. To avoid this, you should update your config file. If you don't already have a config file, you'll need to create one inside the .ssh directory.

## The contents of my config file

Here’s what’s inside my config file. If you’re on Windows, remember to replace `~/` with `C:\Users\tony`, as `~/` is specific to Mac and Linux. You can modify the inline comments in the config file below to make them more informative as needed:

```bash
# Default settings for all SSH connections
Host *

# Configuration for GitHub tony@stark.co.uk
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_tony_gitlab
    Port 22

# Configuration for Bitbucket tony@stark.co.uk
Host bitbucket.org
    HostName bitbucket.org
    User git
    IdentityFile ~/.ssh/id_rsa_tony_bitbucket
    Port 22

# Configuration for GitLab tony@stark.co.uk
Host gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/id_rsa_tony_gitlab
    Port 22
```

Updating the config file helps automate the process of connecting to the correct Git host with the appropriate SSH key.

## The clone command with a specific SSH key

Lastly, here’s a command for cloning with a specific SSH key, which can save you a lot of time:

```bash
# For Mac and Linux
git clone git@gitlab.com:avengers/stark.git --config core.sshCommand="ssh -i ~/.ssh/id_rsa_tony_gitlab"

# For Windows
git clone git@gitlab.com:avengers/stark.git --config core.sshCommand="ssh -i C:\\Users\tony\\.ssh\\id_rsa_tony_gitlab"
```

With these steps, managing multiple SSH keys becomes much easier. No more headaches from conflicting SSH keys—just smooth sailing on your Git adventures!