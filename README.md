<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/bhargavbhatiya/Online_video_streaming_portal">
    <img src="https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1650016687/Github%20Readme/Screenshot_2022-04-15_151823_vat3r0.png" alt="Plax-tech" height="80">
  </a>

  <h3 align="center"><samp>Video Streaming Portal</samp></h3>

  <p align="center">
    <br />
    <a href="https://v-streams.azurewebsites.net/">View Demo </a>
    ·
    <a href="https://github.com/bhargavbhatiya/Online_video_streaming_portal/issues"> Report Bug </a>
    ·
    <a href="https://github.com/bhargavbhatiya/Online_video_streaming_portal/issues"> Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <h4>Table of Contents</h4>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#some-glimps-of-our-site">Some Glimps of Our Site</a>
      <ul>
          <li><a href="#normal-user">Normal User</a></li>
          <li><a href="#admin-user">Admin User</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <!-- <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
    <li><a href="#references">References</a></li>
  </ol>
</details>
<!-- ABOUT THE PROJECT -->
## About The Project

![Homepage](https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1651482096/Github%20Readme/homepage_gdbuj8.png)

**V-Streams**: V-Streams is a Online Video Streaming Portal which allows users to stream, like videos, comment, share, add new video, And get recommendation. It offers a wide variety of user-generated and corporate media videos. Available content includes TV show clips, movies, movie trailers. 

The program is a new self-contained product. It has come about due to the demand for such a product being identified in Activities like Drama, Action, Horror, Comedy, Adventures, Romance, and many more. From these activities, we saw that the main activity people used video for was the watch content found online. These people would regularly spend periods of time searching websites to try and find the videos they wanted to watch, either somewhere to stream the video from or the files.


There are 2 system users :
* <b>Admin Users</b> : The system admin who  owns the system and manages the over-all site and take care of the content posted on the site. The admin is able to upload, delete and manage videos. Also admin can remove users, can make user to admin, can remove unwanted comment of any users.
* <b>Normal users</b> : The system is open to the Internet! Any user can visit the site, and can stream videos. 

The system primely provides the following features :
* Aesthetic & Attractive UI (with animations)
* Authentication (Email + Google)
* Stream videos
* upload videos
* Process videos (for Adaptive Bitrate Streaming)
* Recommend related movies
* Search Movies
* Like, Comment & Share
* Manage History, Liked list, watch later list

#### Built With

The project is tech-rich made with multiple frameworks and libraries. The tech stack employeed for the developement is as listed below : 


|                                                                                                                                                      | Tech.                                                | Description                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| <img  height="20" src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg">                                                                  | [Reactjs](https://reactjs.org/)                      | for building user interfaces based on UI components                                                           |
| <img height="20" src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg">                                                                     | [Nodejs](https://nodejs.org/en/)                     | To create APIs & to provide a medium to connect React with DB                                                 |
| <img height="20" src="https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg">                                                               | [Express](https://expressjs.com/)                    | NodeJS framework that can help you in creating server-side web applications faster and smarter                |
| <img  height="20" src="https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg">                                                                  | [Mongo](https://www.mongodb.com/)                    | To store data of Users and Movie details                                                                      |
| <img  height="20" src="https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1650020184/Github%20Readme/cloudinary_logo_for_white_bg_jt9olg.png"> | [Cloudinary](https://cloudinary.com/)                | To store user's Avatar                                                                                        |
| <img  height="20" src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg">                                                        | [GCP](https://cloud.google.com/)                     | Google Authentication & varification e-mails                                                                  |
| <img  height="20" src="https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1650020488/Github%20Readme/aws_g6znrb.svg">                          | [AWS](https://aws.amazon.com/)                       | To upload movie videos and processing videos for streaming in different qualities(Adaptive Bitrate Streaming) |
| <img  height="20" src="https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg">                                                              | [Azure Portal](https://azure.microsoft.com/)         | for deployment of recommendation API and V-Streams MERN App                                                   |
| <img  height="20" src="https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1650021207/Github%20Readme/Google_CoLaboratory_y39lw0.svg">          | [Google Colab](https://colab.research.google.com/)   | used for making python based Machine Learning model to recommend related movies                               |
| <img  height="20" src="https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg">                                                          | [Flask](https://flask.palletsprojects.com/en/1.1.x/) | used for developing web applications using python ML model for movie recommend System                         |

<!-- GETTING STARTED -->
### Getting Started

Follow the steps given below to set up the project locally!
The site is built with Node-Express-Mongo backend and React frontend.

#### Prerequisites

You must have following installed in the system.

* npm

  ```sh
  npm install npm@latest -g
  ```   

#### Installation

 Clone the following repository :
   ```sh
   git clone https://github.com/bhargavbhatiya/Online_video_streaming_portal.git
   ```
Change the current directory to Plax-tech
  ```sh
   cd Online_video_streaming_portal
   ```  

##### A. Setting up Node-Express-Mongo Backend. 

In order run the backend, you should have : 
* Google Cloud Platform Billing account and GCP Storage Bucket.
* MongoDB Atlas Cluster.
1. Update .env file value as per given .env_sample file.
2. Run the following command to install the node modules in your local system:
    ```sh
    npm install
    ```

##### B. Setting up ReactJs

1.  Go to the directory :
    ```sh
    cd client
    ```
2. Run the following command to install the node modules in your local system:
    ```sh
    npm install
    ```
##### C. Run the project
1.  Go to the root directory : 
    ```sh
    cd ../
    ```
2. Run the following commands to run front-end & Back-end server.
    ```sh
    npm run dev
    ```

There we go! Our Streaming app is running.

<!-- Some Glimps of Our Site -->
### Some Glimps of Our Site

####Normal User
Register & Login (Including verify email & forget password):
<p align="center">
  <img alt="Light" src="https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1651484635/Github%20Readme/Register_bfnwef.png" width="49%">

  <img alt="Dark" src="https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1651485401/Github%20Readme/Login_mmhjlz.png" width="49%">
</p>
HomePage:
<img src="https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1651482096/Github%20Readme/homepage_gdbuj8.png">


Streaming video:
<p align="center">
<img src = "https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1651485734/Github%20Readme/MoviePage_b6eysm.png" width="49%">


<img src = "https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1651485735/Github%20Readme/Streaming_Movie_aovuif.png" width="49%">
</p>

Recommendation Movie:
<img src = "https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1651486087/Github%20Readme/Recommendation_v7ucz9.png" width="100%">

Manage Profile & All Lists:
<p align="center">
<img src="https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1651487246/Github%20Readme/Manage_Profile_mgshoq.jpg" width="48%">


<img src = "https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1651487243/Github%20Readme/History_zo1dy2.jpg" width="48%">
</p>


Search Movie:
<img src = "https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1651486963/Github%20Readme/Search_vkr2gy.png" width="100%">

####Admin User

Add Movie Video:
<img src="https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1651486960/Github%20Readme/Add_video_wkxqtb.png" width="100%">

Add Movie Details:
<img src="https://res.cloudinary.com/bhatiya-bhargav/image/upload/v1651486958/Github%20Readme/Add_video_details_dmvfxv.png" width="100%">

<!-- CONTRIBUTING -->
#### Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
<!-- ## License

Distributed under the MIT License. See `LICENSE` for more information.
 -->

<!-- CONTACT -->
#### Contact

Bhargav Bhatiya - [@bhargavbhatiya](https://github.com/bhargavbhatiya) - bhatiyabhargav.bb@gmail.com

Kaushal Bhalaiya - [@kaushal612](https://github.com/kaushal612) - kbhalaiya@gmail.com

**Project Link:** [https://github.com/bhargavbhatiya/Online_video_streaming_portal.git](https://github.com/bhargavbhatiya/Online_video_streaming_portal.git)

**Live Project Link:**
[https://v-streams.azurewebsites.net/](https://v-streams.azurewebsites.net/)

<!-- ACKNOWLEDGEMENTS -->
#### References
* [Medium](https://medium.com/)
* [Stackoverflow](https://stackoverflow.com/)
* [AWS documentation](https://docs.aws.amazon.com/)
* [Azure documentation](https://docs.microsoft.com/en-us/azure/?product=popular)