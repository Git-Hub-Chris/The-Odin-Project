# The Odin Project: [Learn Web Development for Free](http://theodinproject.com)

v0.2.0

This site provides the main user experience for The Odin Project, including the home page and all user functions.  It is meant to be a shell around [The Curriculum](http://theodinproject.com/curriculum) and to include the tools that help students learn more effectively along their learning journeys.

The website has been open-sourced to provide both a learning resource for students who want to see how the tools they're using are built and to give students the opportunity to stretch their wings and contribute to a real open-sourced project... while building the tools they themselves will be using.

For minor fixes, either submit a github issue or a pull request.  Please coordinate with the project maintainers if you're interested in working on some of the larger features in order to avoid traffic jams.

*[http://theodinproject.com/](http://theodinproject.com)*

*Check out the [Contributing Page](http://www.theodinproject.com/contributing) if you'd like to learn more about how to help out*

Contact us directly at [project@theodinproject.com](mailto:project@theodinproject.com)

## Contributing to the Site

This project is emphatically beginner-friendly so, if you're interested in potentially contributing, take a look at the [Contributing Page](http://www.theodinproject.com/contributing) on the website for more information. See the [Getting Involved document](https://github.com/TheOdinProject/theodinproject/blob/master/getting_involved.md) for details of how we develop the website.

### Hacking on the Site Yourself: Getting Set Up

This site runs on **Ruby 2.0.0-p353** and **Rails 4.0.0** (upgraded from Ruby 1.9.3 and Rails 3.2.12 in February 2014)

#### Nitrous.io Setup

We **STRONGLY** recommend windows users and newbies having trouble setting up their environments just use [nitrous.io](https://www.nitrous.io/join/GRrt3VYaHE8?utm_source=nitrous.io&utm_medium=copypaste&utm_campaign=referral).  Nitrous is a cloud-based development environment.  They basically just give you a fully stocked machine that's almost ready to go out of the box.

We use Nitrous almost exclusively during our group coding sessions so, if you'd like to get involved that way, you'll need to set it up eventually.

1. [Follow along with this gist](https://gist.github.com/afshinator/8035821) to do the setup.
2. Don't forget to populate your test database with `$ rake db:test:prepare`

#### Standard Setup

1. Start by forking this repository by clicking the Fork button at the top right of this Github repo and then download your copy of the repo to your local machine by doing a `$ git clone git@github.com:YOUR_USERNAME/theodinproject.git` from the command line (the $ stands for your command prompt)
2. Hopefully you've got RVM set up on your machine (if not, check out the [Installations Project](http://www.theodinproject.com/courses/web-development-101/lessons/installations).  You'll need to make sure you have Ruby 2.0.0p-353 installed (see installed rubies with `$ rvm list`).  If you don't have it, get it using `$ rvm get stable` then `rvm install 2.0.0-p357`.
2. You'll need to create a project-specific gemset to keep track of all the gems we use in one place.  The repo has a (hidden) file called `.ruby-gemset` which specifies the gemset for you every time you enter the project's directory.  It should be called `theodinproject` to match up.  You can create it by running `$ rvm gemset create theodinproject`.  For help with RVM, [check out this blog post](http://stjhimy.com/posts/04-using-rvm-gemsets-to-manage-multiple-rails-installations-in-the-same-ruby-version)
2. `cd` into the project directory using `$ cd theodinproject`
2. Run a `$ bundle install` to install all the gems used by the project.
1. Note: Both local and production databases are [Postgres](http://www.postgresql.org/docs/), so if you're used to just using Rails' default SQLite database you'll need to get Postgres fired up on your local machine.  You can probably get away with just typing `$ rake db:create` but may need to download a client for it and create a `theodinproject` database that the application can connect to.  The major difference is that Postgres operates almost like a server.  Ryan Bates has a [RailsCast](http://railscasts.com/episodes/342-migrating-to-postgresql) episode about migrating to Postgres that may be helpful if you're a newbie.  If you're deployed on Heroku (which we are), you need to use PG anyway.
2. Once you've got postgres installed and have created the empty database, run a `$ rake db:migrate` to run all the migrations that will set up the schema properly.  Then run `$ rake db:test:prepare` to set up the test database so you can actually run specs.

##### Populating the Database

3. The `db/seeds.rb` file is used to populate all the course and lesson meta-data.  Use the command `$ rake db:seed` to populate all the meta-data for courses and lessons so you can run the rake task in the next step.  `db/seeds.rb` is identical to the data you'll see presented on the production site (this is used to populate it).  You can run it as many times as you'd like... it basically deletes all metadata and repopulates it with each run.  The seeds file only creates curriculum data, it doesn't create any users.
3. One thing the seeds file will not populate is the actual content for each lesson.  This needs to be retrieved from the curriculum repository on github (which is at [http://www.github.com/theodinproject/curriculum](http://www.github.com/theodinproject/curriculum)).  But our lesson database is so big! We have so much to teach! To get around the rate-limit cap Github will impose upon you, we will generate a secret token with github to access our curriculum and lessons! Click your 'Settings' in the top right hand corner of your github page. On the left hand header that pops up, click 'Applications'. Once there, under the 'Personal Access Tokens' header, click generate new token.  You should check the boxes for 'repo','write:repo_hook','notifications', 'read:org', and 'gists'. COPY THIS TOKEN DOWN SOMEWHERE!!! You will not see it again. With your token in hand, go back to Terminal, and type 'rails generate figaro:install'. This will create your application.yml file under your config folder.  Open config/application.yml, and type GITHUB_API_TOKEN: YOUR TOKEN YOU JUST GENERATED.  Putting it in this file will hide it from all other users. Finally, back in Terminal, type 'rake db:drop', 'rake db:create', 'rake db:migrate', and 'rake db:seed'.  If there are no errors, congratulations! You now have the full course load to be able to help the Odin Project!
3. The Moot forums and Github API calls rely on private environment variables (to store their API secret keys) that you won't find in the repo. I upload them directly to the server myself using the `figaro` gem and a corresponding file called `application.yml` that's located in my `config/` directory but not checked into git (no, you can't have my passwords).  Check out the [Figaro Documentation](https://github.com/laserlemon/figaro) for a very easy-to-understand explanation of how the gem works.  You basically just need to run `$ rails generate figaro:install` and populate the missing variables to `application.yml`.  An example, as of this writing:

        # config/application.yml
        moot_api_key: UjI8SKQv6J
        moot_secret_key: no_you_cant_have_my_secret_key
        GITHUB_API_TOKEN: your_token_would_go_here

1. Run a `$ rails server` and see if that lets you check out the app at `http://localhost:3000`.
1. That... should... be... it...?

This is basically all you need to get yourself set up with the repo and you should be able to run a server with `$ rails s` or the tests with `$ rspec spec`.  Of course, nothing ever goes according to plan when installing things but hopefully your "Googling the error message" skills are up to the task.


#### Installing Postgres on Linux

If you're running Linux, this should be helpful.  If not... carry on, nothing to see here.

1. Open your terminal and type ```sudo apt-get install postgresql

2. After installing postgres, you might like to install pgAdmin III. It is a nice GUI to have, especially for beginners. To do this, in terminal type ```sudo apt-get install pgadmin3

3. To start off, we need to change the PostgreSQL postgres user password; we will not be able to access the server otherwise. As the “postgres” Linux user, we will execute the psql command. In terminal, type ```sudo -u postgres psql postgres

4. Set a password for the "postgres" database role using the command: ```\password postgres
and give your password when prompted. The password text will be hidden from the console for security purposes.
Type Control+D to exit the posgreSQL prompt.

5. To create the first database, which we will call "odin", simply type:
```sudo -u postgres createdb odin

6. For ""Postgresql 9.1""+ install the adminpack "extension":
```sudo -u postgres psql
```CREATE EXTENSION adminpack;

7. Open up pgAdmin III (app menu->development->pgAdmin III)

8. Open file->add server and populate the following as field:data

Name: localhost
Host: localhost
Port: 5432
Service: <leave blank>
Maintenance DB: postgres
Username: $USER
Password: <whatever>
Store Password: yes
and click "OK".

9. You should see a new server populated in the side panel of the pgadmin window.

10. Expand (+) the server and you will see the database you created with a red X next to it. Double click to connect the database.

11. You now have postgresql set up with a GUI frontend for management, if you so desire. It is much easier for a newcomer to user pgadmin III than to try and figure out all the terminal commands.

12. Edit your /config/database.yml with the correct database information you set up in the prior steps. It will then connect to the database you created and ```rake db:migrate will now properly function.


*Please let me know what I've missed here!*

## Now that you're up and running... [Come Help Out!](http://theodinproject.com/contributing)

## Significant Contributors

* [Erik Trautman](https://github.com/eriktrautman)
* [Afshin Moktari](https://github.com/afshinator)
* [Josh Gorchov](https://github.com/gorchov)
* [Joe Sawyer](https://github.com/zkay)
* [Bill Walker](https://github.com/mach1010)
* [Neil Gehani](https://github.com/ngehani)

<hr>
Created by [Erik Trautman](http://www.github.com/eriktrautman)
