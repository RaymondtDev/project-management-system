# Project Management System

Freelance project management system for managing projects, milestones, tasks, and clients. Built using the MERN stack, project serves as a demonstration of skills learned and competence. It took me close to 4 months to build, and as I continue to learn new skills, it will continue to grow in the number of features present.

I was motivated to build this particular project primarily because I wanted to build something that serves as a demonstration of my skills and competence. Insted of building something simple, I instead tried to come up with an idea for an application I could potentially use in a real-world situation. Thus, I built a project management system that I would use if I ever pursued freelancing as a carrer trajectory.

# Features

Initially, I planned the project to only have basic CRUD features which would've made it akin to a task manager application. But as I kept on working, I ended up wanting to include features like invoice creation and generating a PDF for it. This part of the development was especially challenging because I had no clue how implement certain features (like creating a project and then its milestones and tasks simultaneously).

I ended up learing a lot of code implementations that will come in handy for projects I'll be building in the near future. I learned about MongoDB sessions and trasactions, that react can be used on the server to create PDF documents, and how do use Blobs to download/view a document that was created on the server.

## Dashboard

![Alt text](assets/screenshot-dashboard.png)

## Project Creation

<table style="border: none; width: 100%">
  <tr>
    <td colspan="2"><img src="./assets/screenshot-create-project-project-details.png" /></td>
  </tr>
  <tr>
    <td><img src="./assets/screenshot-create-project-client-details.png" /></td>
    <td><img src="./assets/screenshot-create-project-milestones-and-tasks.png" /></td>
  </tr>
</table>

## Projects List

<table>
  <tr>
    <td><img src="./assets/screenshot-projects.png" /></td>
    <td><img src="./assets/screenshot-projects-kanban.png" /></td>
  </tr>
<table>

## Project Details

![Alt text](assets/screenshot-project-details.png)

## Invoices

![Alt text](assets/screenshot-invoices.png)

## Invoice PDF

![Alt text](assets/screenshot-invoice-pdf.png)

# Challenges

The basic CRUD operations and authentication logic was fairly simple to implement because I had worked on other projects that used similar features, but what was particulary difficult was creating a project and the required data (client, milestones, tasks) simultaneously. I have never been in a scenario where I would use feature like Mongoose sessions and transactions, so I had to rely on AI to provide assistance and show me exactly how I would implement the logic for my project cretion feature.

I ran into a lot of bugs like: the project would be created along with the client details but not the milestones and tasks. And I spent an embarrasingly long amount of time trying to figure out where the problem was. It wasn't until I checked the code and tracked how it would work on paper until I found the culprit.

In addition to such problems, I also confused the difference between <code class="language-javascript">findOneAndDelete()</code> and <code class="language-javascript">findByIdAndDelete()</code>. This particular confusion resulted in being unable to delete a milestone I wanted to delete without deleting the one that appears first in the list of data. I had to look at my project deletion logic to finally find the mistake that I made.

The last brick wall I faced was implementing a server-generated Invoice PDF feature wherein the PDF can be sent to the client email using Resend and also be downloaded by the admin, but only on project completions (I condition I handled in the front-end). AI had to come to the assist here once again because I had no clue how to implement the feature. 
