---
title: I start my career with this terminal setup
date: 2024-04-20
---

As a programmer, you spend a significant amount of time in the terminal. So why not make it an amazing and visually appealing experience? In this blog post, I'll share my minimum Powershell setup on Windows Terminal with [Oh My Posh](https://ohmyposh.dev/) and [Lazygit](https://github.com/jesseduffield/lazygit) to transform your command line interface into a powerful and customizable tool.

## Motivation

To simplify the motivation of doing all of this, I just tell you two reasons:

1. Branch information, branch information is not exist by default unless you're using git bash.
2. Terminal UI and shortcut for git commands that will save you a ton of times.

Now, let's get started:

## Install Windows Terminal

If you haven't already, head over to the Microsoft Store or GitHub and install Windows Terminal on your Windows machine. Windows Terminal is free and provides an excellent foundation for customizing your terminal experience.

## Install Powershell

If you're using Windows 11, I believe PowerShell is already the latest version which has autosuggestion feature by default. But most of the times, if you're using Windows 10, you need to update PowerShell to the latest version to get the autosuggestion feature. There's many way to that but what I usually do, is head over to the [PowerShell GitHub](https://github.com/PowerShell/PowerShell), download the desired file, and install it.

## Install Oh My Posh

To install Oh My Posh, we'll use PowerShell, which is integrated into Windows Terminal. Open Windows Terminal and launch PowerShell.

Head over to [Oh My Posh documentation](https://ohmyposh.dev/docs/installation/windows) to complete the installation.

## Choose a Theme

After you completed the installation, you notice that you're already have a theme, you can keep using that or you can change that with many other themes.

Because I'm super original, I usually using Robby Russel theme the creator of Oh My Zsh. I recommend you using this theme, beacuse it's simple but also covered all your needs.

To do it, simply open your PowerShell profile script. For example, using notepad:

```powershell
notepad $PROFILE
```

And here's mine, you can copy paste to yours:

```text
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/robbyrussell.omp.json" | Invoke-Expression
```

Save and reload the Terminal to see the changes.

## Install Lazygit

You need [scoop](https://scoop.sh/) to help you easily install things on your system including Lazygit.

After you have scoop, then head over to [lazygit documentation](https://github.com/jesseduffield/lazygit#scoop-windows) to complete the installation.
