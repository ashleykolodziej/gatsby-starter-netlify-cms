---
templateKey: video-detail
description: Test the description
featuredpost: false
featuredimage: /img/blog-index.jpg
category: articles
tags:
  - CSS
  - JavaScript
  - HTML
videoId: TqdmUdi8xbY
---

### Introduction

[00:00:00] Ashley Kolodziej: Hey folks! Professor K here. So I had this really great idea to create an app that would pull from my bookmarks and it would take all my resources and it would kind of combine them together and spit out some ideas for you to try out for learning web development.

[00:00:19] So this set of videos is actually going to be the process of me building that for you.

[00:00:24] I want to show you, just from start to finish, literally how I would build something like this. So let's get started.

### Set up a new repository in Github using a template

[00:00:32] All right. So the first thing I need to do - and I have to be honest here, I did a little bit of research before this - but the first thing I would do is literally set up a GitHub repo, and I'm going to do this in my Professor K organization.

[00:00:46] So here, I'm just going to set up a new repo and I want to use a template. So I want to use the student site boilerplate. If I can find it in here, there we go. And if I do that, it'll be really easy for me to just start off with a nice fresh static website using all the dependencies I built for everybody else. So why not start from a template? Right?

[00:01:10] And I'm going to call this my idea generator. And I actually want this, do I want it in Professor K or do I want it in my personal stuff? I'll keep it under Professor K. And for right now, I'm just going to keep this private. I can make it public. Well, actually, you know what?  Let's make it public. And that way you can see this code as I'm doing it.

[00:01:33] So I'm going to create repository. When you start all projects professionally, you're always going to want to start with a GitHub repo. And so far, if you're in my class, this has been done for you using GitHub classroom, but an easy way to get started on your own is by using a template and creating the repository on your own. That's kind of what's happening in the background.

### Clone the remote Github repository to your computer

[00:01:53] All right. So from here, I'm going to do a few things. I'm going to open this. It says with GitHub desktop, but for me, it's going to open it in Tower. I have Tower set up so that if I click these links, it'll open right up in there. It makes it really easy.

[00:02:06] And it's going to try and clone the remote repository and I'm just going to select my GitHub account. And then this is going to clone to documents, Github, idea generator, which is exactly what I want. Alright, perfect. So I'm going to pop over back to my repositories here and at the top. I now have idea generator.

### How to use Git Flow to create a feature branch

[00:02:27] Cool. I'm going to open that up. And before I even start anything, I'm going to create a new branch. Now we haven't talked about this much up here. This is called Git Flow and it makes it really easy to create certain types of branches in a really well configured manner. So I'm going to enable Git flow. And I'm going to say that my production branch is main, my development branche is develop, and then we have feature, hotfix, and release. We're not going to worry about these too much. I'm just going to use feature for my feature branches. So let's configure that. Like I said, I really just like doing this so that I have a nice, consistent workflow.

[00:03:06] So I'm going to start a feature and I want to call my feature - what do I want to call it?  I'm going to add authorization. I'm going to take a stab at actually like authorizing my call out to raindrop.io, and try to get some data in. So let's start that. Cool. Just to take a peek .  Excellent. I think we're in really good shape here.

### Open the repository in VSCode and run npm install

[00:03:32] Okay. So now that my GitHub repo is set up, what I can do is I can open this up in VSCode and in terminal. So the first thing I want to do is just make sure that I've set everything up correctly. I'm going to start with an NPM install.

[00:03:47] Okay. So here's my idea generator. You can just drag and drop this onto Terminal, it makes it really, really easy to do. I'm going to terminate this, just to make this a little bit bigger so you can see it and I'm going to run NPM install. Just make sure everything works as expected.

[00:04:07] And we're back. Okay. So NPM install sometimes takes a while and that's because this particular boiler plate has a lot of dependencies. I really should go back through and look at it and like, make sure everything that's there as needed, but  my first pass at it. So it's it's okay. I'll get it figured out.

### Run the npm run start command to begin building

[00:04:24] So what I want to do at this point is I think I want to run NPM run start. And that's the command we use to get this boilerplate going. So let's take a look and just make sure that works. It's a good time to try that and they'll take a moment to compile, but that's okay.

[00:04:44] Here we go. Looking good so far.

[00:04:47] And you can see that Webpack is building. What it's doing as it's building is it's taking all of the dependencies and kind of looking around and seeing where you're pointing at things and bundling up these modules so that everything works properly when you go to give your website to the live world.

[00:05:06] So just like NPM install, this takes a little bit of time on the first run, but it goes quicker afterwards.

[00:05:13] Here we go. Almost done. Perfect. And look at that. We have our students site boilerplate. Excellent. So this is great news. We're making good progress here. Finally, I'm going to open up my idea generator S code just by dragging and dropping it on top. And you can see, I was kind of working out the details of this tutorial back here.

### How to make an authenticated call to an API using JavaScript

[00:05:34] So you'll see that there, but for now, I'm going to really focus on just trying to get some stuff from my API, from the raindrop and logging it out to the console. In order to do that, I need to make an authenticated call out or an authorized call. We haven't talked much about authorized calls.

[00:05:59] Cause last week we talked about fetch and we did some simple fetch examples where we just went out, grabbed stuff from API and came back. But part of the process of actually going out and getting data and bringing it back is sometimes obtaining what's called an access token, something that says who you are to the application and why you're going and fetching data.

[00:06:22] So raindrop.io requires you to authenticate to get anything from the application, including your own stuff. Because I am not getting anybody else's data, I don't have to go through the full authorization process.

### What is authorization in web development?

[00:06:37] Now you've probably gone through an authorization process, even in Tower, right? If you use Tower and you connect to your GitHub account, you go through a screen that says, "Hey, do you want to allow Tower to access your GitHub information?"

[00:06:50] And you say yes. And then you go back to Tower. That's the process of authorization at work. You're doing the exact same thing there from the user side as I'm going to be doing from the developer side.

### How to decide what access your app needs to ask for

However, because I don't need to ask you for information. I only care about my data here, I've gone through and read this. And it says, if you just want to test your application or don't plan to access any data except yours, you don't need to do all of these steps. So there's actually an app management console in raindrop that lets you create a new app and get a token that way. So, obviously I don't want to give my token away to you and show you all that.

[00:07:29] So I'm not going to show you that here, but the idea is that at the end, what we're going to do is make a request out to raindrop.io and then try and get some data back.

### How to add authorization headers to fetch in JavaScript

Okay. So I just told you something really important. I don't want to share my token with you.

[00:07:48] So here, my code says, fetch some URL, and then this is new here. This object that comes after the fetch in the URL. These are some options that you can give to that fetch command. To, say, give it extra information when initializes. So here, one way that you can say that you've authorized with the application is to send what's called a header.

[00:08:14] And this header says it's an authorization type header and it bears an OAuth token. If you want to take a look and see over here in authentication, when you make an authorized call, this is looking for this authorization, bearer, and then some access token. This isn't a real access token here, obviously in their documentation. It's just one to give you an idea of what it would look like.

### How to use dotenv to store access tokens and other sensitive information in your app without committing it to your codebase

But like I said, I don't want to give you that data. So how do I get this token in here without actually showing you - or the whole world - on GitHub what on earth that token is? I want to keep it a secret, right? The answer is called a dot env file. E N V.

[00:09:00] This file actually allows you to store really sensitive information like that. And what happens is that when you compile everything - and especially with Webpack, it goes really nicely with Webpack - it will process all of this stuff together so that nobody ever actually sees your token. But you can still make the calls out to the API and not showing anybody like your secrets.

[00:09:26] So here's what we're going to do. To install that I've identified a dot env web pack plugin that's going to work really well for this. And I'm just going to follow the directions here. Just do an NPM, install that and Webpack, and then save dev. I'm going to have to terminate my process to do this that's control C and paste this in.

[00:09:49] It's my idea generator. And while that's going, I'm just going to have a moment to look at the documentation here. How do I use this? Well, first of all, I'm going to need to create that dot env file and I'm going to need to set some variables. And then finally, I'm going to have to add it to my Webpack config.

[00:10:09] So why don't I do some of these things while I wait for this to install over here. And I'm just going to open this up so I can kind of keep an eye on this over here. Let's say that we have an OAUTH underscore token equals, and then I'm going to put gobbledy gook here. But if I had the real token in ,which I will eventually, you're just not going to be able to see it -  I would go and paste in that token that the, raindrop.io over here gave me an integration. So that's where I would put that. That's where this token goes. So here, OAUTH token equals something. It doesn't matter what it is. Go save it. And then this is going to be at the root idea generator, and we're going to call this dot E N V And when we do that, we're going to get a warning.

[00:11:01] Go ahead and use the dot. That's totally fine.

### How to add dotenv to your webpack config

[00:11:04] This is finished installing, so that's great. What else did we need to do? Well, we needed to add this to our Webpack config. So here in config,  all of our Webpack settings are here. This is what controls how the student site boiler plate is built, and you can modify it so that you can add things to Webpack as you need them.

[00:11:25] In my case, I need to add something to Webpack plugins. So let's take a look back at the documentation and see what we need here. I'm going to need this const dot env equals required dot env Webpack. That will say, use this package that we just installed from NPM. So down here, let's go put it at the bottom and save this.

[00:11:47] So I have to think about it.

[00:11:50] And then when I look here at module dot exports, I have plugins and then new dot, and I am just going to, since this particular set of exports is all plugins already. I don't have to worry about this plugins here. That's kind of handled elsewhere in the code, but I am going to add the new dot env at the very bottom, along with a comma. Let's hit save.

[00:12:15] And then I am going to now test this and make sure that it works as expected. So NPM run start. If all has gone, well, this should start right up.

[00:12:26] Waiting for it to start, waiting for it to compile.

### Test that dotenv is working correctly

[00:12:32] All right. And we're back. And now this is compiled and loaded. And if we take a look at inspect element, there is nothing in the console. So that's good. That means that we have hopefully gotten this all set and put together nicely. So the last thing we need to do is see if we can call this variable in scripts.js and have it output correctly.

[00:12:58] So before I put my real information in dot env I want to test it on this video and show you and see if I did it right. So I'm just going to do a simple console dot log. And then I'm going to try and call this variable, and I just need to reference the documentation for that. So let's go to that web pack and see what that looks like.

[00:13:16] So using your code console log process dot env and then your variable name. So I'm just going to copy this. Paste it here and then do OAUTH_TOKEN. Cause that's the variable that I put in that end, right. That is over in here. And my dot and file. This is my token. And if all is working correctly, when we console log, this will see the word something. Let's try.

[00:13:43] Okay. So over here, let's inspect head to our console, something - excellent. It's working now. One thing you might have noticed is I've got a couple errors in my terminal. That's okay. These are linting errors there. Nothing too much to worry about. If you get them, you can fix them using the fixed option. So the way you would do that is stop the process and then do the NPM run fix.

[00:14:11] And this is going to try and fix those automatically. Yeah.

[00:14:14] And there you go. All it did was add a line break.

### Conclusion

[00:14:17] All right. So I think that's a good place to pause for now. Hopefully, by the end of this tutorial, you will have seen the full process of this, but in this video we have covered so far creating a new repository and GitHub, getting that over to Tower, what Git Flow looks like, then finally using dot and Webpack to manage sensitive information such as authorization tokens in your repository.

[00:14:43] So now if you do need to authorize with fetch, you're going to know how to do it next. We're going to take a look at actually making that fetch call and seeing if we can get some data back, I'll see you in just a moment.