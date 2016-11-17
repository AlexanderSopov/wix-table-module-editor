#Wix-Module Editor

## Background
Qamcom and Amparo made a common decision to build their latest website on the wix service.
The thinking behind this decision is that they don't always have (and/or don't wish to have) the technical competence (available for such a task, I should say) to keep updating their websites as-needed and wix provides a great interface for any non-technical person to develop a website.

It's not perfect, however, and some common features in website design is lacking. This is circumvented by wix allowing for custom HTML code within small "sandboxes" to be applied to websites built by their service. This is also limited in the sense that the sandbox has no access to anything from the rest of the site and theres no shared assets or space, so I've avoided using jquery and pretty much any third-party library in order to not clog up the website.

These "sandboxes" or modules as I'll call them from here on are written in html, css and javascript which, again, makes it difficult for non-technical persons to customize the content.

Well... Welcome to the solution.

This repo is an editor for these custom modules that are written for qamcom and amparo. The basic idea is that the content creator only needs to add the content and the editor spits out the code that is then to be copy/pasted onto the wix HTML modules.

## Is this the right place for you to start?
If you wish to only USE the editor (and not extend it), then this is the wrong place for you to be in. Instead, there's an article in tips and tricks under knowledge-base in confluence that explains how to use the editor and also provides a link for the editor only (and not its source code which is this repo)

## Instructions
Great! You've read up on background and whether this is where you're suppose to be and you're still here! That's awesome.

First of all, congratulations. You have my old job and I absolutely loved it and I hope you'll love it, too.

So, onto the instructions.

### Prerequisites
make sure you have the latest NodeJS installed in your computer and also make sure you have yarn package manager installed (npm comes with Node as of this writing, but I wouldn't be surprised if that soon changes so just make sure)

### Installation and Setup
1. in a folder where you wish to install this repo, run a 'git clone git@cm:wix/module-editor' command

2. 'cd module-editor/'

3. 'yarn'

4. 'yarn run run'

5. in a different command shell, cd into the repo and run 'yarn run reload'

What just happened is that you installed the modules for development, you ran a watcher that keeps an eye on the source code, waiting for changes and a server that launches the editor and reloads the browser anytime such a change occurs.

### Get to know the code
The first thing to understand is that this entire source code is a custom built static site generator which makes it far easier to develop static html sites. It uses the pug template language for HTML and Stylus for CSS. It also uses browserify and babel for transpiling Javascript modules into browser-friendly JS code.

You can easily google those for a comprehensive guide to understanding them

The only folder you need to concern yourself with is the dev/ folder. The dist/ folder could be interpreted as a temporary files (that never gets erased but feel free to erase it when you're done developing - it's always regenerated) and the build/ folder contains the compiled and built editor that you're seeing in your browser, this is the folder you should zip and pass around when you're done.

#### dev/
The structure of the dev is
static/
	js/
	img/
	css/
templates/
	includes/
	index.pug
locals.json


The static folder contains the static js, css and images for the editor itself (not its output and preview)
The templates folder contains the index.pug file that is a html-template file (a lot easier and convenient way to write html). For more info on this, google "pug template".
locals.json is used for passing variables into the index.pug and is currently unused.
